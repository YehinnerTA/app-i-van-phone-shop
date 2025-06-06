import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  // IonIcon,
  // IonLabel,
  IonRouterOutlet,
  // IonTabBar,
  // IonTabButton,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
// import { ellipse, square, triangle } from 'ionicons/icons';
import SplashLoader from './adapters/navigation/SplashLoader';
import Login from './adapters/ui/pages/Login';
import Register from './adapters/ui/pages/Register';
import Tab1 from './adapters/ui/pages/Tab1';
import Tab2 from './adapters/ui/pages/Tab2';
import Tab3 from './adapters/ui/pages/Tab3';

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
        <Route path="/tab1" component={Tab1} />
        <Route path="/tab2" component={Tab2} />
        <Route path="/tab3" component={Tab3} />

        <Redirect to="/" />
      </IonRouterOutlet>

      {/* <IonTabBar slot="bottom">
        <IonTabButton tab="tab1" href="/tab1">
          <IonIcon aria-hidden="true" icon={triangle} />
          <IonLabel>Tab 1</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab2" href="/tab2">
          <IonIcon aria-hidden="true" icon={ellipse} />
          <IonLabel>Tab 2</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab3" href="/tab3">
          <IonIcon aria-hidden="true" icon={square} />
          <IonLabel>Tab 3</IonLabel>
        </IonTabButton>
      </IonTabBar> */}
    </IonReactRouter>
  </IonApp>
);

export default App;
