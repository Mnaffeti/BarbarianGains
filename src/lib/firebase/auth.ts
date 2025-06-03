
import { 
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
  signOut as firebaseSignOut,
  UserCredential,
  AuthError
} from 'firebase/auth';
import { auth } from './config';

export const signInWithEmailPassword = async (email: string, password: string): Promise<UserCredential> => {
  try {
    const userCredential = await firebaseSignInWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    // It's good practice to cast to AuthError if you expect Firebase auth errors
    const authError = error as AuthError;
    console.error("Error signing in with email and password:", authError.message);
    throw authError; // Re-throw the error to be handled by the caller
  }
};

export const signOut = async (): Promise<void> => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    const authError = error as AuthError;
    console.error("Error signing out:", authError.message);
    throw authError;
  }
};

// onAuthStateChanged is handled in AuthContext.tsx
// You can export auth if needed directly: export { auth };
