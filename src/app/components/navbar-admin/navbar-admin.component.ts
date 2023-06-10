import { Component,HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.css']
})
export class NavbarAdminComponent {
  constructor(private router:Router) { }
  isNavbarFixed = false;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event) {
  const verticalOffset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  this.isNavbarFixed = verticalOffset > 100; 
}


  cerrarSesion(){
    localStorage.setItem('userSession', 'False')
    if (localStorage.getItem('userSession') == 'False'){
      this.router.navigateByUrl('/admin');
    }
  }
}

