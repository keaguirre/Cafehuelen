import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  urlIngredientes:string = environment.urlApiIngredientes
  urlPreparaciones:string = environment.urlApiPreparaciones
  urlDetallePrep:string = environment.urlApiDetallePrep
  urlCategorias:string = environment.urlApiCategorias
  urlCategoriasDesh:string = environment.urlApiCategoriasDesh

  constructor(private http: HttpClient) { }

  //LISTADOS-------------------------------------------------------

  //Ingredientes------------------------------------------------
  // Ingredientes + query
  obtenerIngredienteDetalle(ingre:any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.urlIngredientes+ingre).subscribe({
        next: respuesta => {
          resolve(respuesta)
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
  obtenerDetallePrepDetalle(idDetalleP:any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.urlDetallePrep+idDetalleP).subscribe({
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
  obtenerListadoDetallePrep(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.urlDetallePrep).subscribe({
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
//Listado Categorias deshabilitadas
obtenerListadoCategoriaDesahabilitadas(): Promise<any> {
  return new Promise((resolve, reject) => {
    this.http.get(this.urlCategoriasDesh).subscribe({
      next: respuesta => {
        resolve(respuesta);
      },
      error: err => {
        reject(err);
      }
    });
  });
}    
//
  //CREAR OBJETOS---------------------------------------------------------------

  crearIngrediente(ingrediente: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.urlIngredientes, ingrediente).subscribe({
        next: respuesta => {
          resolve(respuesta)
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

  crearPreparaciones(preparacion: any): Promise<any> {
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
  crearDetallePrep(detallePrep: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.urlDetallePrep, detallePrep).subscribe({
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
            console.log('Error interno'+err.statusText)
            reject('Error interno al crear categoria.')
            //internal server error
          }
          else if(err.status == 400){
            if('nombre_cat' in err.error){
              //Revisar este in por un .includes()
              reject(err.error.nombre_cat[0])
            }
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

  //ACTUALIZAR OBJETOS---------------------------------------------------------------
  actualizarIngrediente(id_ingre: any, ingreObj: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.put(this.urlIngredientes + id_ingre, ingreObj)
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
  actualizarPreparacion(id_prep: any, prepObj: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.put(this.urlPreparaciones + id_prep, prepObj)
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
  actualizarDetallePrep(id_ingre: any, detallePrepObj: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.put(this.urlDetallePrep + id_ingre, detallePrepObj)
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
  actualizarCategoriaDesh(id_cat: any, catObj: any,estado:boolean): Promise<any> {
    catObj=estado;
    return new Promise((resolve, reject) => {
      this.http.put(this.urlCategoriasDesh + id_cat, catObj)
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
  //DESHABILITAR OBJETOS---------------------------------------------------------------
  disableIngrediente(id_ingre: number): Promise<any> {
    let jsonDisable: Object = {"estado": false}
    return new Promise((resolve, reject) => {
      this.http.patch(this.urlIngredientes + id_ingre, jsonDisable).subscribe({
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
  disablePreparacion(id_prep: number): Promise<any> {
    let jsonDisable: Object = {"estado": false}
    return new Promise((resolve, reject) => {
      this.http.patch(this.urlPreparaciones + id_prep,jsonDisable).subscribe({
        next: respuesta => {
          console.log(respuesta);
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
  disableDetallePrep(id_DetallePrep: number): Promise<any> {
    let jsonDisable: Object = {"estado": false}
    return new Promise((resolve, reject) => {
      this.http.patch(this.urlDetallePrep + id_DetallePrep,jsonDisable).subscribe({
        next: respuesta => {
          console.log(respuesta);
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
  disableCategoria(id_cat: number): Promise<any> {
    let jsonDisable: Object = {"estado": false}
    return new Promise((resolve, reject) => {
      this.http.patch(this.urlCategorias + id_cat,jsonDisable).subscribe({
        next: respuesta => {
          resolve(respuesta);
        },
        error: err => {
          if (err.status == 500){
            console.log('status: '+err.statusText)
            // console.log(Object.values(err))
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

  //ELIMINAR OBJETOS---------------------------------------------------------------
  // borrarIngrediente(id_ingre: number): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     this.http.delete(this.urlIngredientes + id_ingre).subscribe({
  //       next: respuesta => {
  //         resolve(respuesta);
  //       },
  //       error: err => {
  //         if (err.status == 500){
  //           console.log(err.statusText)
  //           //internal server error
  //         }
  //         else if(err.status == 400){
  //           console.log(err.statusText)
  //           //bad request
  //         }
  //         else if(err.status == 404){
  //           console.log(err.statusText)
  //           //404 not found
  //         }
  //         else if(err.status == 409){
  //           console.log(err.statusText)
  //           //409 Conflict
  //         }
  //         else {
  //           // console.log(err.status)
  //           reject(err.status);
  //         }
  //       }
  //     });
  //   });
  // }
  // borrarPreparacion(id_prep: number): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     this.http.delete(this.urlPreparaciones + id_prep).subscribe({
  //       next: respuesta => {
  //         console.log(respuesta);
  //         resolve(respuesta);
  //       },
  //       error: err => {
  //         if (err.status == 500){
  //           console.log(err.statusText)
  //           //internal server error
  //         }
  //         else if(err.status == 400){
  //           console.log(err.statusText)
  //           //bad request
  //         }
  //         else if(err.status == 404){
  //           console.log(err.statusText)
  //           //404 not found
  //         }
  //         else if(err.status == 409){
  //           console.log(err.statusText)
  //           //409 Conflict
  //         }
  //         else {
  //           // console.log(err.status)
  //           reject(err.status);
  //         }
  //       }
  //     });
  //   });
  // }
  // borrarDetallePrep(id_DetallePrep: number): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     this.http.delete(this.urlDetallePrep + id_DetallePrep).subscribe({
  //       next: respuesta => {
  //         console.log(respuesta);
  //         resolve(respuesta);
  //       },
  //       error: err => {
  //         if (err.status == 500){
  //           console.log(err.statusText)
  //           //internal server error
  //         }
  //         else if(err.status == 400){
  //           console.log(err.statusText)
  //           //bad request
  //         }
  //         else if(err.status == 404){
  //           console.log(err.statusText)
  //           //404 not found
  //         }
  //         else if(err.status == 409){
  //           console.log(err.statusText)
  //           //409 Conflict
  //         }
  //         else {
  //           // console.log(err.status)
  //           reject(err.status);
  //         }
  //       }
  //     });
  //   });
  // }
  // borrarCategoria(id_cat: number): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     this.http.delete(this.urlCategorias + id_cat).subscribe({
  //       next: respuesta => {
  //         resolve(respuesta);
  //       },
  //       error: err => {
  //         if (err.status == 500){
  //           console.log('status: '+err.statusText)
  //           // console.log(Object.values(err))
  //           //internal server error
  //         }
  //         else if(err.status == 400){
  //           console.log(err.statusText)
  //           //bad request
  //         }
  //         else if(err.status == 404){
  //           console.log(err.statusText)
  //           //404 not found
  //         }
  //         else if(err.status == 409){
  //           console.log(err.statusText)
  //           //409 Conflict
  //         }
  //         else {
  //           // console.log(err.status)
  //           reject(err.status);
  //         }
  //       }
  //     });
  //   });
  // }


}
