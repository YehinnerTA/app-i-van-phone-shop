import { IonContent, IonPage } from '@ionic/react';
import Admin_LandingPage from '../../components/view/admin/Admin_LandingPage';
import Header from '../../components/PopMenu/Header';
import Menu from '../../components/PopMenu/Menu';

const Admin_pages: React.FC = () => {
    return (
        <IonPage>
            <Header />
            <IonContent fullscreen>
                <Admin_LandingPage />
            </IonContent>
            <Menu />
        </IonPage>
    );
};

export default Admin_pages;