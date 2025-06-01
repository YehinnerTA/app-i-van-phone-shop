import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';
import SplashScreen from './adapters/ui/components/loader/SplashScreen';
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
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet id='main'>
          <Route exact path="/loading" component={SplashScreen} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />

          {/* Redirección al login por defecto si no sta autenticado */}
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>

          {/* Rutas privadas con autenticación */}
          <Route path="tabs">
            <IonTabs>
              <Route exact path="/tabs/tab1" component={Tab1} />
              <Route exact path="/tabs/tab2" component={Tab2} />
              <Route path="/tabs/tab3" component={Tab3} />

              {/* Redirección por defecto */}
              <Route exact path="/tabs">
                <Redirect to="/tabs/tab1" />
              </Route>
            </IonTabs>
          </Route>
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/tabs/tab1">
            <IonIcon aria-hidden="true" icon={triangle} />
            <IonLabel>Tab 1</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/tabs/tab2">
            <IonIcon aria-hidden="true" icon={ellipse} />
            <IonLabel>Tab 2</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/tabs/tab3">
            <IonIcon aria-hidden="true" icon={square} />
            <IonLabel>Tab 3</IonLabel>
          </IonTabButton>
        </IonTabBar>

      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
