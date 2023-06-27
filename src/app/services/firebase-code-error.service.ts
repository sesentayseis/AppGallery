import { Injectable } from '@angular/core';
import { FirebaseCodeErrorEnum } from '../utils/firebase-code-error';

@Injectable({
  providedIn: 'root'
})
export class FirebaseCodeErrorService {

  constructor() { }

  codeError(code: string) {
    switch(code){

      //El correo ya existe
      case FirebaseCodeErrorEnum.EmailAlreadyInUse:
        return 'El usuario ya existe';
      
        //debil password
      case FirebaseCodeErrorEnum.WeakPassword:
        return 'La contraseña es muy debil';

        //correo invalido
      case FirebaseCodeErrorEnum.InvalidEmail:
        return 'Correo invalido';

        //Contraseña incorrecta
      case FirebaseCodeErrorEnum.WrongPassword:
        return 'Contraseña incorrecta';

        //The user not found
      case FirebaseCodeErrorEnum.UserNotFound:
        return 'El usuario no existe';
      
      default:
        return 'Error desconocido';
    }
  }
}
