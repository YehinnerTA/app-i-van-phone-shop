import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import SplashLoader from './adapters/navigation/SplashLoader';
import Login from './adapters/ui/pages/security/Login';
import Register from './adapters/ui/pages/security/Register';

import Home from './adapters/ui/pages/user/Home';
import Payment from './adapters/ui/pages/user/Payment';
import CatalogProduct from './adapters/ui/pages/user/CatalogProduct';
import FeaturedProduct from './adapters/ui/pages/user/FeaturedProduct';
import Profile from './adapters/ui/pages/user/Profile';

import Dashboard from './adapters/ui/pages/admin/Dashboard';
import DashboardProduct from './adapters/ui/pages/admin/DashboardProduct';
import DashboardOrders from './adapters/ui/pages/admin/DashboardOrders';
import DashboardClient from './adapters/ui/pages/admin/DashboardClient';
import DashboardInventory from './adapters/ui/pages/admin/DashboardInventory';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/palettes/dark.system.css';
import './adapters/ui/theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet id='main'>
        <Route exact path="/" component={SplashLoader} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />

        <Route path="/home" component={Home} />
        <Route path="/payment" component={Payment} />
        <Route path="/catalogproduct" component={CatalogProduct} />
        <Route path="/featuredproduct" component={FeaturedProduct} />
        <Route path="/profile" component={Profile} />

        <Route path="/dashboard" component={Dashboard} />
        <Route path="/dashboard-product" component={DashboardProduct} />
        <Route path="/dashboard-orders" component={DashboardOrders} />
        <Route path="/dashboard-client" component={DashboardClient} />
        <Route path="/dashboard-inventory" component={DashboardInventory} />

        <Redirect to="/" />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;