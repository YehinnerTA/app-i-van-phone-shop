import React from 'react';
import { useRegisterFrom } from './hook/useRegisterForm';
import './LoginForm.css';
import './RegisterForm.css'

const RegisterForm: React.FC = () => {
    const {
        name, setName,
        email, setEmail,
        password, setPassword,
        confirmPassword, setConfirmPassword,
        error,
        handleLogin, handleRegister
    } = useRegisterFrom();

    return (
        <div id="container" className="container-bg">
            {/* Imagen del Logo */}
            <img src="/src/assets/icons/logo-company.svg" alt="Logo" className="logo-img log-reg" />

            {/* Mensaje de Bienvenida */}
            <strong>Diseñado para conquistarte</strong>

            {/* Formulario de Registro */}
            <form action="" className='auth-form' onSubmit={handleRegister}>
                <div className='input-box'>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder=' '
                    />
                    <label className='nam-ape-label'>Nombre completo</label>
                    <i className="fa-regular fa-user"></i>
                </div>

                <div className='input-box'>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder=' '
                    />
                    <label className='email-label'>Email</label>
                    <i className="fa-regular fa-envelope"></i>
                </div>

                <div className='input-box'>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder=' '
                    />
                    <label className='pass-label'>Contraseña</label>
                    <i className="fa fa-lock"></i>
                </div>

                <div className='input-box'>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        placeholder=' '
                    />
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