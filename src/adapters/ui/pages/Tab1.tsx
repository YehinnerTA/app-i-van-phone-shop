import { IonContent, IonPage } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import Header from '../components/PopMenu/Header';
import Menu from '../components/PopMenu/Menu';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <Header />
      <IonContent fullscreen>
        <ExploreContainer name="Tab 1 page" />
      </IonContent>
      <Menu />
    </IonPage>
  );
};

export default Tab1;