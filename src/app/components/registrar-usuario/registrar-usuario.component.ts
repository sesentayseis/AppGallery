import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FirebaseCodeErrorService } from 'src/app/services/firebase-code-error.service';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent  implements OnInit {
  registrarUsuario: FormGroup;
  loading: boolean = false;

  constructor( 
      private fb: FormBuilder,
      private afAuth: AngularFireAuth , 
      private toastr: ToastrService,
      private router: Router,
      private firebaseError: FirebaseCodeErrorService
      
      ){
    this.registrarUsuario = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      repetirPassword: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    
  }

  registrar(){
    const email = this.registrarUsuario.value.email;
    const password = this.registrarUsuario.value.password;
    const repetirPassword = this.registrarUsuario.value.repetirPassword;
    if (password !== repetirPassword){
      this.toastr.error('Las contraseñas ingresadas deben ser las mismas', 'Error')
      return;
    }
    this.loading = true;
    
    this.afAuth.createUserWithEmailAndPassword(email, password).then(() => {
      this.loading = false;
      this.toastr.success('El usuario fue creado con exito!', 'Usuario Registrado ');
      this.router.navigate(['/login']);
      
    }).catch((error) => {
      this.loading = false;
      console.log(error);
      this.toastr.error(this.firebaseError.codeError(error.code), 'Error');
    })

  }

 

}
