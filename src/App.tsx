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
import Search from './adapters/ui/pages/user/Search';
import CatalogProduct from './adapters/ui/pages/user/CatalogProduct';
import FeaturedProduct from './adapters/ui/pages/user/FeaturedProduct';
import Profile from './adapters/ui/pages/user/Profile';

import Dashboard from './adapters/ui/pages/admin/Dashboard';
import DashboardProduct from './adapters/ui/pages/admin/DashboardProduct';
import DashboardOrders from './adapters/ui/pages/admin/DashboardOrders';
import DashboardClient from './adapters/ui/pages/admin/DashboardClient';
import DashboardAnalysis from './adapters/ui/pages/admin/DashboardAnalysis';
import DashboardInventory from './adapters/ui/pages/admin/DashboardInventory';
import DashboardSettings from './adapters/ui/pages/admin/DashboardSettings';

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

import ProtectedRoute from './adapters/navigation/ProtectedRoute';
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

const isAuthenticated = localStorage.getItem('token') !== null;
const userRole = localStorage.getItem('role') || '';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet id='main'>
        <Route exact path="/" component={SplashLoader} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />

        {/* Rutas privadas para cliente */}
        <ProtectedRoute path="/home" component={Home} roles={['cliente']} isAuthenticated={isAuthenticated} userRole={userRole} />
        <ProtectedRoute path="/payment" component={Payment} roles={['cliente']} isAuthenticated={isAuthenticated} userRole={userRole} />
        <ProtectedRoute path="/search" component={Search} roles={['cliente']} isAuthenticated={isAuthenticated} userRole={userRole} />
        <ProtectedRoute path="/catalogproduct" component={CatalogProduct} roles={['cliente']} isAuthenticated={isAuthenticated} userRole={userRole} />
        <ProtectedRoute path="/featuredproduct" component={FeaturedProduct} roles={['cliente']} isAuthenticated={isAuthenticated} userRole={userRole} />
        <ProtectedRoute path="/profile" component={Profile} roles={['cliente']} isAuthenticated={isAuthenticated} userRole={userRole} />

        {/* Rutas privadas para admin */}
        <ProtectedRoute path="/dashboard" component={Dashboard} roles={['admin']} isAuthenticated={isAuthenticated} userRole={userRole} />
        <ProtectedRoute path="/dashboard-product" component={DashboardProduct} roles={['admin']} isAuthenticated={isAuthenticated} userRole={userRole} />
        <ProtectedRoute path="/dashboard-orders" component={DashboardOrders} roles={['admin']} isAuthenticated={isAuthenticated} userRole={userRole} />
        <ProtectedRoute path="/dashboard-client" component={DashboardClient} roles={['admin']} isAuthenticated={isAuthenticated} userRole={userRole} />
        <ProtectedRoute path="/dashboard-analysis" component={DashboardAnalysis} roles={['admin']} isAuthenticated={isAuthenticated} userRole={userRole} />
        <ProtectedRoute path="/dashboard-inventory" component={DashboardInventory} roles={['admin']} isAuthenticated={isAuthenticated} userRole={userRole} />
        <ProtectedRoute path="/dashboard-settings" component={DashboardSettings} roles={['admin']} isAuthenticated={isAuthenticated} userRole={userRole} />

        <Redirect to="/" />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;