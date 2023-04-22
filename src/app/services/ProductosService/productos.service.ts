import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  urlIngredientes:string = environment.urlApiIngredientes
  urlPreparaciones:string = environment.urlApiPreparaciones
  urlIngredPrep:string = environment.urlApiIngredPrep
  urlCategorias:string = environment.urlApiCategorias
  constructor(private http: HttpClient) { }

//LISTADOS-------------------------------------------------------

//Ingredientes------------------------------------------------
// Ingredientes + query
obtenerIngredienteDetalle(ingre:any): Promise<any> {
  return new Promise((resolve, reject) => {
    this.http.get(this.urlIngredientes+ingre).subscribe({
      next: respuesta => {
        resolve(respuesta);
      },
      error: err => {
        if (err.status == 500){
          console.log(err.statusText)
        }
        else if(err.status == 400){
          console.log(err.statusText)
          //bad request
        }
        else if(err.status == 404){
          console.log(err.statusText)
          //404 not found
        }
        else {
          // console.log(err.status)
          reject(err.status);
        }
      }
    });
  });
}
//Listado ingredientes
obtenerListadoIngrediente(): Promise<any> {
  return new Promise((resolve, reject) => {
    this.http.get(this.urlIngredientes).subscribe({
      next: respuesta => {
        resolve(respuesta);
      },
      error: err => {
        reject(err);
      }
    });
  });
}    
//Preparaciones------------------------------------------------
//Preparaciones + query------------------------------------------------
obtenerPreparacionDetalle(prep:any): Promise<any> {
  return new Promise((resolve, reject) => {
    this.http.get(this.urlPreparaciones+prep).subscribe({
      next: respuesta => {
        resolve(respuesta);
      },
      error: err => {
        if (err.status == 500){
          console.log(err.statusText)
        }
        else if(err.status == 400){
          console.log(err.statusText)
          //bad request
        }
        else if(err.status == 404){
          console.log(err.statusText)
          //404 not found
        }
        else {
          // console.log(err.status)
          reject(err.status);
        }
      }
    });
  });
}
//Listado preparaciones
obtenerListadoPreparacion(): Promise<any> {
  return new Promise((resolve, reject) => {
    this.http.get(this.urlPreparaciones).subscribe({
      next: respuesta => {
        resolve(respuesta);
      },
      error: err => {
        reject(err);
      }
    });
  });
}    
//Ingredientes Preparaciones------------------------------------------------
// Ingredientes preparaciones + query
obtenerIngrePrepDetalle(ingrePrep:any): Promise<any> {
  return new Promise((resolve, reject) => {
    this.http.get(this.urlIngredPrep+ingrePrep).subscribe({
      next: respuesta => {
        resolve(respuesta);
      },
      error: err => {
        if (err.status == 500){
          console.log(err.statusText)
        }
        else if(err.status == 400){
          console.log(err.statusText)
          //bad request
        }
        else if(err.status == 404){
          console.log(err.statusText)
          //404 not found
        }
        else {
          // console.log(err.status)
          reject(err.status);
        }
      }
    });
  });
}
//Listado ingredientes preparaciones
obtenerListadoIngrePrep(): Promise<any> {
  return new Promise((resolve, reject) => {
    this.http.get(this.urlIngredPrep).subscribe({
      next: respuesta => {
        resolve(respuesta);
      },
      error: err => {
        reject(err);
      }
    });
  });
}
    
//Categorias------------------------------------------------
// Categoria + query
obtenerCategoriaDetalle(cat:any): Promise<any> {
  return new Promise((resolve, reject) => {
    this.http.get(this.urlCategorias+cat).subscribe({
      next: respuesta => {
        resolve(respuesta);
      },
      error: err => {
        if (err.status == 500){
          console.log(err.statusText)
        }
        else if(err.status == 400){
          console.log(err.statusText)
          //bad request
        }
        else if(err.status == 404){
          console.log(err.statusText)
          //404 not found
        }
        else {
          // console.log(err.status)
          reject(err.status);
        }
      }
    });
  });
}
//Listado de Categorias
obtenerListadoCategoria(): Promise<any> {
  return new Promise((resolve, reject) => {
    this.http.get(this.urlCategorias).subscribe({
      next: respuesta => {
        resolve(respuesta);
      },
      error: err => {
        reject(err);
      }
    });
  });
}    

