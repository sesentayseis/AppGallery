import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiUserIdService {
  private userIdSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  userId$: Observable<string> = this.userIdSubject.asObservable();

  setUserId(userId: string): void {
    this.userIdSubject.next(userId);
    
  }

  constructor() { 
    
  }
}

