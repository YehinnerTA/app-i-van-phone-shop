import { IonContent, IonPage } from '@ionic/react';
import Search_LandingPage from '../../components/view/user/Search/Search_LandingPage';
import Header from '../../components/PopMenu/Header';
import Menu from '../../components/PopMenu/Menu';

const Search: React.FC = () => {
    return (
        <IonPage>
            <Header />
            <IonContent fullscreen>
                <Search_LandingPage />
            </IonContent>
            <Menu />
        </IonPage>
    );
};

export default Search;