import { IonContent, IonPage } from '@ionic/react';
import Payment_LandingPage from '../components/view/Payment/Payment_LandingPage';
import Header from '../components/PopMenu/Header';
import Menu from '../components/PopMenu/Menu';

const Payment: React.FC = () => {
    return (
        <IonPage>
            <Header />
            <IonContent fullscreen>
                <Payment_LandingPage />
            </IonContent>
            <Menu />
        </IonPage>
    );
};

export default Payment;