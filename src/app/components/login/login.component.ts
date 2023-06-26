import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginUsuario: FormGroup;

  constructor( 
    private fb: FormBuilder,
    private afAuth: AngularFireAuth , 
    private toastr: ToastrService,
    private router: Router){
  
      this.loginUsuario = this.fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required],
      })
  }

  ngOnInit(): void{}

  login(){
    const email = this.loginUsuario.value.email;
    const password = this.loginUsuario.value.password;

    this.afAuth.signInWithEmailAndPassword (email,password).then((user) => {
      /*
      this.toastr.success('El usuario fue creado con exito!', 'Usuario Registrado ');
      */
      console.log(user)
      this.router.navigate(['/dashboard']);
    }).catch((error) => {
      console.log(error);      
    })
  }

}
