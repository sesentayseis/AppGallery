import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  dataUser: any;

  constructor(private afAuth: AngularFireAuth,
    private router: Router) { }

    ngOnInit(): void {
      this.afAuth.currentUser.then(user => {
        if(user && user.emailVerified) {
          this.dataUser = user;
          console.log(user)
        } else {
          this.router.navigate(['/login']);
        }
      })
    }

    logOut() {
      this.afAuth.signOut().then(() => this.router.navigate(['/login']));
    }
}
