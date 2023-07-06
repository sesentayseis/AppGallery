import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FirebaseCodeErrorService } from 'src/app/services/firebase-code-error.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { async } from '@angular/core/testing';

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
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      repetirPassword: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    
  }

  async registrar(){
    const username = this.registrarUsuario.value.username;
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
        const urlAws = 'https://xw2v9yt588.execute-api.us-east-1.amazonaws.com/users'
        const urlAwsApi = urlAws+"/"+userId
        // Obtener referencia a la ubicación en la base de datos
        const usuariosRef = this.db.list('usuarios');
  
        // Guardar los datos en la base de datos
        usuariosRef.push({ email, username: username, id: userId , api: urlAwsApi}).then(() => {
          // Los datos se guardaron correctamente
          this.toastr.success('El usuario fue creado con éxito!', 'Usuario Registrado');

          const usuarioData = {
            id:userId,
            nameUser:username,
            carpetas: [],
          };
        
          try {
            // Enviar el objeto al endpoint de la API
            const response = fetch(urlAws, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(usuarioData),
            });
          
            response.then((res) => {
              if (res.ok) {
                res.json().then((result) => {
                  console.log(result);
                  //alert('Usuario subida exitosamente');
                });
              } else {
                //alert('Error al subir la usuario');
              }
            }).catch((error) => {
              console.log(error);
             // alert('Error al enviar los datos a la API.');
            });
            
          } catch (error) {
            console.log(error);
            //alert('Error al enviar los datos a la API');
          }
          

      
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
