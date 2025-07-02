import { useState, useEffect, useRef, useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

export const useMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeButton, setActiveButton] = useState<string | null>(null);
    const [activeItem, setActiveItem] = useState<number>(0);
    const menuRef = useRef<HTMLDivElement>(null);
    const history = useHistory();
    const location = useLocation();

    const { menuPaths, pathToButtonName } = useMemo(() => ({
        menuPaths: [
            '/dashboard',
            '/dashboard-product',
            '/dashboard-orders',
            '/dashboard-client',
            '/dashboard-analysis',
            '/dashboard-inventory',
            '/dashboard-settings'
        ],

        pathToButtonName: {
            '/home': 'home',
            '/payment': 'payment',
            '/search': 'search',
            '/catalogproduct': 'catalogproduct',
            '/featuredproduct': 'featuredproduct',
        } as Record<string, string>
    }), []);

    const toggleMenu = () => setIsOpen(prev => !prev);
    const closeMenu = () => setIsOpen(false);
    const handleCloseMenu = (e: React.MouseEvent) => {
        e?.stopPropagation();
        closeMenu();
    };

    const handleNavigation = (path: string) => history.push(path);

    const handleItemClick = (index: number) => {
        setActiveItem(index);
        const path = menuPaths[index];
        if (path) handleNavigation(path);
        closeMenu();
    };

    useEffect(() => {
        const currentPath = location.pathname;
        const dashboardIndex = menuPaths.indexOf(currentPath);
        if (dashboardIndex !== -1) {
            setActiveItem(dashboardIndex);
        }

        const mainMenuButton = pathToButtonName[currentPath] || null;
        setActiveButton(mainMenuButton);

        const handleScroll = () => isOpen && setIsOpen(false);
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
    }, [isOpen, location.pathname, menuPaths, pathToButtonName]);

    return {
        isOpen,
        activeButton,
        activeItem,
        menuRef,
        toggleMenu,
        closeMenu,
        handleCloseMenu,
        handleItemClick,
        handleNavigation,
    };
};