//CREAR OBJETOS---------------------------------------------------------------

crearIngrediente(ingrediente: any): Promise<any> {
  return new Promise((resolve, reject) => {
    this.http.post(this.urlIngredientes, ingrediente).subscribe({
      next: respuesta => {
        resolve(respuesta);
      },
      error: err => {
        if (err.status == 500){
          console.log(err.statusText)
          //internal server error
        }
        else if(err.status == 400){
          console.log(err.statusText)
          //bad request
        }
        else if(err.status == 404){
          console.log(err.statusText)
          //404 not found
        }
        else if(err.status == 409){
          console.log(err.statusText)
          //409 Conflict
        }
        else {
          // console.log(err.status)
          reject(err.status);
        }
      }
    });
  });
}
crearPrepraraciones(preparacion: any): Promise<any> {
  return new Promise((resolve, reject) => {
    this.http.post(this.urlPreparaciones, preparacion).subscribe({
      next: respuesta => {
        resolve(respuesta);
      },
      error: err => {
        if (err.status == 500){
          console.log(err.statusText)
          //internal server error
        }
        else if(err.status == 400){
          console.log(err.statusText)
          //bad request
        }
        else if(err.status == 404){
          console.log(err.statusText)
          //404 not found
        }
        else if(err.status == 409){
          console.log(err.statusText)
          //409 Conflict
        }
        else {
          // console.log(err.status)
          reject(err.status);
        }
      }
    });
  });
}
crearIngrePrep(ingredPrep: any): Promise<any> {
  return new Promise((resolve, reject) => {
    this.http.post(this.urlIngredPrep, ingredPrep).subscribe({
      next: respuesta => {
        resolve(respuesta);
      },
      error: err => {
        if (err.status == 500){
          console.log(err.statusText)
          //internal server error
        }
        else if(err.status == 400){
          console.log(err.statusText)
          //bad request
        }
        else if(err.status == 404){
          console.log(err.statusText)
          //404 not found
        }
        else if(err.status == 409){
          console.log(err.statusText)
          //409 Conflict
        }
        else {
          // console.log(err.status)
          reject(err.status);
        }
      }
    });
  });
}
crearCategoria(categoria: any): Promise<any> {
  return new Promise((resolve, reject) => {
    this.http.post(this.urlCategorias, categoria).subscribe({
      next: respuesta => {
        resolve(respuesta);
      },
      error: err => {
        if (err.status == 500){
          console.log(err.statusText)
          //internal server error
        }
        else if(err.status == 400){
          console.log(err.statusText)
          //bad request
        }
        else if(err.status == 404){
          console.log(err.statusText)
          //404 not found
        }
        else if(err.status == 409){
          console.log(err.statusText)
          //409 Conflict
        }
        else {
          // console.log(err.status)
          reject(err.status);
        }
      }
    });
  });
}

//Actualizar

actualizarCategoria(id_cat: any, catObj: any): Promise<any> {
  return new Promise((resolve, reject) => {
    this.http.put(this.urlCategorias + id_cat, catObj)
    .subscribe({
      next: respuesta => {
        resolve(respuesta);
      },
      error: err => {
        if (err.status == 500){ 
          console.log(err.statusText)
          //internal server error
        }
        else if(err.status == 400){
          console.log(err.statusText)
          //bad request
        }
        else if(err.status == 404){
          console.log(err.statusText)
          //404 not found
        }
        else if(err.status == 409){
          console.log(err.statusText)
          //409 Conflict
        }
        else {
          // console.log(err.status)
          reject(err.status);
        }
      }
    });
  });
}



borrarCategoria(nombre_cat: string): Promise<any> {
  return new Promise((resolve, reject) => {
    this.http.delete(this.urlCategorias + nombre_cat).subscribe({
      next: respuesta => {
        resolve(respuesta);
      },
      error: err => {
        if (err.status == 500){
          console.log(err.statusText)
          //internal server error
        }
        else if(err.status == 400){
          console.log(err.statusText)
          //bad request
        }
        else if(err.status == 404){
          console.log(err.statusText)
          //404 not found
        }
        else if(err.status == 409){
          console.log(err.statusText)
          //409 Conflict
        }
        else {
          // console.log(err.status)
          reject(err.status);
        }
      }
    });
  });
}



}
