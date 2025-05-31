import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import SplashPage from './SplashScreen';

const SplashLoader: React.FC = () => {
    const history = useHistory();
    const [showSplash, setShowSplash] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSplash(false);
            history.replace('/login');
        }, 5000);

        return () => clearTimeout(timer);
    }, [history]);

    return showSplash ? <SplashPage /> : null;
};

export default SplashLoader;