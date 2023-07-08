import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
    dataUser: any;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
   
    ) { }

    ngOnInit(): void {
      
      this.afAuth.user.subscribe(user => {
        if (user && user.emailVerified) {
          this.dataUser = user;
          
        } else {
          this.router.navigate(['/login']);
        }
      });
    }

    
}
