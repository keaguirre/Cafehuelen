import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent{
  response!: any[];
  respuesta: any;

  public formLogin: FormGroup = new FormGroup({
    usuario: new FormControl('',[Validators.required]),
    contrasena: new FormControl('',[Validators.required])
  });

  ngOnInit(): void {
  }
  constructor(private ls: LoginService) { }

  onList(): void{
    console.log(this.formLogin.value);
  }
  onQuery(): void{
    this.ls.obtenerListadoAdmin().then(respuesta => {
      this.response = respuesta.data;
      // console.log('Response: '+this.response.data)
    });
  }
}
