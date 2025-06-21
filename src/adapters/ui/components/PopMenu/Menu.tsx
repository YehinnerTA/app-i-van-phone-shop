import { IonIcon } from '@ionic/react';
import { appsOutline, homeOutline, searchOutline, cartOutline, heartOutline, listOutline } from 'ionicons/icons';
import './Menu.css';
import { useMenu } from '../../hook/useMenu';

const Menu: React.FC = () => {
    const {
        isOpen,
        activeButton,
        menuRef,
        toggleMenu,
        handleNavigation
    } = useMenu();

    return (
        <div className="menu-container" ref={menuRef}>
            <div className={`menu-options ${isOpen ? 'open' : ''}`}>
                <button
                    className={`menu-btn ${activeButton === 'home' ? 'active' : ''}`}
                    onClick={() => handleNavigation('/home')}
                    title="Inicio"
                >
                    <IonIcon icon={homeOutline} />
                </button>

                <button
                    className={`menu-btn ${activeButton === 'catalogproduct' ? 'active' : ''}`}
                    onClick={() => handleNavigation('/catalogproduct')}
                    title="Productos o Catálogo"
                >
                    <IonIcon icon={listOutline} />
                </button>

                <button
                    className={`menu-btn ${activeButton === 'search' ? 'active' : ''}`}
                    onClick={() => handleNavigation('/search')}
                    title="Buscador"
                >
                    <IonIcon icon={searchOutline} />
                </button>

                <button
                    className={`menu-btn ${activeButton === 'payment' ? 'active' : ''}`}
                    onClick={() => handleNavigation('/payment')}
                    title="Carrito de Compras"
                >
                    <IonIcon icon={cartOutline} />
                </button>

                <button
                    className={`menu-btn ${activeButton === 'featuredproduct' ? 'active' : ''}`}
                    onClick={() => handleNavigation('/featuredproduct')}
                    title="Favoritos"
                >
                    <IonIcon icon={heartOutline} />
                </button>
            </div>

            <button className="menu-main-btn" onClick={toggleMenu} title="Menú principal">
                <IonIcon icon={appsOutline} />
            </button>
        </div>
    );
};

export default Menu;