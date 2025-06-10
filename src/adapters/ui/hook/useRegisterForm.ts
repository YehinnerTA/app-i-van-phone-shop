import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { FirebaseAuthRepository } from '../../../domain/services/firebaseAuthRepository';
import { RegisterUserUseCase } from '../../../application/useCases/RegisterUserUseCase';
import { UserRegisterDto } from '../../../application/dtos/UserRegisterDto';

export const useRegisterFrom = () => {
    const history = useHistory();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        resetForm();
    }, []);

    const resetForm = () => {
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setError('');
    };

    const handleLogin = () => {
        history.push('/login');
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        const userDto: UserRegisterDto = {
            name,
            email,
            password,
            confirmPassword
        };

        const userRepository = new FirebaseAuthRepository();
        const registerUserUseCase = new RegisterUserUseCase(userRepository);

        try {
            await registerUserUseCase.execute(userDto);
            resetForm();
            history.push('/login');
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message)
            } else {
                setError('Ocurrió un error inesperado.');
            }
        }
    };

    return {
        name, setName,
        email, setEmail,
        password, setPassword,
        confirmPassword, setConfirmPassword,
        error,
        handleLogin, handleRegister
    };
};