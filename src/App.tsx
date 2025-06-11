import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import SplashLoader from './adapters/navigation/SplashLoader';
import Login from './adapters/ui/pages/Login';
import Register from './adapters/ui/pages/Register';
import Home from './adapters/ui/pages/Home';
import Payment from './adapters/ui/pages/Payment';
import Search from './adapters/ui/pages/Search';
import CatalogProduct from './adapters/ui/pages/CatalogProduct';
import FeaturedProduct from './adapters/ui/pages/FeaturedProduct';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './adapters/ui/theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet id='main'>
        <Route exact path="/" component={SplashLoader} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />

        {/* Rutas privadas con autenticación */}
        <Route path="/home" component={Home} />
        <Route path="/payment" component={Payment} />
        <Route path="/search" component={Search} />
        <Route path="/catalogproduct" component={CatalogProduct} />
        <Route path="/featuredproduct" component={FeaturedProduct} />

        <Redirect to="/" />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
