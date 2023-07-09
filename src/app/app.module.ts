import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//Modulos

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

// Componentes
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegistrarUsuarioComponent } from './components/registrar-usuario/registrar-usuario.component';
import { VerificarCorreoComponent } from './components/verificar-correo/verificar-correo.component';
import { RecuperarPasswordComponent } from './components/recuperar-password/recuperar-password.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { HeaderComponent } from './components/a-sub-components/header/header.component';
import { ImagesComponent } from './components/a-sub-components/images/images.component';
import { TabsComponent } from './components/a-sub-components/tabs/tabs.component';
import { ModalComponent }  from './components/a-sub-components/modal/modal.component';
import { SubirImagenComponent } from './components/a-sub-components/subir-imagen/subir-imagen.component';

import { HttpClientModule} from '@angular/common/http';
import { ModaleditComponent } from './components/a-sub-components/modaledit/modaledit.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RegistrarUsuarioComponent,
    VerificarCorreoComponent,
    RecuperarPasswordComponent,
    SpinnerComponent,
    HeaderComponent,
    ImagesComponent,
    TabsComponent,
    ModalComponent,
    SubirImagenComponent,
    ModaleditComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    HttpClientModule
  ],
  providers: [
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
