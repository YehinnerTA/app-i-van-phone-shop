import { IonContent, IonPage } from '@ionic/react';
import Profile_LandingPage from '../../components/view/user/profile/Profile_LandingPage';

const Home: React.FC = () => {
    return (
        <IonPage>
            <IonContent fullscreen>
                <Profile_LandingPage />
            </IonContent>
        </IonPage>
    );
};

export default Home;