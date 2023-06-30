import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FirebaseCodeErrorService } from 'src/app/services/firebase-code-error.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';

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
      private firebaseError: FirebaseCodeErrorService,
      private db: AngularFireDatabase
      
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
    
    this.afAuth.createUserWithEmailAndPassword(email, password).then((userCredential) => {
      
      const user = userCredential.user;
      if (user) {
        const userId = user.uid;
  
        // Obtener referencia a la ubicación en la base de datos
        const usuariosRef = this.db.list('usuarios');
  
        // Guardar los datos en la base de datos
        usuariosRef.push({ email, username: email, id: userId , api: 'https://bewvyx49ag.execute-api.us-east-1.amazonaws.com/images/'+userId}).then(() => {
          // Los datos se guardaron correctamente
          this.toastr.success('El usuario fue creado con éxito!', 'Usuario Registrado');
  
      
        }).catch((error) => {
          // Ocurrió un error al guardar los datos
          console.log(error);
          this.toastr.error('Error al guardar los datos en la base de datos', 'Error');
        });
  
        this.verificarCorreo();
      } else {
        this.loading = false;
        console.log('No se pudo obtener el objeto de usuario');
        this.toastr.error('Error al crear el usuario', 'Error');
      }
      
      
    }).catch((error) => {
      this.loading = false;
      console.log(error);
      this.toastr.error(this.firebaseError.codeError(error.code), 'Error');
    })

  }

 verificarCorreo() {
    this.afAuth.currentUser.then(user => user?.sendEmailVerification())
                .then(() => { 
                  this.toastr.info(
                    'Se envio un email de verificación', 
                    'Verificar email'
                    );


                  this.router.navigate(['/login']);
                });

 }

}
