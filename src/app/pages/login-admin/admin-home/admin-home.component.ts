import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductosService } from 'src/app/services/ProductosService/productos.service';
import Swal from 'sweetalert2';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent {

  response!: any
  responseListadoCategorias: any = []
  responseListadoPreparacion: any = [];
  responseListadoIngrediente: any = [];
  responseListadoDetallePrep: any = [];
  idSeleccionado!: number;
  modalDelete: boolean = false;
  nombrePreparacion!: string;
  nombreCatBuscada!:any;
  responseUpdate!: any;
  tostadaText!: string;
  showToast!: boolean;
  suscripcion!:Subscription;
  

  ngOnInit(): void {
    this.onList('listCat');
    this.onList('listPrep');
    this.onList('listIngre');
    this.onList('listDetallePrep');
    // this.suscripcion=this.prodService.refresh$.subscribe(()=>{
    //   this.onList('listIngre');
    // });
    
  }
  constructor(private prodService:ProductosService , private router: Router,private fb:FormBuilder){}

  

  
  //Esta funcion le pasa el id a la variable para que en el update se la injecte al formulario edit para enviarlo
  public seleccionarId(id: number): void { 
    this.idSeleccionado = id;
  }

  numberOnlyValidation(event: any) {
    const pattern = /[0-9.,]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }  

  encontrarNombreCat(id:number): string{
    this.nombreCatBuscada = this.responseListadoCategorias.find((i:any) => i.id_cat === id);
      let nombreCat = this.nombreCatBuscada['nombre_cat']
    return nombreCat;
  }  

//FORMULARIOS---------------------------------------------------------------------------------
  public formIngrediente: FormGroup = new FormGroup({
    id_ingre: new FormControl('',[Validators.required]),
    marca_ingre: new FormControl('',[Validators.required]),
    nombre_ingre: new FormControl('',[Validators.required]),
    stock_ingrediente: new FormControl('',[Validators.required]),
    cantidad_por_unidad_ingrediente: new FormControl('',[Validators.required, ]),
    tipo_unidad_ingrediente: new FormControl('',[Validators.required]),
    imagen_ingre: new FormControl('',[Validators.required]),
    estado: new FormControl('',[Validators.required])
  });

  public formPreparaciones: FormGroup = new FormGroup({
    id_prep: new FormControl('',[Validators.required]), 
    nombre_prep: new FormControl('',[Validators.required]), 
    descripcion_prep: new FormControl('',[Validators.required]),
    imagen_prep: new FormControl('',[Validators.required]),
    id_cat_prep: new FormControl('',[Validators.required]),
    precio_prep: new FormControl('',[Validators.required]),
    estado: new FormControl('',[Validators.required]),
  });

  public formDetallePrep: FormGroup = new FormGroup({
    id_detalle_prep: new FormControl('',[Validators.required],),
    id_prep: new FormControl('',[Validators.required],),
    id_ingre: new FormControl('',[Validators.required]),
    cantidad_necesaria: new FormControl('',[Validators.required]),
    tipo_unidad: new FormControl('',[Validators.required]),
    estado: new FormControl('',[Validators.required]),
  });

  public formCategorias: FormGroup = new FormGroup({
    id_cat: new FormControl('',[Validators.required]),
    nombre_cat: new FormControl('',[Validators.required, Validators.minLength(3)]),
    estado: new FormControl('',[Validators.required]),
  });
  public formCategoriasEdit: FormGroup = new FormGroup({
    id_cat: new FormControl('',[Validators.required]),
    nombre_cat: new FormControl('',[Validators.required, Validators.minLength(3)]),
    estado: new FormControl('',[Validators.required]),
  });
//FIN FORMULARIOS---------------------------------------------------------------------------------
//SWALL AGREGAR-------------------------------------------------------------------------------
  sweetAlertCategoria(){
    const formCat=
    `<form [formGroup]="formCategorias" (ngSubmit)="onCreate('createCat')">
       <div class="">
        <div class="relative">
           <div class="form-control">
             <label class="input-group input-group-vertical w-full max-w-xl">
               <span>Nombre Categoria</span>
               <input minlength="3" formControlName="nombre_cat" type="text"
                 placeholder="Introduzca un nombre de categoria"
                 class="input input-bordered"/>
             </label>
             <button type="submit">Agregar</button>
           </div>
        </div>
       </div>
     </form>`;
    Swal.fire({
      color:'white',
      title:'Agregar Categoria',
      html:formCat,
      showCancelButton:true,
      showConfirmButton:true,
      confirmButtonText: 'Crear',
      confirmButtonColor:'#009678',
      cancelButtonColor:'#E11414',
      background:'#2b8565',
      showLoaderOnConfirm:true,
      preConfirm: () => {
       return new Promise((resolve) => {
          resolve(this.formCategorias.value);
       });
    }
    }).then((resultado) => {
      console.log(this.formCategorias.value)
      if (resultado.isConfirmed) {
      return (this.onCreate('createCat'))

      }
    });
  }

//FIN SWALL Agregar-------------------------------------------------------------------------------
//SWALL MODIFICAR---------------------------------------------------------------------------------
 sweetModificarCategoria(){
   const formCat=
   `<form [formGroup]="formCategoriasEdit"(ngSubmit)="onActualizar('editCat', this.idSeleccionado)">
   <div class="">
       <div class="relative">
           <div class="form-control">
             <label class="input-group input-group-vertical w-full max-w-xl">
                   <input minlength="3" formControlName="nombre_cat" type="text"
                       placeholder="Introduzca un nombre de categoria"
                       class="input input-bordered" [value]="this.formCategoriasEdit.value['nombre_cat']" />
               </label>
           </div>

       </div>
   </div>
 </form>`;
   Swal.fire({
     color:'white',
     title:'modificar Categoria',
     html:formCat,
     showCancelButton:true,
     showConfirmButton:true,
     confirmButtonText: 'Crear',
     confirmButtonColor:'#009678',
     cancelButtonColor:'#E11414',
     background:'#2b8565',
     showLoaderOnConfirm:true,
     preConfirm: () => {
      return new Promise((resolve) => {
         resolve(this.formCategorias.value);
      });
   }
   }).then((resultado) => {
     if (resultado.isConfirmed) {
     return (this.onActualizar('editCat', this.idSeleccionado));
     }
   });
 }
//FIN SWALL modificar-------------------------------------------------------------------------------
//DECLARACION DE TOASTS---------------------------------------------------------------------------
//TOAST OK
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


//LISTADOS----------------------------------------------------------------------------------------
  onList(cod: string): void{
    switch(cod) { 
      case 'listCat': { 
        try{  
          this.prodService.obtenerListadoCategoria().then(respuesta => {
            this.responseListadoCategorias = respuesta; //obj con listado ngFor
          });
        }catch (e: any){
            console.log(e);
        }
        break; 
      } 
      case 'listIngre': { 
        try{
          this.prodService.obtenerListadoIngrediente().then(respuesta => {
            this.responseListadoIngrediente = respuesta; //obj con listado ngFor
            this.responseListadoIngrediente = this.responseListadoIngrediente.sort()
          });
        }catch (e: any){
          console.log(e);
        }
      break; 
      } 
      case 'listDetallePrep': { 
        try{
          this.prodService.obtenerListadoDetallePrep().then(respuesta => {
            this.responseListadoDetallePrep = respuesta; //obj con listado ngFor
          });
        }catch (e: any){
          console.log(e);
        }
      break; 
      } 
      case 'listPrep': { 
        try{
          this.prodService.obtenerListadoPreparacion().then(respuesta => {
            this.responseListadoPreparacion = respuesta; //obj con listado ngFor
          });
        }catch (e: any){
          console.log(e);
        }
      break; 
      }default: { 
        console.log('Error codigo: '+cod)
      break; 
      } 
    } 
  }
//FIN LISTADOS----------------------------------------------------------------------------------------
//CREACIONES----------------------------------------------------------------------------------------

  onCreate(cod: string,valor?:any): void{
    switch(cod) { 
      case 'createCat': { 
        try{
          this.formCategorias.controls['estado'].setValue(true)
          let formCatValue = JSON.stringify(this.formCategorias.value);
          this.prodService.crearCategoria(formCatValue).then(respuesta => { this.response = respuesta;
            if(this.response.includes(this.formCategorias.value.nombre_cat)){
              this.toastCheck.fire({icon: 'success',title: this.response})  
              this.formCategorias.reset();
            }else{
              this.toastError.fire({icon: 'error',title: 'Ha ocurrido un error al crear la categoría. Inténtelo nuevamente más tarde.'})  
              this.formCategorias.reset();
            }
            this.formCategorias.reset();
          })
          .catch(err => { //cachea el error de crear una categoria
            this.toastError.fire({icon: 'error',title: err});
            this.formCategorias.reset();
          });
        }catch (e: any){
          console.log(e);
        }
      break; 
      } 
      case 'createIngre': {
        try{
          this.formIngrediente.controls['estado'].setValue(true)
          let formIngreValue = JSON.stringify(this.formIngrediente.value);
          this.prodService.crearIngrediente(formIngreValue).then(respuesta => {
            this.response = respuesta;
            if (typeof this.response.id_ingre == 'number'){
              this.toastCheck.fire({icon: 'success',title: 'Ingrediente creado correctamente'})  
              this.formIngrediente.reset();
            }else{
              this.toastError.fire({icon: 'error',title: 'Ha ocurrido un error al crear el ingrediente. Inténtelo nuevamente más tarde.'})  
              this.formIngrediente.reset();
            }
            this.formIngrediente.reset();
          })
          .catch(err => { //cachea el error de crear una categoria
            this.toastError.fire({icon: 'error',title: err});  
          });
        }catch (e: any){
          console.log(e);
        }
      break; 
      } 
      case 'createDetallePrep': { 
        try{
          this.formDetallePrep.controls['estado'].setValue(true)
          let formDetallePrepValue = JSON.stringify(this.formDetallePrep.value);
          this.prodService.crearDetallePrep(formDetallePrepValue).then(respuesta => {
            this.response = respuesta;
            if (typeof this.response.id_prep == 'number' && typeof this.response.id_ingre == 'number'){
              this.toastCheck.fire({icon: 'success',title: 'Ingrediente de receta creado correctamente'})  
              this.formDetallePrep.reset();
            }else{
              this.toastError.fire({icon: 'error',title: 'Ha ocurrido un error al crear la preparacion. Inténtelo nuevamente más tarde.'})  
              this.formDetallePrep.reset();
            }
            this.formDetallePrep.reset();
          })
          .catch(err => {
            this.toastError.fire({icon: 'error', title: err})
            this.formDetallePrep.reset();
          });
        }catch (e: any){
          console.log(e);
        }
      break;
      } 
      case 'createPrep': { 
        try{
          this.formPreparaciones.controls['estado'].setValue(true)
          let formPrepValue = JSON.stringify(this.formPreparaciones.value);
          this.prodService.crearPreparaciones(formPrepValue).then(respuesta => {
            this.response = respuesta;
            if (this.formPreparaciones.value.nombre_prep === this.response.nombre_prep){
              this.toastCheck.fire({icon: 'success',title: 'Preparación creada correctamente'})  
              this.formPreparaciones.reset();
            }else{
              this.toastError.fire({icon: 'error',title: 'Ha ocurrido un error al crear la preparación. Inténtelo nuevamente más tarde.'})  
              this.formPreparaciones.reset();
            }
            this.formPreparaciones.reset();
          })
          .catch(err => {
            this.toastError.fire({icon: 'error', title: err})
            this.formPreparaciones.reset();
          });
        }catch (e: any){console.log(e);}
      break; 
      }default: { 
        console.log('Error codigo: '+cod)
        this.toastCheck.fire({icon: 'error',title: 'Error desconocido, intente nuevamente más tarde. Inténtelo nuevamente más tarde.'})  
      break; 
      } 
    } 
  }
// FIN CREACIONES----------------------------------------------------------------------------------------
//ACTUALIZACIONES----------------------------------------------------------------------------------------
  onActualizar(cod: string, id: number): void{
    switch(cod) { 
      case 'editCat': { 
        try{
          this.idSeleccionado = id;
          this.formCategorias.controls['id_cat'].setValue(this.idSeleccionado)
          let formCatValue = JSON.stringify(this.formCategorias.value);
          this.rellenarFormulario('formCat');
          this.prodService.actualizarCategoria(this.formCategorias.value.id_cat, formCatValue).then(respuesta => {
            this.response = respuesta;
            if(this.formCategorias.value.id_cat === this.response.id_cat){
              this.toastCheck.fire({icon: 'success', title: 'La categoria se actualizó correctamente.'})  
              this.formCategorias.reset();
            }else{
              this.toastError.fire({icon: 'error',title: 'Ha ocurrido un error al actualizar la categoría. Inténtelo nuevamente más tarde.'})  
              this.formCategorias.reset();
            }
            this.formCategorias.reset();
          });
        }catch (e: any){console.log(e);}
      break; 
      } 
      case 'editIngre': { 
        try{
          this.idSeleccionado = id;
          this.formIngrediente.controls['id_ingre'].setValue(this.idSeleccionado)
          let formIngreValue = JSON.stringify(this.formIngrediente.value);
          this.prodService.actualizarIngrediente(this.formIngrediente.value.id_ingre, formIngreValue).then(respuesta => {
            this.response = respuesta;
            if(this.formIngrediente.value.id_ingre === this.response.id_ingre){
              this.toastCheck.fire({ icon: 'success', title: 'El ingrediente se actualizó correctamente.'})  
              this.formIngrediente.reset();
            }else{
              this.toastError.fire({icon: 'error',title: 'Ha ocurrido un error al actualizar el ingrediente. Inténtelo nuevamente más tarde.'})  
              this.formIngrediente.reset();
            }
            this.formIngrediente.reset();
            
          });
        }catch (e: any){console.log(e);}
      break; 
      }
      case 'editDetallePrep': { 
        try{
          this.idSeleccionado = id;
          this.formDetallePrep.controls['id_detalle_prep'].setValue(this.idSeleccionado)
          let formDetallePrepValue = JSON.stringify(this.formDetallePrep.value);
          console.log(formDetallePrepValue);
          this.prodService.actualizarDetallePrep(this.formDetallePrep.value.id_detalle_prep, formDetallePrepValue).then(respuesta => {
            console.log('val: '+Object.keys(respuesta))
            this.response = respuesta
            if(this.formDetallePrep.value.id_detalle_prep === this.response.id_detalle_prep){
              this.toastCheck.fire({ icon: 'success', title: 'El detalle de preparación se actualizó correctamente.'})  
              this.formDetallePrep.reset();
            }else{
              this.toastError.fire({icon: 'error',title: 'Ha ocurrido un error al actualizar el ingrediente de receta. Inténtelo nuevamente más tarde.'})  
              this.formDetallePrep.reset();
            }
            this.formDetallePrep.reset();
          });
        }catch (e: any){console.log(e);}
      break; 
      } 
      case 'editPrep': { 
        try{
          this.idSeleccionado = id;
          this.formPreparaciones.controls['id_prep'].setValue(this.idSeleccionado)
          let formPrepValue = JSON.stringify(this.formPreparaciones.value);
          this.prodService.actualizarPreparacion(this.formPreparaciones.value.id_prep, formPrepValue).then(respuesta => {
            this.response = respuesta;
            if(this.formPreparaciones.value.id_prep == this.response.id_prep){
              this.toastCheck.fire({icon: 'success', title: 'La preparación se actualizó correctamente.'})  
              this.formPreparaciones.reset();
            }else{
              this.toastError.fire({icon: 'error',title: 'Ha ocurrido un error al actualizar la preparación. Inténtelo nuevamente más tarde.'})  
              this.formPreparaciones.reset();
            }
            this.formPreparaciones.reset();
          });
        }catch (e: any){
          console.log(e);
        }
      break; 
      }default: { 
        console.log('Error codigo: '+cod)
        this.toastCheck.fire({icon: 'error',title: 'Error desconocido, intente nuevamente más tarde. Inténtelo nuevamente más tarde.'})  
      break; 
      } 
    } 
  }
//FIN ACTUALIZACIONES----------------------------------------------------------------------------------------
//ELIMINAR DESHABILITAR----------------------------------------------------------------------------------------
onDelete(cod: string, id: number): void{
  switch(cod) { 
    case 'deleteCat': {  
      this.idSeleccionado = id;
      this.prodService.disableCategoria(this.idSeleccionado).then(respuesta => {
        this.response = respuesta
        if(this.idSeleccionado == this.response.id_cat){
          this.toastCheck.fire({ icon: 'success', title: 'Categoria eliminada correctamente.'})
        }else{
          this.toastError.fire({ icon: 'error',title: 'Ha ocurrido un error al eliminar la categoría. Inténtelo nuevamente más tarde.'})  
        }
      });
    break; 
    } 
    case 'deleteIngre': { 
      this.idSeleccionado = id;
      this.prodService.disableIngrediente(this.idSeleccionado).then(respuesta => {
        this.response = respuesta;
        if(this.idSeleccionado == this.response.id_ingre){
          this.toastCheck.fire({icon: 'success', title: 'Ingrediente eliminado correctamente'})  
        }else{
          this.toastError.fire({icon: 'error',title: 'Ha ocurrido un error al eliminar la categoría. Inténtelo nuevamente más tarde.'})  
        }
      });
    break; 
    } 
    case 'deleteDetallePrep': { 
      this.idSeleccionado = id;
      this.prodService.disableDetallePrep(this.idSeleccionado).then(respuesta => {
        this.response = respuesta;
        if(this.idSeleccionado == this.response.id_detalle_prep){
          this.toastCheck.fire({icon: 'success', title: 'Detalle de preparación eliminado correctamente.'})  
        }else{
          this.toastError.fire({icon: 'error',title: 'Ha ocurrido un error al eliminar el ingrediente de receta. Inténtelo nuevamente más tarde.'})  
        }
      });
    break;
    }
    case 'deletePrep': { 
      this.idSeleccionado = id;
      this.prodService.disablePreparacion(this.idSeleccionado).then(respuesta => {
        this.response = respuesta;
        if(this.idSeleccionado == this.response.id_prep){
          this.toastCheck.fire({ icon: 'success', title: 'Preparación eliminada correctamente.' })  
        }else{
          this.toastError.fire({icon: 'error',title: 'Ha ocurrido un error al eliminar la preparación. Inténtelo nuevamente más tarde.'})  
        }
      });
    break;
    }default: {
      console.log('Error codigo: '+cod)
      this.toastError.fire({icon: 'error',title: 'Error desconocido, intente nuevamente más tarde. Inténtelo nuevamente más tarde.'})  
    break; 
    } 
  } 
}
//ELIMINAR ----------------------------------------------------------------------------------------

  // onDelete(cod: string, id: number): void{
  //   switch(cod) { 
  //     case 'deleteCat': {  
  //       this.idSeleccionado = id;
  //       this.prodService.borrarCategoria(this.idSeleccionado).then(respuesta => {
  //         this.response = respuesta.message;
  //         console .log('response: '+this.response)
  //         if(this.response.includes('eliminada correctamente')){
  //           this.toastCheck.fire({
  //             icon: 'success',
  //             title: this.response
  //           })  
  //         }else{
  //           this.toastError.fire({icon: 'error',title: 'Ha ocurrido un error al eliminar la categoría. Inténtelo nuevamente más tarde.'})  
  //         }
  //       });
  //     break; 
  //     } 
  //     case 'deleteIngre': { 
  //       this.idSeleccionado = id;
  //       this.prodService.borrarIngrediente(this.idSeleccionado).then(respuesta => {
  //         console.log('k: '+Object.keys(respuesta))
  //         if(this.response.includes('eliminado correctamente')){
  //           this.toastCheck.fire({
  //             icon: 'success',
  //             title: this.response
  //           })  
  //         }else{
  //           this.toastError.fire({icon: 'error',title: 'Ha ocurrido un error al eliminar la categoría. Inténtelo nuevamente más tarde.'})  
  //         }
  //       });
  //     break; 
  //     } 
  //     case 'deleteDetallePrep': { 
  //       this.idSeleccionado = id;
  //       this.prodService.borrarDetallePrep(this.idSeleccionado).then(respuesta => {
  //         this.response = respuesta.message;
  //         if(this.response.contains('correctamente eliminado')){
  //           this.toastCheck.fire({
  //             icon: 'success',
  //             title: this.response
  //           })  
  //         }else{
  //           this.toastError.fire({icon: 'error',title: 'Ha ocurrido un error al eliminar el ingrediente de receta. Inténtelo nuevamente más tarde.'})  
  //         }
  //       });
  //     break; 
  //     }
  //     case 'deletePrep': { 
  //       this.idSeleccionado = id;
  //       this.prodService.borrarPreparacion(this.idSeleccionado).then(respuesta => {
  //         this.response = respuesta.message;
  //         if(this.response.includes('eliminada correctamente')){
  //           this.toastCheck.fire({
  //             icon: 'success',
  //             title: this.response
  //           })  
  //         }else{
  //           this.toastError.fire({icon: 'error',title: 'Ha ocurrido un error al eliminar la preparación. Inténtelo nuevamente más tarde.'})  
  //         }
  //       });
  //     break; 
  //     }default: { 
  //       console.log('Error codigo: '+cod)
  //       this.toastError.fire({icon: 'error',title: 'Error desconocido, intente nuevamente más tarde. Inténtelo nuevamente más tarde.'})  
  //     break; 
  //     } 
  //   } 
  // }
//FIN ELIMINAR----------------------------------------------------------------------------------------
//RELLENAR CAMPOS EDIT
rellenarFormulario(cod:string): void{
    switch(cod){
      case 'formCat':{
        this.prodService.obtenerCategoriaDetalle(this.idSeleccionado).then(respuesta =>{
          this.formCategorias.patchValue({
            id_cat: this.idSeleccionado,
            nombre_cat: respuesta['nombre_cat'],
            estado: respuesta['estado']
          })
        })
        break
      }
      case 'formIngre':{
        this.prodService.obtenerIngredienteDetalle(this.idSeleccionado).then(respuesta =>{
          this.formIngrediente.patchValue({
            id_ingre: this.idSeleccionado,
            marca_ingre: respuesta['marca_ingre'],
            nombre_ingre: respuesta['nombre_ingre'],
            stock_ingrediente: respuesta['stock_ingre'],
            cantidad_por_unidad_ingrediente: respuesta['cantidad_por_unidad_ingrediente'],
            tipo_unidad_ingrediente: respuesta['tipo_unidad_ingrediente'],
            imagen_ingre: respuesta['imagen_ingre'],
            estado: respuesta['estado']
          })
        })
        break
      }
      case 'formPreparaciones': {
        this.prodService.obtenerPreparacionDetalle(this.idSeleccionado).then(respuesta =>{
          this.formPreparaciones.patchValue({
            id_prep: this.idSeleccionado,
            nombre_prep: respuesta['nombre_prep'],
            descripcion_prep: respuesta['descripcion_prep'],
            imagen_prep: respuesta['imagen_prep'],
            precio_prep: respuesta['precio_prep'],
            id_cat_prep: respuesta['id_cat_prep'],
            estado: respuesta['estado']
          })
        })
        break
      }
      case 'formDetallePrep':{
        this.prodService.obtenerDetallePrepDetalle(this.idSeleccionado).then(respuesta =>{
          this.formDetallePrep.patchValue({
            id_detalle_prep: this.idSeleccionado,
            id_prep: respuesta['id_prep'],
            id_ingre: respuesta['id_ingre'],
            cantidad_necesaria: respuesta['cantidad_necesaria'],
            tipo_unidad: respuesta['tipo_unidad'],
            estado: respuesta['estado']
          })
        })
        break
      }default:{
        console.log('Error codigo: '+cod)
        this.toastCheck.fire({icon: 'error',title: 'Error desconocido, intente nuevamente más tarde. Inténtelo nuevamente más tarde.'})  
      }
    }
  }  
}