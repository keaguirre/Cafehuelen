import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductosService } from 'src/app/services/ProductosService/productos.service';
import Swal from 'sweetalert2';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';


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
  responseListadoIngredPrep: any = [];
  idSeleccionado!: number;
  modalDelete: boolean = false;
  nombrePreparacion!: string;
  nombreCatBuscada!:any;
  responseUpdate!: any;
  tostadaText!: string;
  showToast!: boolean;
  

  ngOnInit(): void {
    this.onList('listCat');
    this.onList('listPrep');
    this.onList('listIngre');
    this.onList('listIngrePrep');
    
  }
  constructor(private prodService:ProductosService , private router: Router,){}

  

  
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
    descripcion_ingre: new FormControl('',[Validators.required]),
    stock_ingrediente: new FormControl('',[Validators.required]),
    cantidad_por_unidad_ingrediente: new FormControl('',[Validators.required, ]),
    tipo_unidad_ingrediente: new FormControl('',[Validators.required]),
    imagen_ingre: new FormControl('',[Validators.required])
  });

  public formPreparaciones: FormGroup = new FormGroup({
    id_prep: new FormControl('',[Validators.required]), 
    nombre_prep: new FormControl('',[Validators.required]), 
    descripcion_prep: new FormControl('',[Validators.required]),
    imagen_prep: new FormControl('',[Validators.required]),
    precio_prep: new FormControl('',[Validators.required]),
    id_cat_prep: new FormControl('',[Validators.required]),
  });

  public formIngredientePrep: FormGroup = new FormGroup({
    id_prep: new FormControl('',[Validators.required],),
    id_ingre: new FormControl('',[Validators.required]),
    cantidad_necesaria: new FormControl('',[Validators.required]),
    tipo_unidad: new FormControl('',[Validators.required]),
  });

  public formCategorias: FormGroup = new FormGroup({
    id_cat: new FormControl('',[Validators.required]),
    nombre_cat: new FormControl('',[Validators.required, Validators.minLength(3)]),
  });
