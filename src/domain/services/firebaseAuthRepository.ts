import { IUserRepository } from "../respositories/IUserRepository";
import { UserRegisterDto } from "../../application/dtos/UserRegisterDto";
import { UserLoginDto } from "../../application/dtos/UserLoginDto";
import { ClientRegisterDto } from "../../application/dtos/ClientRegisterDto";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';
import { FirebaseError } from "firebase/app";
import { app_auth, app_DB } from "./firebaseConfig";

export class FirebaseAuthRepository implements IUserRepository {
    async deleteUserByUid(uid: string): Promise<void> {
        const usersRef = doc(app_DB, "users", uid);
        await deleteDoc(usersRef);
    }

    async registerClient(clienDto: ClientRegisterDto): Promise<void> {
        const { name, email, password, role, ...extraField } = clienDto;

        try {
            const userCredential = await createUserWithEmailAndPassword(app_auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(app_DB, "users", user.uid), {
                name,
                email,
                role: role || "cliente",
                createAt: new Date(),
                ...extraField,
            });
        } catch (err: unknown) {
            if (err instanceof FirebaseError) {
                switch (err.code) {
                    case "auth/email-already-in-use":
                        throw new Error("El correo electrónico ya está registrado.");
                    case "auth/invalid-email":
                        throw new Error("El correo electrónico no es válido.");
                    case "auth/weak-password":
                        throw new Error("La contraseña es demasiado débil. Usa al menos 6 caracteres.");
                    default:
                        throw new Error("Error: " + err.message);
                }
            } else {
                throw new Error("Ocurrió un error inesperado.");
            }
        }
    }

    async registerUser(userDto: UserRegisterDto): Promise<void> {
        const { name, email, password, confirmPassword } = userDto;

        if (password !== confirmPassword) {
            throw new Error('Las contraseñas no coinciden.');
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(app_auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(app_DB, 'users', user.uid), {
                name,
                email,
                role: userDto.role || 'cliente',
                createAt: new Date()
            });
        } catch (err: unknown) {
            if (err instanceof FirebaseError) {
                switch (err.code) {
                    case 'auth/email-already-in-use':
                        throw new Error('El correo electrónico ya está registrado.');
                    case 'auth/invalid-email':
                        throw new Error('El correo electrónico no es válido.');
                    case 'auth/weak-password':
                        throw new Error('La contraseña es demasiado débil. Usa al menos 6 caracteres.');
                    default:
                        throw new Error('ERROR: ' + err.message);
                }
            } else {
                throw new Error('Ocurrió un error inesperado.');
            }
        }
    }

    async loginUser(userDto: UserLoginDto): Promise<{ uid: string; email: string; role: string }> {
        const { email, password } = userDto;

        try {
            const userCredential = await signInWithEmailAndPassword(app_auth, email, password);
            const user = userCredential.user;

            const userDocRef = doc(app_DB, 'users', user.uid);
            const userDoc = await getDoc(userDocRef);

            if (!userDoc.exists()) {
                throw new Error("Tu cuenta no está completamente registrada. Contacta al administrador.");
            }

            const userData = userDoc.data();
            const role = userData?.role || 'cliente';

            return {
                uid: user.uid,
                email: user.email ?? '',
                role: role
            };
        } catch (err: unknown) {
            const FirebaseError = err as FirebaseError;

            if (FirebaseError.code === "auth/user-not-found") {
                throw new Error("Usuario no encontrado.");
            } else if (FirebaseError.code === "auth/wrong-password") {
                throw new Error("Contraseña incorrecta.");
            } else {
                throw new Error("Error al iniciar sesión.");
            }
        }
    }

}