import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import './LoginForm.css';
import './RegisterForm.css'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { app_auth, app_DB } from '../../../../infrastructure/firebase/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { FirebaseError } from 'firebase/app';

const RegisterForm: React.FC = () => {
    const history = useHistory();

    // Redirección -> Login (btn)
    const handleLogin = () => {
        history.push('/login');
    };

    // Registro -> FireBase
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setError('');
    }, []);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            setPassword('');
            setConfirmPassword('');
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(app_auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(app_DB, 'users', user.uid), {
                name,
                email,
                createAt: new Date()
            });

            setName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');

            history.push('/login');
        } catch (err: unknown) {
            if (err instanceof FirebaseError) {
                switch (err.code) {
                    case 'auth/email-already-in-use':
                        setError('El correo electronico ya está registrado.');
                        setEmail('');
                        break;
                    case 'auth/invalid-email':
                        setError('El correo electrónico no es válido.');
                        setEmail('');
                        break;
                    case 'auth/weak-password':
                        setError('La contraseña es demasiado débil, Usa al menos 6 caracteres.');
                        setPassword('');
                        setConfirmPassword('');
                        break;
                    default:
                        setError('ERROR: ' + err.message);
                        setName('');
                        setEmail('');
                        setPassword('');
                        setConfirmPassword('');
                }
            } else {
                setError("Ocurrio un error inesperado.");
            }
        }
    };

    return (
        <div id="container" className="container-bg">
            {/* Imagen del Logo */}
            <img src="/assets/logos/logo-company.svg" alt="Logo" className="logo-img log-reg" />

            {/* Mensaje de Bienvenida */}
            <strong>Diseñado para conquistarte</strong>

            {/* Formulario de Registro */}
            <form action="" className='auth-form' onSubmit={handleRegister}>
                <div className='input-box'>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder=' ' />
                    <label className='nam-ape-label'>Nombre completo</label>
                    <i className="fa-regular fa-user"></i>
                </div>

                <div className='input-box'>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder=' ' />
                    <label className='email-label'>Email</label>
                    <i className="fa-regular fa-envelope"></i>
                </div>

                <div className='input-box'>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder=' ' />
                    <label className='pass-label'>Contraseña</label>
                    <i className="fa fa-lock"></i>
                </div>

                <div className='input-box'>
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required placeholder=' ' />
                    <label className='cpass-label'>Confirmar contraseña</label>
                    <i className="fa fa-lock"></i>
                </div>

                {error && <p className='error-message'>{error}</p>}

                <button className='btn' type='submit'>Registrarse</button>
                <button className='btn' type='button' onClick={handleLogin}>Volver al Login</button>
            </form>
        </div>
    );
};

export default RegisterForm;