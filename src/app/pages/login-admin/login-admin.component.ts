import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent{
  // response!: any[];
  response!: any
  respuesta: any;

  public formLogin: FormGroup = new FormGroup({
    usuario: new FormControl('',[Validators.required]),
    contrasena: new FormControl('',[Validators.required])
  });

  ngOnInit(): void {
  }
  constructor(private loginserv: LoginService, private router: Router) { }

  // onQuery(): void{
  //   this.loginserv.obtenerListadoAdmin().then(respuesta => {
  //     this.response = respuesta;
  //     // console.log('Response: '+this.response.data)
  //   });
  // }
  onSearch(): void{
    try{
      this.loginserv.obtenerAdminLogin(this.formLogin.value.usuario).then(respuesta => {
        this.response = respuesta;
        if (this.formLogin.value.usuario == this.response.usuario && this.response.contrasena == this.response.contrasena){
          //aqui agregar algun metodo para manejar la session
          // this.router.navigateByUrl('/admin')
          console.log('Home admin')
        }
        else{
            //levantar algun error tostada o tooltip
            console.log('Intenta denuevo')
        }
      });
    }catch (e: any){
    console.log(e);
  }



  }
}
