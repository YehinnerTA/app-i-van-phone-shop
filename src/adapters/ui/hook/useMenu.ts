import { useState, useEffect, useRef } from 'react';

export const useMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeButton, setActiveButton] = useState<string | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

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

        window.addEventListener('scroll', handleScroll, true);
        document.addEventListener('click', handleClickOutside, true);

        return () => {
            window.removeEventListener('scroll', handleScroll, true);
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [isOpen]);

    return {
        isOpen,
        activeButton,
        menuRef,
        toggleMenu,
        setActiveButton,
    };
};