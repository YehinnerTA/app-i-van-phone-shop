import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { app_DB } from './firebaseConfig';
import { User } from '../entities/User';

export const getUserProfile = async (uid: string): Promise<Partial<User> | null> => {
    const docRef = doc(app_DB, 'users', uid);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() as Partial<User> : null;
};

export const updateUserProfile = async (uid: string, data: Partial<User>): Promise<void> => {
    await updateDoc(doc(app_DB, 'users', uid), data);
};