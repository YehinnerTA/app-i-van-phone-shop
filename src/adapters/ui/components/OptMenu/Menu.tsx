import React, { useState, useEffect, useRef } from 'react';
import { IonIcon } from '@ionic/react';
import { appsOutline, homeOutline, searchOutline, cartOutline, heartOutline, listOutline } from 'ionicons/icons';
import './Menu.css';

const Menu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeButton, setActiveButton] = useState<string | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (isOpen) setIsOpen(false);
        };

        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        window.addEventListener('scroll', handleScroll, true);
        document.addEventListener('click', handleClickOutside, true);

        return () => {
            window.removeEventListener('scroll', handleScroll, true);
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [isOpen]);

    return (
        <div className="menu-container" ref={menuRef}>
            <div className={`menu-options ${isOpen ? 'open' : ''}`}>
                <button
                    className={`menu-btn ${activeButton === 'home' ? 'active' : ''}`}
                    onClick={() => setActiveButton('home')}
                    title="Inicio"
                >
                    <IonIcon icon={homeOutline} />
                </button>

                <button
                    className={`menu-btn ${activeButton === 'list' ? 'active' : ''}`}
                    onClick={() => setActiveButton('list')}
                    title="Productos o Catálogo"
                >
                    <IonIcon icon={listOutline} />
                </button>

                <button
                    className={`menu-btn ${activeButton === 'search' ? 'active' : ''}`}
                    onClick={() => setActiveButton('search')}
                    title="Buscador"
                >
                    <IonIcon icon={searchOutline} />
                </button>

                <button
                    className={`menu-btn ${activeButton === 'cart' ? 'active' : ''}`}
                    onClick={() => setActiveButton('cart')}
                    title="Carrito de Compras"
                >
                    <IonIcon icon={cartOutline} />
                </button>

                <button
                    className={`menu-btn ${activeButton === 'heart' ? 'active' : ''}`}
                    onClick={() => setActiveButton('heart')}
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