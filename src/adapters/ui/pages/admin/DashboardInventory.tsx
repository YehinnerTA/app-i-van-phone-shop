import { IonContent, IonPage } from '@ionic/react';
import Header from '../../components/PopMenu/Header';
import Dashboard_Inventory from '../../components/view/admin/Dashboard_Inventory';
import Dashboard_Menu from '../../components/PopMenu/Dashboard_Menu';

const Inventory: React.FC = () => {
    return (
        <IonPage>
            <Header />
            <IonContent fullscreen>
                <Dashboard_Inventory />
            </IonContent>
            <Dashboard_Menu />
        </IonPage>
    );
};

export default Inventory;