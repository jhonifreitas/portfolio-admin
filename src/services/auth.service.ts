import {
  GoogleAuthProvider, FacebookAuthProvider, UserCredential,
  signInWithEmailAndPassword, signOut, signInWithRedirect, getRedirectResult
} from 'firebase/auth';

import { fbAuth } from "../firebase.config";
import ProfileApi from './apis/profile.service';
import { CookieService } from './cookie.service';

class AuthService {

  async signInEmail(email: string, password: string) {
    return signInWithEmailAndPassword(fbAuth, email, password).then(async credential => {
      await this.setProfile(credential);
      return credential.user;
    });
  }

  async signInGoogle() {
    const provider = new GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    return signInWithRedirect(fbAuth, provider);
  }

  async signInFacebook() {
    const provider = new FacebookAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    return signInWithRedirect(fbAuth, provider);
  }

  async socialResult() {
    return getRedirectResult(fbAuth).then(async credential => {
      if (!credential) return Promise.reject();

      await this.setProfile(credential);
      return credential.user;
    });
  }

  async signOut() {
    await signOut(fbAuth);
    CookieService.deleteCookie('token');
    CookieService.deleteCookie('profile');
    window.location.href = '/entrar?returnUrl='+window.location.pathname;
  }

  private async setProfile(credential: UserCredential) {
    const token = await credential.user.getIdToken();
    CookieService.setCookie('token', token);
    
    const profile = await ProfileApi.getById(credential.user.uid).catch(_ => {});

    if (profile) {
      CookieService.setCookie('profile', JSON.stringify(profile));
    } else {
      await signOut(fbAuth);
      CookieService.deleteCookie('token');
      CookieService.deleteCookie('profile');
      return Promise.reject({message: 'Perfil não encontrado!'});
    }
  }
}

export default new AuthService();