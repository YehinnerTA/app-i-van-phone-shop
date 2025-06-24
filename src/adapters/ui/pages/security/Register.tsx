import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import RegisterForm from '../../components/auth/RegisterForm';

const Register: React.FC = () => {
    return (
        <IonPage>
            <IonContent fullscreen className='Register-content'>
                <RegisterForm />
            </IonContent>
        </IonPage>
    );
};

export default Register;