import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FirebaseCodeErrorService } from 'src/app/services/firebase-code-error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginUsuario: FormGroup;
  loading: boolean = false;
  dataUser: any;

  constructor( 
    private fb: FormBuilder,
    private afAuth: AngularFireAuth , 
    private toastr: ToastrService,
    private router: Router,
    private firebaseError: FirebaseCodeErrorService,
   
    
    ){
  
      this.loginUsuario = this.fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required],
      })
  }

  ngOnInit(): void{
    this.afAuth.user.subscribe(user => {
      if (user && user.emailVerified) {
        this.router.navigate(['/dashboard']);
        this.toastr.info('Si deseas regresar al login cierra tu sesion ','Ya estas logeado');
        
      } 
    });
  }

  login(){
    const email = this.loginUsuario.value.email;
    const password = this.loginUsuario.value.password;

    this.loading = true;
    this.afAuth.signInWithEmailAndPassword (email,password).then((user) => {
      this.loading = false;

      if(user.user?.emailVerified){
        this.router.navigate(['/dashboard']);
      } else{
        this.router.navigate(['/verificar-correo']);
      }
      
      
    }).catch((error) => {
      this.loading = false; 
      this.toastr.error(this.firebaseError.codeError(error.code), 'Error');    
    })
  }

}
