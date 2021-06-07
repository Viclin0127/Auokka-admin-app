import { Component, OnInit } from '@angular/core';
import { collapsable } from '../../utility/animation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  animations: [collapsable]
})
export class NavigationComponent implements OnInit {

  displayMenu: boolean = false;
  firstname: string = '';
  surname: string = '';
  loggedIn: boolean = false;
  constructor(public router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('auokkastudenttoken')) {
      this.firstname = localStorage.getItem('auokkastudentfirstname');
      this.surname = localStorage.getItem('auokkastudentsurname');
      this.loggedIn = true;
    }
  }

  logOut() {
    localStorage.removeItem('auokkastudenttoken');
    localStorage.removeItem('auokkastudentfirstname');
    localStorage.removeItem('auokkastudentsurname');
    this.router.navigate(['/login']);
  }

  toggleMenuDisplay() {
    this.displayMenu = !this.displayMenu;
  }

  inMobileMode() {
    return window.innerWidth < 768;
  }
}
