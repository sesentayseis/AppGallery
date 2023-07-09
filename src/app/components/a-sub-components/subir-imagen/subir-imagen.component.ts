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

@Component({
  selector: 'app-subir-imagen',
  templateUrl: './subir-imagen.component.html',
  styleUrls: ['./subir-imagen.component.css']
})
export class SubirImagenComponent implements OnInit {
  guardarImagen: FormGroup;
  user: any;
  idUsuario: string | undefined;
  dataUser: any;
  carpetas: any[] = [];

  @ViewChild('imagesInput') imagesInput!: ElementRef<HTMLInputElement>;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private db: AngularFireDatabase,
    private http: HttpClient,
    private router: Router
  ) {
    this.guardarImagen = this.fb.group({
      imagename: [''/*, Validators.required*/],
      carpetaid: [''],
      imagemultimedia: ['']
    });
  }

  ngOnInit(): void {
    this.afAuth.user.subscribe(user => {
      
      
      //Desde la linea 47 hasta 54
      if (user && user.emailVerified) {
          this.dataUser = user;
          this.idUsuario = user?.uid;

        const api = `https://xw2v9yt588.execute-api.us-east-1.amazonaws.com/users/${this.idUsuario}/folders`;

        this.http.get(api).subscribe((response: any) => {
          this.carpetas = response;
          console.log(this.carpetas);
        });
      } else {
        this.router.navigate(['/login']);
      }

    });
  }

  async guardar() {
    //valores del formulario subir-imagen
    const imagename = this.guardarImagen.value.imagename;
    const carpetaid = this.guardarImagen.value.carpetaid;
    const imageFile = this.imagesInput.nativeElement?.files?.[0];


    // value api
    const api = `https://xw2v9yt588.execute-api.us-east-1.amazonaws.com/users/${this.idUsuario}/folders/${carpetaid}/images`;

    console.log(api);
    console.log('nombre: ' + imagename + '\ncarpeta:' + carpetaid + '\nimagen:' + imageFile);

    const newIdImage = uuidv4();
    const newImage = `${newIdImage}-${imagename}`;
   
    const storageRef = firebase.storage().ref();
    const imageRef = storageRef.child(`profile_images/${newImage}`);

    try {
      
      if (imageFile) {
        const snapshot = await imageRef.put(imageFile);

      const downloadURL = await snapshot.ref.getDownloadURL();

      console.log("imageId: " + newIdImage + "\nnombre: " + imagename + "\nURL:" + downloadURL);
      //solo variable nombre-carpetas
      const imagenData = {
        imageId: newIdImage,
        nombre: imagename,
        URL: downloadURL
      };

      const response = await fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(imagenData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        this.toastr.success('Imagen subida exitosamente', 'Imagen Creada');
        this.router.navigate(['/dashboard']);
      } else {
        console.log("Error al subir la imagen");
      }
      }

      
    } catch (error) {
      console.error(error);
      console.log("Error al subir la imagen");
    }
  }

  
}
