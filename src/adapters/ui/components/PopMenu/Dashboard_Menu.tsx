import { IonIcon } from '@ionic/react';
import { close, archive, bag, cart, menu, people, phonePortrait, settings, trendingUpOutline } from 'ionicons/icons';
import './Menu.css';
import { useMenu } from '../../hook/useMenu';

interface MenuItem {
    icon: string | null;
    text: string;
}

const Dashboard_Menu: React.FC = () => {
    const {
        isOpen: isMenuOpen,
        activeItem,
        menuRef,
        toggleMenu,
        handleCloseMenu,
        handleItemClick,
    } = useMenu();

    const menuItems: MenuItem[] = [
        { icon: trendingUpOutline, text: 'Dashboard' },
        { icon: bag, text: 'Productos' },
        { icon: cart, text: 'Pedidos' },
        { icon: people, text: 'Clientes' },
        { icon: null, text: 'Análisis' },
        { icon: archive, text: 'Inventario' },
        { icon: settings, text: 'Configuración' }
    ];

    return (
        <div className={`menu-container-lateral ${isMenuOpen ? 'active' : ''}`}>
            <div className={`menu-options-lateral ${isMenuOpen ? 'active' : ''}`}
                onClick={(e) => e.stopPropagation()} ref={menuRef}>
                <div className='menu-title-lateral'>
                    <div className='logo-container-dashboard'>
                        <div className='logo-icon-dashboard'>
                            <IonIcon className='icon-dashboard' icon={phonePortrait} />
                        </div>
                        <h1 className='title-dashboard'>iVanPhone Shop</h1>
                    </div>
                    <button
                        className='menu-lateral-close'
                        title='Cerrar menú'
                        onClick={handleCloseMenu}
                    >
                        <IonIcon className='close-dashboard-lateral' icon={close} />
                    </button>
                </div>

                <div className='btn-options-lateral'>
                    {menuItems.map((item, index) => (
                        <button
                            key={index}
                            className={`btn-dashboard ${activeItem === index ? 'active' : ''}`}
                            title={`Ir a ${item.text}`}
                            onClick={() => handleItemClick(index)}
                        >
                            {item.icon && (
                                <IonIcon
                                    className="icon-dashboard"
                                    icon={item.icon}
                                    aria-hidden="true"
                                />
                            )}
                            <span>{item.text}</span>
                        </button>
                    ))}
                </div>
            </div>

            {isMenuOpen && (
                <div
                    className="menu-overlay"
                    onClick={handleCloseMenu}
                />
            )}

            <button
                className="menu-main"
                onClick={toggleMenu}
                title="menú principal"
            >
                <IonIcon className='icon-dashboard-btn' icon={menu} />
            </button>
        </div>
    );
};

export default Dashboard_Menu;