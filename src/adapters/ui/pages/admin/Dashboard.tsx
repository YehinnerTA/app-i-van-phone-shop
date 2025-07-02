import { IonContent, IonPage } from '@ionic/react';
import Header from '../../components/PopMenu/Header';
import Dashboard_Home from '../../components/view/admin/Dashboard_home';
import Dashboard_Menu from '../../components/PopMenu/Dashboard_Menu';

const Home: React.FC = () => {
    return (
        <IonPage>
            <Header />
            <IonContent fullscreen>
                <Dashboard_Home />
            </IonContent>
            <Dashboard_Menu />
        </IonPage>
    );
};

export default Home;