import React from 'react';
import { useLoginForm } from '../../hook/useLoginForm';
import './LoginForm.css';

const LoginForm: React.FC = () => {
    const {
        email,
        setEmail,
        password,
        setPassword,
        error,
        handleLogin,
        handleRegister,
    } = useLoginForm();

    return (
        <div id="container">
            <img src="/src/assets/icons/logo-company.svg" alt="Logo" className="logo-img" />
            <strong>Diseñado para conquistarte</strong>

            <form action="" className='auth-form' onSubmit={handleLogin}>
                <div className='input-box'>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder=''
                    />
                    <label className='email-label'>Email</label>
                    <i className="fa-regular fa-user"></i>
                </div>

                <div className='input-box'>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder=''
                    />
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