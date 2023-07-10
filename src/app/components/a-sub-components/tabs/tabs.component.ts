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
  @ViewChild('folderIdInput', { static: false }) folderIdInput!: ElementRef<HTMLInputElement>;
  modalSwitch: boolean = false;
  user: any;
  idUsuario: string | undefined;
  dataUser: any;
  carpetas: any[] = [];
  folderId: any;
  editMode = true;
  isHovered: boolean = false;
  guardarcambio: FormGroup;
; 

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private db: AngularFireDatabase,
    private http: HttpClient,
    private router: Router,
    private modalSS: SwitchService,
  ) {
    this.guardarcambio = this.fb.group({
      foldername: [''],
      folderid: ['']
    });
  }

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


  
  editarnombre(){
    this.editMode = false;
  }

  cerrareditarnombre(){
    this.editMode = true;
  }

  
  cambiarnombre(){

    

        console.log("cambiar nombre ")
  };
  eliminarcarpeta(){
    
   
      console.log("se elimino la carpeta  ")
  }
  
  guardarCambios(){
    const foldername = this.guardarcambio.value.foldername;
      const folderId = this.folderIdInput.nativeElement.getAttribute('id');

  // Aquí puedes realizar las acciones necesarias con los valores del formulario

  console.log('Nombre de carpeta:', foldername);
  console.log('ID de carpeta:', folderId);
  }


}
