import { initializeApp } from "firebase/app";
import {
  getAuth, signInWithEmailAndPassword, signOut,
  GoogleAuthProvider, FacebookAuthProvider, signInWithRedirect, getRedirectResult
} from 'firebase/auth';

import { CookieService } from './cookie.service';

const app = initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_apiKey,
  authDomain: process.env.REACT_APP_FIREBASE_authDomain,
  projectId: process.env.REACT_APP_FIREBASE_projectId,
  storageBucket: process.env.REACT_APP_FIREBASE_storageBucket,
  messagingSenderId: process.env.REACT_APP_FIREBASE_messagingSenderId,
  appId: process.env.REACT_APP_FIREBASE_appId
});

const auth = getAuth(app);

class AuthService {

  async signInEmail(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password).then(async credential => {
      const token = await credential.user.getIdToken();
      CookieService.setCookie('token', token);
      return credential.user;
    });
  }

  async signInGoogle() {
    const provider = new GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    return signInWithRedirect(auth, provider);
  }

  async signInFacebook() {
    const provider = new FacebookAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    return signInWithRedirect(auth, provider);
  }

  async socialResult() {
    return getRedirectResult(auth).then(async credential => {
      if (!credential) return Promise.reject();

      const token = await credential.user.getIdToken();
      CookieService.setCookie('token', token);
      return credential.user;
    });
  }

  async signOut() {
    await signOut(auth);
    CookieService.deleteCookie('token');
  }
}

export default new AuthService();