import { IonContent, IonPage } from '@ionic/react';
import Header from '../../components/PopMenu/Header';
import Dashboard_Analysis from '../../components/view/admin/Dashboard_Analysis';
import Dashboard_Menu from '../../components/PopMenu/Dashboard_Menu';

const Analysis: React.FC = () => {
    return (
        <IonPage>
            <Header />
            <IonContent fullscreen>
                <Dashboard_Analysis />
            </IonContent>
            <Dashboard_Menu />
        </IonPage>
    );
};

export default Analysis;