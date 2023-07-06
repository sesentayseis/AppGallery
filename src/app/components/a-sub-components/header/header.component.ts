import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { SwitchService } from '../services/switch.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  dataUser: any;
  modalSwitch: boolean = false; ;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private modalSS: SwitchService) { }

    ngOnInit(): void {
      this.modalSS.$modal.subscribe((valor) => {this.modalSwitch = valor;});
    }

    logOut() {
      this.afAuth.signOut().then(() => this.router.navigate(['/login']));
    }

    // Logica del modal

    openModal(){
      this.modalSwitch = true;
      console.log('open modal');
    }
}
