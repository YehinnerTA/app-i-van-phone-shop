import { IonContent, IonPage } from '@ionic/react';
import Home_LandingPage from '../components/view/user/Home/Home_LandingPage';
import Header from '../components/PopMenu/Header';
import Menu from '../components/PopMenu/Menu';

const Home: React.FC = () => {
    return (
        <IonPage>
            <Header />
            <IonContent fullscreen>
                <Home_LandingPage />
            </IonContent>
            <Menu />
        </IonPage>
    );
};

export default Home;