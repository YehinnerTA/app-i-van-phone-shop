import { IonContent, IonPage } from '@ionic/react';
import Header from '../../components/PopMenu/Header';
import Dashboard_Product from '../../components/view/admin/Dashboard_Product';
import Dashboard_Menu from '../../components/PopMenu/Dashboard_Menu';

const Product: React.FC = () => {
    return (
        <IonPage>
            <Header />
            <IonContent fullscreen>
                <Dashboard_Product />
            </IonContent>
            <Dashboard_Menu />
        </IonPage>
    );
};

export default Product;