//FIN FORMULARIOS---------------------------------------------------------------------------------

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
      case 'listIngrePrep': { 
        try{
          this.prodService.obtenerListadoIngrePrep().then(respuesta => {
            this.responseListadoIngredPrep = respuesta; //obj con listado ngFor
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

  onCreate(cod: string,): void{
    switch(cod) { 
      case 'createCat': { 
        try{
          let formCatValue = JSON.stringify(this.formCategorias.value);
          this.prodService.crearCategoria(formCatValue).then(respuesta => { this.response = respuesta;
            if(this.response.includes(this.formCategorias.value.nombre_cat)){
              this.toastCheck.fire({icon: 'success',title: this.response})  
            }else{
              this.toastError.fire({icon: 'error',title: 'Ha ocurrido un error al crear la categoría. Inténtelo nuevamente más tarde.'})  
            }
            this.formCategorias.reset();
          })
          .catch(err => { //cachea el error de crear una categoria
            this.toastError.fire({icon: 'error',title: err});  
          });
        }catch (e: any){
          console.log(e);
        }
      break; 
      } 
      case 'createIngre': { 
        try{
          let formIngreValue = JSON.stringify(this.formIngrediente.value);
          this.prodService.crearIngrediente(formIngreValue).then(respuesta => {
            this.response = respuesta;
            if (typeof this.response.id_ingre == 'number'){
              this.toastCheck.fire({icon: 'success',title: 'Ingrediente creado correctamente'})  
            }else{
              this.toastError.fire({icon: 'error',title: 'Ha ocurrido un error al crear el ingrediente. Inténtelo nuevamente más tarde.'})  
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
      case 'createIngrePrep': { 
        try{
          let formIngrePrepValue = JSON.stringify(this.formIngredientePrep.value);
          this.prodService.crearIngrePrep(formIngrePrepValue).then(respuesta => {
            this.response = respuesta;
            if (typeof this.response.id_prep == 'number' && typeof this.response.id_ingre == 'number'){
              this.toastCheck.fire({icon: 'success',title: 'Ingrediente de receta creado correctamente'})  
            }else{
              this.toastError.fire({icon: 'error',title: 'Ha ocurrido un error al crear la preparacion. Inténtelo nuevamente más tarde.'})  
            }
            this.formPreparaciones.reset();
          })
          .catch(err => {
            this.toastError.fire({icon: 'error', title: err})
          });
        }catch (e: any){
          console.log(e);
        }
      break;
      } 
      case 'createPrep': { 
        try{
          let formPrepValue = JSON.stringify(this.formPreparaciones.value);
          this.prodService.crearPreparaciones(formPrepValue).then(respuesta => {
            this.response = respuesta;
            if (this.formPreparaciones.value.nombre_prep === this.response.nombre_prep){
              this.toastCheck.fire({icon: 'success',title: 'Preparación creada correctamente'})  
            }else{
              this.toastError.fire({icon: 'error',title: 'Ha ocurrido un error al crear la preparación. Inténtelo nuevamente más tarde.'})  
            }
            this.formPreparaciones.reset();
          })
          .catch(err => {
            this.toastError.fire({icon: 'error', title: err})
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
              this.toastCheck.fire({
                icon: 'success',
                title: 'La categoria se actualizó correctamente.'
              })  
            }else{
              this.toastError.fire({icon: 'error',title: 'Ha ocurrido un error al actualizar la categoría. Inténtelo nuevamente más tarde.'})  
            }
            this.formCategorias.reset();
          });
        }catch (e: any){
          console.log(e);
        }
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
              this.toastCheck.fire({
                icon: 'success',
                title: 'El ingrediente se actualizó correctamente.'
              })  
            }else{
              this.toastError.fire({icon: 'error',title: 'Ha ocurrido un error al actualizar el ingrediente. Inténtelo nuevamente más tarde.'})  
            }
            this.formIngrediente.reset();
            
          });
        }catch (e: any){
          console.log(e);
        }
      break; 
      } 
      case 'editIngrePrep': { 
        try{
          this.idSeleccionado = id;
          this.formIngredientePrep.controls['id_prep'].setValue(this.idSeleccionado)
          let formIngrePrepValue = JSON.stringify(this.formIngredientePrep.value);
          console.log(formIngrePrepValue);
          this.prodService.actualizarIngrePrep(this.formIngredientePrep.value.id_cat, formIngrePrepValue).then(respuesta => {
            console.log(respuesta)
            this.response = respuesta
            if(this.formIngredientePrep.value.id_prep=== this.response.id_prep){
              this.toastCheck.fire({
                icon: 'success',
                title: this.response
              })  
            }else{
              this.toastError.fire({icon: 'error',title: 'Ha ocurrido un error al actualizar el ingrediente de receta. Inténtelo nuevamente más tarde.'})  
            }
            this.formIngredientePrep.reset();
          });
        }catch (e: any){
          console.log(e);
        }
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
              this.toastCheck.fire({
                icon: 'success',
                title: 'La preparación se actualizó correctamente.'
              })  
            }else{
              this.toastError.fire({icon: 'error',title: 'Ha ocurrido un error al actualizar la preparación. Inténtelo nuevamente más tarde.'})  
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
//Swall 
//fin SWALL
//ELIMINAR----------------------------------------------------------------------------------------

  onDelete(cod: string, id: number): void{
    switch(cod) { 
      case 'deleteCat': { 
        this.idSeleccionado = id;
        this.prodService.borrarCategoria(this.idSeleccionado).then(respuesta => {
          this.response = respuesta.message;
          console .log('response: '+this.response)
          if(this.response.includes('eliminada correctamente')){
            this.toastCheck.fire({
              icon: 'success',
              title: this.response
            })  
          }else{
            this.toastError.fire({icon: 'error',title: 'Ha ocurrido un error al eliminar la categoría. Inténtelo nuevamente más tarde.'})  
          }
        });
      break; 
      } 
      case 'deleteIngre': { 
        this.idSeleccionado = id;
        this.prodService.borrarIngrediente(this.idSeleccionado).then(respuesta => {
          console.log('k: '+Object.keys(respuesta))
          if(this.response.includes('eliminado correctamente')){
            this.toastCheck.fire({
              icon: 'success',
              title: this.response
            })  
          }else{
            this.toastError.fire({icon: 'error',title: 'Ha ocurrido un error al eliminar la categoría. Inténtelo nuevamente más tarde.'})  
          }
        });
      break; 
      } 
      case 'deleteIngrePrep': { 
        this.idSeleccionado = id;
        this.prodService.borrarIngrePrep(this.idSeleccionado).then(respuesta => {
          this.response = respuesta.message;
          if(this.response.contains('correctamente eliminado')){
            this.toastCheck.fire({
              icon: 'success',
              title: this.response
            })  
          }else{
            this.toastError.fire({icon: 'error',title: 'Ha ocurrido un error al eliminar el ingrediente de receta. Inténtelo nuevamente más tarde.'})  
          }
        });
      break; 
      }
      case 'deletePrep': { 
        this.idSeleccionado = id;
        this.prodService.borrarPreparacion(this.idSeleccionado).then(respuesta => {
          this.response = respuesta.message;
          if(this.response.includes('eliminada correctamente')){
            this.toastCheck.fire({
              icon: 'success',
              title: this.response
            })  
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
//FIN ELIMINAR----------------------------------------------------------------------------------------
//RELLENAR CAMPOS EDIT
rellenarFormulario(cod:string): void{
    switch(cod){
      case 'formCat':{
        this.prodService.obtenerCategoriaDetalle(this.idSeleccionado).then(respuesta =>{
          this.formCategorias.patchValue({
            id_cat: this.idSeleccionado,
            nombre_cat: respuesta['nombre_cat'],
          })
        })
        break
      }
      case 'formIngre':{
        this.prodService.obtenerIngredienteDetalle(this.idSeleccionado).then(respuesta =>{
          this.formIngrediente.patchValue({
            id_ingre: this.idSeleccionado,
            marca_ingre: respuesta['marca_ingre'],
            descripcion_ingre: respuesta['descripcion_ingre'],
            stock_ingrediente: respuesta['stock_ingre'],
            cantidad_por_unidad_ingrediente: respuesta['cantidad_por_unidad_ingrediente'],
            tipo_unidad_ingrediente: respuesta['tipo_unidad_ingrediente'],
            imagen_ingre: respuesta['imagen_ingre'],
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
          })
        })
        break
      }
      case 'formIngrePrep':{
        this.prodService.obtenerIngrePrepDetalle(this.idSeleccionado).then(respuesta =>{
          this.formIngredientePrep.patchValue({
            id_prep: this.idSeleccionado,
            id_ingre: respuesta['id_ingre'],
            cantidad_necesaria: respuesta['cantidad_necesaria'],
            tipo_unidad: respuesta['tipo_unidad'],
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