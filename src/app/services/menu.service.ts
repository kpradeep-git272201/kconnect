import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private menuUpdate = new BehaviorSubject<void>(null);
  menuUpdate$ = this.menuUpdate.asObservable();
  
  constructor() { }
  
  refreshMenu() {
    this.menuUpdate.next();
  }

}
