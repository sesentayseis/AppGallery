import { Component, OnInit} from '@angular/core';
import { SwitchService } from '../services/switch.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modaledit',
  templateUrl: './modaledit.component.html',
  styleUrls: ['./modaledit.component.css']
})
export class ModaleditComponent implements OnInit {
  crearFolder: FormGroup;
  dataUser: any;
  loading: boolean = false;
  showSpinner: boolean = false;
  constructor(
    private modalSS: SwitchService,
    private fb: FormBuilder,
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private router: Router,
    private toastr: ToastrService,
    ){

    this.crearFolder = this.fb.group({
      nameFolder: ['', Validators.required]
     
    })
  }
  ngOnInit(): void {

  }

  async updateFolder(carpeta: any) {
    const folderData = {
      nombre: carpeta.nombre,
      imagenes: carpeta.imagenes
    };
  
    this.afAuth.currentUser.then(user => {
      const idFolder = user?.uid;
  
      const usuariosRef = this.db.list('usuarios', ref => ref.orderByChild('id').equalTo(`${idFolder}`));
      usuariosRef.valueChanges().subscribe(data => {
        const user = data[0] as { api: string };
        const api = user.api;
  
  
        try {
          const url = `${api}/folders/${carpeta.folderId}`;
  
          const response = fetch(url, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(folderData)
          });
  
          response.then((res) => {
            if (res.ok) {
              res.json().then((result) => {
                console.log('Carpeta actualizada con éxito');
                this.toastr.success('Carpeta actualizada con éxito', 'Éxito');
              });
            } else {
              console.log('Error al actualizar la carpeta');
            }
          }).catch((error) => {
            console.log(error);
          });
        } catch (error) {
          console.log(error);
        }
  
        
      });
    });
  }
  closeModal(){
    this.modalSS.$modal.emit(false);
  }

  

}
