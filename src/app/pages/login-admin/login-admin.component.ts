import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/loginService/login.service';
import{map} from 'rxjs/operators'
import { SHA256 } from 'crypto-js';
import Swal from 'sweetalert2';

/**
  * Descripción de la clase
  * @method this.formLogin formulario de login
  * @method this.onSearch() Toma los valores de formlogin, hashea la pass y
  * envia un request al back para validar las credenciales.
*/

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent{
  response!: any
  respuesta: any;

  public formLogin: FormGroup = new FormGroup({
    usuario: new FormControl('',[Validators.required]),
    contrasena: new FormControl('',[Validators.required])
  });

  ngOnInit(): void {}
  constructor(private loginserv: LoginService, private router: Router) {}

  toastCheck = Swal.mixin({
    toast: true,
    icon:'success',
    position: 'bottom-right',
    iconColor: 'green',
    showConfirmButton: false, 
    timer: 5000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    },
    customClass: {
      popup: 'colored-toast',
    },
  })

  //TOAST ERROR
  toastError = Swal.mixin({
    toast: true,
    position: 'bottom-right',
    icon:'error',
    iconColor: 'red',
    showConfirmButton: false, 
    timer: 5000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    },
    customClass: {
      popup: 'colored-toast'
    },
  })

/**
  * Descripción de metodo
  * @method this.onSearch() Toma los valores de formlogin, hashea la pass y
  * envia un request al back para validar las credenciales.
  * el método anterior @fires toastCheck y @fires toastError segun la respuesta.
  * @eventProperty Redirije al home una vez @fires toastCheck
*/
  onSearch(): void{
    try{
      let pass = SHA256(this.formLogin.value.contrasena).toString();
      this.formLogin.patchValue({contrasena: pass})
      this.loginserv.obtenerAdminDetalle(this.formLogin.value).then(respuesta => {
        this.response = respuesta;
        
        if (this.response){
          //aqui agregar algun metodo para manejar la session
          this.router.navigateByUrl('/admin/home')
          this.toastCheck.fire({icon: 'success',title: 'Sesión iniciada correctamente.'}) 
        }
      }).catch(err => { //cachea el error de la solicitud
        this.toastError.fire({icon: 'error',title: 'Ha habido un error, revise los datos ingresados e intente nuevamente.'});
      });
    }catch (e: any){
      console.log(e);
    }
  }


}