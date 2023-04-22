import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductosService } from 'src/app/services/ProductosService/productos.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent {

  response!: any
  responseListadoCategorias!: any
  responseListadoIngrePrep!: any
  responseListadoPreparacion!: any
  responseListadoIngrediente!: any
  respuesta: any;

  ngOnInit(): void {
  }
  constructor(private prodService:ProductosService , private router: Router){}
  
  public formIngrediente: FormGroup = new FormGroup({
    marca: new FormControl('',[Validators.required]),
    descripcion: new FormControl('',[Validators.required]),
    cantidad: new FormControl('',[Validators.required, ]),
    stock: new FormControl('',[Validators.required]),
    tipoUnidad: new FormControl('',[Validators.required]),
    imagen: new FormControl('',[Validators.required])
  });

  public formPreraraciones: FormGroup = new FormGroup({
    nombrePrep: new FormControl('',[Validators.required]), 
    descripcion: new FormControl('',[Validators.required]),
    stock: new FormControl('',[Validators.required]),
    precio: new FormControl('',[Validators.required]),
    categoria: new FormControl('',[Validators.required]),
    imagen: new FormControl('',[Validators.required])
  });
  public formIngredientePrep: FormGroup = new FormGroup({
    idPrep: new FormControl('',[Validators.required]),
    idIngrediente: new FormControl('',[Validators.required]),
    cantidad: new FormControl('',[Validators.required]),
    tipoUnidad: new FormControl('',[Validators.required])
  });

  public formCategorias: FormGroup = new FormGroup({
    nombre_cat: new FormControl('',[Validators.required]),
  });

//Categorias
  onListCategorias(): void{
    try{
      this.prodService.obtenerListadoCategoria().then(respuesta => {
        this.responseListadoCategorias = respuesta; //obj con listado ngFor
      });
    }catch (e: any){
    console.log(e);
    }
  }

  //Crear
  onCreateCategoria(): void{
    try{
      let formCatValue = JSON.stringify(this.formCategorias.value);
      this.prodService.crearCategoria(formCatValue).then(respuesta => {
        this.response = respuesta;
      });
    }catch (e: any){
    console.log(e);
    }
  }

  onActualizaCategoria(): void{
    try{
      let formCatValue = JSON.stringify(this.formCategorias.value);
      this.prodService.actualizarCategoria(this.formCategorias.value.nombre_cat, formCatValue).then(respuesta => {
        this.response = respuesta;
      });
    }catch (e: any){
    console.log(e);
    }
  }
  

}
