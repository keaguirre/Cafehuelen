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

  sidebarVisible = false;
  abrirSidebar() {
    this.sidebarVisible = true;
  }


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

  esconderNav() {
    let prevScrollpos = window.pageYOffset;
    window.onscroll = function() {
      const currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        document.getElementById("navbar")!.style.top = "0";
      } else {
        document.getElementById("navbar")!.style.top = "-50px";
      }
      prevScrollpos = currentScrollPos;
    };
  }
}  

