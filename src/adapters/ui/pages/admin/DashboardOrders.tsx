import { IonContent, IonPage } from '@ionic/react';
import Header from '../../components/PopMenu/Header';
import Dashboard_Orders from '../../components/view/admin/Order/Dashboard_Orders';
import Dashboard_Menu from '../../components/PopMenu/Dashboard_Menu';

const Orders: React.FC = () => {
    return (
        <IonPage>
            <Header />
            <IonContent fullscreen>
                <Dashboard_Orders />
            </IonContent>
            <Dashboard_Menu />
        </IonPage>
    );
};

export default Orders;