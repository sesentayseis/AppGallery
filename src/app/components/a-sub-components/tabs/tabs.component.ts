import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { v4 as uuidv4 } from 'uuid';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { HttpClient } from '@angular/common/http';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { Router } from '@angular/router';
import { SwitchService } from '../services/switch.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {
  modalSwitch: boolean = false;
  user: any;
  idUsuario: string | undefined;
  dataUser: any;
  carpetas: any[] = [];
  folderId: any;
;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private db: AngularFireDatabase,
    private http: HttpClient,
    private router: Router,
    private modalSS: SwitchService,
  ) {}

  ngOnInit(): void {
    this.modalSS.$modal.subscribe((valor) => {this.modalSwitch = valor;});
    

    this.afAuth.user.subscribe(user => {
      
          this.dataUser = user;
          this.idUsuario = user?.uid;

        const apiFolders = `https://xw2v9yt588.execute-api.us-east-1.amazonaws.com/users/${this.idUsuario}/folders`;
        console

        this.http.get(apiFolders).subscribe((response: any) => {
          this.carpetas = response;
          console.log(this.carpetas);
    
        });
     

    });
  }

  
  openModal(idFolder:any){
    this.modalSS.$data.emit(idFolder);
    this.modalSwitch = true;
    console.log(idFolder);
  }
 

  



}
