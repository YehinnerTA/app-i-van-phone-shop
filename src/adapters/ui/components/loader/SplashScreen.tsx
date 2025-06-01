import React from 'react';
import './SplashScreen.css';

const SplashScreen: React.FC = () => {
  return (
    <div className="splash-container">
      <div className="splash-triangle-orange"></div>
      <div className="splash-triangle-dark"></div>
      <img src="/src/assets/icons/logo-company.svg" alt="Logo" className="splash-logo-img" />
    </div>
  );
};

export default SplashScreen;