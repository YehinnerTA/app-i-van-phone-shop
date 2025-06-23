import { IonContent, IonPage } from '@ionic/react';
import CatalogProduct_LandingPage from '../components/view/user/Product/CatalogProduct_LandingPage';
import Header from '../components/PopMenu/Header';
import Menu from '../components/PopMenu/Menu';

const CatalogProduct: React.FC = () => {
    return (
        <IonPage>
            <Header />
            <IonContent fullscreen>
                <CatalogProduct_LandingPage />
            </IonContent>
            <Menu />
        </IonPage>
    );
};

export default CatalogProduct;