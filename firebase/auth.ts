import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "@firebase/auth";
import { app } from "@/firebase/config";
import { createDefaultUser } from "@/firebase/firestore";

export const auth: Auth = getAuth(app);

export async function signUp(email: string, password: string): Promise<void> {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    if (userCredential?.user?.email) {
      await createDefaultUser(
        userCredential.user.uid,
        userCredential.user.email
      );
    }
  } catch (e) {
    throw e;
  }
}

export async function signInWithGoogle(): Promise<void> {
  try {
    const result = await signInWithPopup(auth, new GoogleAuthProvider());
    const { user } = result;
    if (user) {
      await createDefaultUser(user.uid, user.email);
    }
  } catch (e) {
    throw e;
  }
}

export async function login(email: string, password: string): Promise<void> {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    throw e;
  }
}

export async function logout(): Promise<void> {
  try {
    await signOut(auth);
  } catch (e) {
    throw e;
  }
}
