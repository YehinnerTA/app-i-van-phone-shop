import { IonContent, IonPage } from '@ionic/react';
import FeaturedProduct_LandingPage from '../components/view/Product/FeaturedProduct_LandingPage';
import Header from '../components/PopMenu/Header';
import Menu from '../components/PopMenu/Menu';

const FeaturedProduct: React.FC = () => {
    return (
        <IonPage>
            <Header />
            <IonContent fullscreen>
                <FeaturedProduct_LandingPage />
            </IonContent>
            <Menu />
        </IonPage>
    );
};

export default FeaturedProduct;