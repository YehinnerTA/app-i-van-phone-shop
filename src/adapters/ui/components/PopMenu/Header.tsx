import React from 'react';
import { IonIcon } from '@ionic/react';
import { ellipsisVerticalOutline, personOutline, powerOutline } from 'ionicons/icons';
import { useHeader } from '../../hook/useHeader';
import './Header.css';

const Header: React.FC = () => {
    const {
        isMenuOpen,
        isScrolled,
        activeOption,
        toggleMenu,
        handleOptionClick,
        menuRef,
    } = useHeader();

    return (
        <header className={`header-container ${isScrolled ? 'scrolled' : ''}`}>
            <div className="header-right" ref={menuRef}>
                <button
                    className="header-btn"
                    onClick={toggleMenu}
                    title="Opciones"
                >
                    <IonIcon icon={ellipsisVerticalOutline} />
                </button>
                {isMenuOpen && (
                    <div className="dropdown-menu">
                        <button
                            title="Perfil"
                            className={`dropdown-btn ${activeOption === 'perfil' ? 'active' : ''}`}
                            onClick={() => handleOptionClick('perfil')}
                        >
                            <IonIcon icon={personOutline} />
                            <span>Perfil</span>
                        </button>
                        <button
                            title="Salir"
                            className={`dropdown-btn ${activeOption === 'salir' ? 'active' : ''}`}
                            onClick={() => handleOptionClick('salir')}
                        >
                            <IonIcon icon={powerOutline} />
                            <span>Salir</span>
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;