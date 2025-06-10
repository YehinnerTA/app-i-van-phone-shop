import { useState, useEffect, useRef } from 'react';

export const useHeader = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeOption, setActiveOption] = useState<string | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleScroll = () => {
        setIsScrolled(window.scrollY > 0 || window.scrollX > 0);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setIsMenuOpen(false);
        }
    };

    const handleOptionClick = (option: string) => {
        setActiveOption(option);
        setIsMenuOpen(false);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        document.addEventListener('click', handleClickOutside, true);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    return {
        isMenuOpen,
        isScrolled,
        activeOption,
        toggleMenu,
        handleOptionClick,
        menuRef,
    };
};