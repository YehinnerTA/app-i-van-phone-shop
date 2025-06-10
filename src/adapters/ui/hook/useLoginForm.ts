import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { FirebaseAuthRepository } from "../../../domain/services/firebaseAuthRepository";
import { LoginUserUseCase } from "../../../application/useCases/LoginUserUseCase";

export const useLoginForm = () => {
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        setEmail('');
        setPassword('');
        setError('');
    }, []);

    const handleRegister = () => {
        history.push('/register');
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const userRepository = new FirebaseAuthRepository();
        const loginUserUseCase = new LoginUserUseCase(userRepository);

        try {
            await loginUserUseCase.execute({ email, password });
            setEmail('');
            setPassword('');
            history.push('/tab1');
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error desconocido.");
            setEmail("");
            setPassword("");
        }
    };

    return {
        email, setEmail,
        password, setPassword,
        error,
        handleLogin, handleRegister,
    };
};