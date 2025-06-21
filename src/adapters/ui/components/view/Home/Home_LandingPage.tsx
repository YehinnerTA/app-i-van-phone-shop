import React from "react";
import './Home.css';

const Home_LandingPage: React.FC = () => {
    return (
        <div className="landing-container">
            <div className="container-iPhone">
                <img src="" alt="Producto iPhone" />
                <i>Logo iPhone</i>
                <strong>iPhone</strong>
            </div>
            <div className="container-Android">
                <img src="" alt="Producto Android" />
                <i>Logo Android</i>
                <strong>Android</strong>
            </div>
        </div>
    );
};

export default Home_LandingPage;