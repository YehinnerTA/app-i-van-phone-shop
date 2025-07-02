import { IonContent, IonPage } from '@ionic/react';
import Header from '../../components/PopMenu/Header';
import Dashboard_Settings from '../../components/view/admin/Dashboard_Settings';
import Dashboard_Menu from '../../components/PopMenu/Dashboard_Menu';

const Settings: React.FC = () => {
    return (
        <IonPage>
            <Header />
            <IonContent fullscreen>
                <Dashboard_Settings />
            </IonContent>
            <Dashboard_Menu />
        </IonPage>
    );
};

export default Settings;