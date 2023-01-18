import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  items:any = [
    { name: 'Angular', path: 'angular' },
    { name: 'Explore', path: 'explore' },
    { name: 'Transact', path: 'transact' }
 ]
}
