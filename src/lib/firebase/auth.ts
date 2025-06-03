
import { 
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
  createUserWithEmailAndPassword as firebaseCreateUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail as firebaseSendPasswordResetEmail, // Added import
  UserCredential,
  AuthError
} from 'firebase/auth';
import { auth } from './config';

export const signInWithEmailPassword = async (email: string, password: string): Promise<UserCredential> => {
  try {
    const userCredential = await firebaseSignInWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    const authError = error as AuthError;
    console.error("Error signing in with email and password:", authError.message);
    throw authError;
  }
};

export const signUpWithEmailPassword = async (email: string, password: string): Promise<UserCredential> => {
  try {
    const userCredential = await firebaseCreateUserWithEmailAndPassword(auth, email, password);
    // User is automatically signed in by Firebase upon successful creation
    return userCredential;
  } catch (error) {
    const authError = error as AuthError;
    console.error("Error signing up with email and password:", authError.message);
    throw authError; 
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

export const sendPasswordReset = async (email: string): Promise<void> => {
  try {
    await firebaseSendPasswordResetEmail(auth, email);
  } catch (error) {
    const authError = error as AuthError;
    console.error("Error sending password reset email:", authError.message);
    // Note: Firebase sendPasswordResetEmail typically doesn't error out if the email doesn't exist
    // for security reasons (to prevent email enumeration).
    // It will error for malformed emails or other issues.
    throw authError;
  }
};

// onAuthStateChanged is handled in AuthContext.tsx
// You can export auth if needed directly: export { auth };
