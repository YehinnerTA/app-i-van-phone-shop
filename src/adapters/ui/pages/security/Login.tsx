import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import LoginForm from '../../components/auth/LoginForm';

const Login: React.FC = () => {
    return (
        <IonPage>
            <IonContent fullscreen className='login-content'>
                <LoginForm />
            </IonContent>
        </IonPage>
    );
};

export default Login;