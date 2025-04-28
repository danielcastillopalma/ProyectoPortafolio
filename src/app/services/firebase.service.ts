import { Injectable } from '@angular/core';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication'


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor() { }

  LoginWithGoogle() {
    const signInWithGoogle = async () => {
      const result = await FirebaseAuthentication.signInWithGoogle();
      console.log(result.user);
      return result.user;
    }
  }
}
