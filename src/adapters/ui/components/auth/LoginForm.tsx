import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { app_auth } from '../../../../domain/services/firebaseConfig';
import { FirebaseError } from 'firebase/app';
import './LoginForm.css';

const LoginForm: React.FC = () => {
    const history = useHistory();
    // Redirección -> Register
    const handleRegister = () => {
        history.push('/register');
    };

    // Conexion -> FireBase
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        setEmail('');
        setPassword('');
        setError('');
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            await signInWithEmailAndPassword(app_auth, email, password);
            setEmail('');
            setPassword('');
            history.push('/inicio');
        } catch (err) {
            const error = err as FirebaseError;

            if (error.code === 'auth/user-not-found') {
                setError('Usuario no encontrado.');
            } else if (error.code === 'auth/wrong-password') {
                setError('Contraseña incorrecta.');
            } else {
                setError('Error al iniciar sesión.');
            }
            console.error("FIREBASE ERROR: ", error.code, error.message);
            setEmail('');
            setPassword('');
        }
    };

    return (
        <div id="container">
            {/* Imagen del Logo */}
            <img src="/src/assets/icons/logo-company.svg" alt="Logo" className="logo-img" />

            {/* Mensaje de Bienvenida */}
            <strong>Diseñado para conquistarte</strong>

            {/* Formulario de Inicio de Sesión */}
            <form action="" className='auth-form' onSubmit={handleLogin}>
                <div className='input-box'>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder='' />
                    <label className='email-label'>Email</label>
                    <i className="fa-regular fa-user"></i>
                </div>

                <div className='input-box'>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder='' />
                    <label className='pass-label'>Contraseña</label>
                    <i className="fa fa-lock"></i>
                </div>

                {error && <p className='error-message'>{error}</p>}

                <button className='btn' type='submit'>Iniciar Sesión</button>
                <button className='btn' type='button' onClick={handleRegister}>Registrarse</button>
            </form>
        </div>
    );
};

export default LoginForm;