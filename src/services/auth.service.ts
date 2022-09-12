import {
  getAuth, signInWithEmailAndPassword, signOut,
  GoogleAuthProvider, FacebookAuthProvider, signInWithRedirect, getRedirectResult
} from 'firebase/auth';

import { CookieService } from './cookie.service';

class AuthService {

  private auth = getAuth();

  async signInEmail(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password).then(async credential => {
      const token = await credential.user.getIdToken();
      CookieService.setCookie('token', token);
      return credential.user;
    });
  }

  async signInGoogle() {
    const provider = new GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    return signInWithRedirect(this.auth, provider);
  }

  async signInFacebook() {
    const provider = new FacebookAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    return signInWithRedirect(this.auth, provider);
  }

  async socialResult() {
    return getRedirectResult(this.auth).then(async credential => {
      if (!credential) return Promise.reject();

      const token = await credential.user.getIdToken();
      CookieService.setCookie('token', token);
      return credential.user;
    });
  }

  async signOut() {
    await signOut(this.auth);
    CookieService.deleteCookie('token');
  }
}

export default new AuthService();