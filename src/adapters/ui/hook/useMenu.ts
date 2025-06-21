import { useState, useEffect, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

export const useMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeButton, setActiveButton] = useState<string | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const history = useHistory();
    const location = useLocation();

    const toggleMenu = () => {
        setIsOpen(prev => !prev);
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

        const pathToButtonName: Record<string, string> = {
            '/home': 'home',
            '/payment': 'payment',
            '/search': 'search',
            '/catalogproduct': 'catalogproduct',
            '/featuredproduct': 'featuredproduct',
        };

        const active = pathToButtonName[location.pathname] || null;
        setActiveButton(active);

        window.addEventListener('scroll', handleScroll, true);
        document.addEventListener('click', handleClickOutside, true);

        return () => {
            window.removeEventListener('scroll', handleScroll, true);
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [isOpen, location.pathname]);

    const handleNavigation = (path: string) => {
        history.push(path);
    };

    return {
        isOpen,
        activeButton,
        menuRef,
        toggleMenu,
        handleNavigation,
    };
};