import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductosService } from 'src/app/services/ProductosService/productos.service';
import Swal from 'sweetalert2';
import { Subject, Subscription } from 'rxjs';
import { tap,switchMap,map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent {
  response!: any
  responseListadoCategorias: any = []
  responseListadoCategoriasDes: any = []
  responseListadoPreparacion: any = [];
  responseListadoIngrediente: any = [];
  responseListadoDetallePrep: any = [];
  private refrescar= new Subject<void>();
  idSeleccionado!: number;
  modalDelete: boolean = false;
  nombrePreparacion!: string;
  nombreCatBuscada!:any;
  responseUpdate!: any;
  tostadaText!: string;
  showToast!: boolean;
  suscripcion!:Subscription;
  isChecked:Boolean=false;
  pages: number = 1;
  pageSize:number= 5;
  totalItems:number=0;
  
  ngOnInit(): void {
    this.onList('listCat');
    this.onList('listPrep');
    this.onList('listIngre');
    this.onList('listCatDesh'); 
    this.onList('listDetallePrep'); 
    this.suscripcion=this.refrescar.subscribe(()=>{
      this.onList('listCat');
      this.onList('listPrep');
      this.onList('listIngre');
      this.onList('listDetallePrep');
      this.onList('listCatDesh');
      
    
    });
  }
  ngOnDestroy():void{
    this.suscripcion.unsubscribe();
  
  }
  // ngOnChange();void{}; pasarle la funcion del checkbox 
  constructor(private prodService:ProductosService){}

  // getDesactivadosTabla(): any[] {
  //   return this.responseListadoPreparacion.filter(this.responseListadoPreparacion => preparacion.estado === false);
  // }
 
  //Esta funcion le pasa el id a la variable para que en el update se la injecte al formulario edit para enviarlo
  public seleccionarId(id: number): void { 
    this.idSeleccionado = id;
  }
//Validaciones------------------------------------------------------------------------------
  numberOnlyValidation(event: any) {
    const pattern = /[0-9.,]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }  
​//Fin Validaciones--------------------------------------------------------------------------
//Encontrar el nombre de la categoria-------------------------------------------------------
  encontrarNombreCat(id:number): string{
    this.nombreCatBuscada = this.responseListadoCategorias.find((i:any) => i.id_cat === id);
      let nombreCat = this.nombreCatBuscada['nombre_cat']
    return nombreCat;
  }  
//Fin encontrar el nombre de la categoria---------------------------------------------------
  //toggle-tabla cat deshabilitadas---------------------------------------------------------
  toggleChecked() {this.isChecked = !this.isChecked;}
 // Fin toggle-tabla cat deshabilitadas-----------------------------------------------------
 //Funcion para pasar a minusculas los parametros dentro del input--------------------------
  passToLower(formulario: FormGroup, inputName: string) {
    const prevText = formulario.get(inputName)!;
    const actualText = prevText.value;
    prevText.setValue(actualText.toLowerCase());
  }
  //Fin funcion para pasar a minusculas-----------------------------------------------------
//Funciones para paginacion-----------------------------------------------------------------
 
 obtenerPageItemsCat(): any[] {
  const startIndex = (this.pages - 1) * this.pageSize;
  const endIndex = startIndex + this.pageSize;
  return this.responseListadoCategorias.slice(startIndex, endIndex);
  
}
// obtenerPageItemsIngre(cod:string):any[]{
//   const inicioIndex = (this.pages[cod]-1)*this.pageSize;
//   const finalIndex = inicioIndex + this.pageSize;
//   return this.responseListadoIngrediente.slice(inicioIndex,finalIndex);
// }
// obtenerPageItemsPrep(cod:string):any[]{
//   const inicioIndex = (this.pages[cod]-1)*this.pageSize;
//   const finalIndex = inicioIndex + this.pageSize;
//   return this.responseListadoPreparacion.slice(inicioIndex,finalIndex);
// }
// obtenerPageItemsDetPrep(cod:string):any[]{
//   const inicioIndex = (this.pages[cod]-1)*this.pageSize;
//   const finalIndex = inicioIndex + this.pageSize;
//   return this.responseListadoDetallePrep.slice(inicioIndex,finalIndex);
// }
 paginaAnterior():void{
   if (this.pages>1){
     this.pages--;
     
   }
 }
 siguientePag():void{
   const totalPages = this.totalPag();
    if(this.pages<totalPages){
      this.pages++;
      
    }
 }
 totalPag():number{
  const totalItems = this.totalItems;
  const pageSize = this.pageSize;
     return Math.ceil(totalItems/pageSize);
     
   }
//Fin funciones para paginacion-----------------------------------------------------------------
//FORMULARIOS-----------------------------------------------------------------------------------
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
            this.totalItems = this.responseListadoCategorias.length;
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
            this.totalItems  = respuesta.length;
            
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
      }
      case 'listCatDesh': { 
        try{
          this.prodService.obtenerListadoCategoriaDesahabilitadas().then(respuesta => {
            this.responseListadoCategoriasDes = respuesta; //obj con listado ngFor
            
            
          });
        }catch (e: any){
          console.log(e);
        }
      break; 
      }
      default: { 
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
              this.refrescar.next();
              this.totalItems = this.responseListadoCategorias.length;
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
              this.refrescar.next();
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
              this.refrescar.next();
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
              this.refrescar.next();
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
              this.refrescar.next();  
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
              this.refrescar.next(); 
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
              this.refrescar.next();
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
              this.refrescar.next();
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
      }
      case 'editCatDesh': {
      try {
        this.idSeleccionado = id;
        let formCatValue = JSON.stringify({"id_cat":this.idSeleccionado,"estado":true});
        this.prodService.actualizarCategoriaDesh(this.idSeleccionado, formCatValue).then(respuesta => {
            this.response= respuesta;
          if(this.idSeleccionado == this.response.id_cat){
            this.toastCheck.fire({icon: 'success', title: 'El cambio de estado se realizó exitosamente.'})  
              this.refrescar.next();
              this.toggleChecked();
          }else{
            this.toastError.fire({icon: 'error',title: 'Ha ocurrido un error al cambiar el estado. Inténtelo nuevamente más tarde.'})  
            this.formPreparaciones.reset();
          }
          });
        }catch (e: any) {
        console.log(e);
        } 
      break;
        // case 'editCatDesh': {
        // try {
        //   this.idSeleccionado = id;
        //   console.log('val: ',this.formCategorias)
        //   let formCatValue = JSON.stringify({"id_cat":this.idSeleccionado,"estado":true});
        //   console.log('json: ', formCatValue)
        //   this.prodService.actualizarCategoriaDesh(this.idSeleccionado, formCatValue)
        //     .then(respuesta => {
        //       console.log('Categoría deshabilitada actualizada:', respuesta);
        //     })
        //     .catch(error => {
        //       console.error('Error al actualizar la categoría deshabilitada:', error);
        //     });
        //   }catch (e: any) {
        //   console.log(e);
        //   }
        // break;
      
      }
      default: { 
        console.log('Error codigo: '+cod)
        this.toastCheck.fire({icon: 'error',title: 'Error desconocido, intente nuevamente más tarde. Inténtelo nuevamente más tarde.'})  
      break; 
      } 
    } 
  }
  actualizarCategoriaDesh(id_cat: any, catObj: any): Promise<any> {
    return this.prodService.actualizarCategoriaDesh(id_cat, catObj);
  }
//FIN ACTUALIZACIONES----------------------------------------------------------------------------------------
//ELIMINAR DESHABILITAR----------------------------------------------------------------------------------------
onDelete(cod: string, id: number): void{
  switch(cod) { 
    case 'deleteCat': {  
      this.idSeleccionado = id;
      this.prodService.disableCategoria(this.idSeleccionado).then(respuesta => {
        this.response = respuesta;
        if(this.idSeleccionado == this.response.id_cat){
          this.toastCheck.fire({ icon: 'success', title: 'Categoria eliminada correctamente.'})
          this.refrescar.next();
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
          this.toastCheck.fire({icon: 'success', title: 'Ingrediente deshabilitado correctamente'}) 
          this.refrescar.next(); 
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
          this.toastCheck.fire({icon: 'success', title: 'Detalle de preparación deshabilitado correctamente.'})
          this.refrescar.next();  
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
          this.toastCheck.fire({ icon: 'success', title: 'Preparación deshabilitada correctamente.' }) 
          this.refrescar.next(); 
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