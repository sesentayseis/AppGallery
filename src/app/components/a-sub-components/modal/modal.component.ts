import { Component, OnInit } from '@angular/core';
import { SwitchService } from '../services/switch.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { v4 as uuidv4 } from 'uuid';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  crearFolder: FormGroup;
  dataUser: any;
  constructor(
    private modalSS: SwitchService,
    private fb: FormBuilder,
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    ){

    this.crearFolder = this.fb.group({
      nameFolder: ['', Validators.required]
     
    })
  }
  ngOnInit(): void {

    
    
  }

  
  async createFolder() {
    const folderName = this.crearFolder.value.nameFolder;
    // nombre del al carpeta console.log(folderName);
  
    this.afAuth.currentUser.then(user => {
      const idfolder = user?.uid;
  
      const usuariosRef = this.db.list('usuarios', ref => ref.orderByChild('id').equalTo(`${idfolder}`));
      usuariosRef.valueChanges().subscribe(data => {
        const user = data[0] as { api: string }; // Asigna el objeto de usuario con la propiedad 'api'
        const api = user.api; // Accede a la propiedad 'api' del usuario
  
        const folderData = {
          folderId:  `${uuidv4()}`,
          nombre:folderName,
          imagenes: [],
        };

        //console.log(folderData);
        
        try {
          // Enviar el objeto al endpoint de la API
          const response = fetch(api+"/folders", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(folderData),
          });
        
          response.then((res) => {
            if (res.ok) {
              res.json().then((result) => {
                //console.log(result);
                console.log('carpeta creada con exito');
                //alert('carpeta creada con exito');
                this.modalSS.$modal.emit(false);
                this.toastr.success('carpeta creada con exito', 'Carpeta Creada')
                
              });
            } else {
              console.log('Error al subir la carpeta');
            }
          }).catch((error) => {
            console.log(error);
           // alert('Error al enviar los datos a la API.');
          });
          
        } catch (error) {
          console.log(error);
          //alert('Error al enviar los datos a la API');
        }

      });
    });
  }
  
  //logica del modal
  closeModal(){
    this.modalSS.$modal.emit(false);
  }

}
