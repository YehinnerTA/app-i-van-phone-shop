import { IonContent, IonPage } from '@ionic/react';
import Header from '../../components/PopMenu/Header';
import Dashboard_Client from '../../components/view/admin/Dashboard_Client';
import Dashboard_Menu from '../../components/PopMenu/Dashboard_Menu';

const Client: React.FC = () => {
    return (
        <IonPage>
            <Header />
            <IonContent fullscreen>
                <Dashboard_Client />
            </IonContent>
            <Dashboard_Menu />
        </IonPage>
    );
};

export default Client;