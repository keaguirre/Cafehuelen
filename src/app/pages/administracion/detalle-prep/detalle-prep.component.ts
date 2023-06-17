import { Component,ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule, FormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { ProductosService } from 'src/app/services/ProductosService/productos.service';
import Swal from 'sweetalert2';
import { Subject, Subscription, Observable} from 'rxjs';
import { tap,switchMap,map, startWith} from 'rxjs/operators';
declare var sessionStorage:any;
import {v4 as uudidv4} from 'uuid';
import { ImgServiceService } from 'src/app/services/imgService/img-service.service';


@Component({
  selector: 'app-detalle-prep',
  templateUrl: './detalle-prep.component.html',
  styleUrls: ['./detalle-prep.component.css']
})
export class DetallePrepComponent {
  @ViewChild('imagenInput') imagenInput: any;
  response!: any
  responseListadoCategorias: any = []
  responseListadoCategoriasDes: any = []
  responseListadoPreparacionesDes: any = []
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
  pagesCat: number = 1;
  pagesIngre: number = 1;
  pagesPrep: number = 1;
  pagesDetallePrep: number = 1;
  pagesPrepDes: number = 1;
  pagesCatDes: number = 1;
  totalItems:number=0;
  imagenSelecta: any | undefined;
  base64Image:any;
  tomarId: any;
  
  mostrarFormDp:boolean=false;
  mostrarFormPrep:boolean=true;
  idPrepCreada:number|undefined;
  
  ngOnInit(): void {
    this.onList('listCat');
    this.onList('listPrep');
    this.onList('listIngre');
    this.onList('listCatDesh'); 
    this.onList('listDetallePrep'); 
    this.onList('listPrepDesh');
    this.suscripcion=this.refrescar.subscribe(()=>{
      this.onList('listCat');
      this.onList('listPrep');
      this.onList('listIngre');
      this.onList('listDetallePrep');
      this.onList('listCatDesh');
      this.onList('listPrepDesh');
      
    
    });
  }
  ngOnDestroy():void{
    this.suscripcion.unsubscribe();
  
  }
  // ngOnChange();void{}; pasarle la funcion del checkbox 
  constructor(private prodService:ProductosService, private imgService:ImgServiceService){
    window.addEventListener('beforeunload',()=>{
      sessionStorage.removeItem('detallePrep');
    });
  }

 
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

//FORMULARIOS-----------------------------------------------------------------------------------

  public formDetallePrep: FormGroup = new FormGroup({
    id_detalle_prep: new FormControl('',[Validators.required],),
    id_prep: new FormControl('',[Validators.required],),
    id_ingre: new FormControl('',[Validators.required]),
    cantidad_necesaria: new FormControl('',[Validators.required]),
    tipo_unidad: new FormControl('',[Validators.required]),
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
//FIN DECLARACION TOASTSs
//rellenar las tablas con lineas vacias---------------------------------------------------------
padTableData(data: any[]) {
  const remainingItems = 5 - (data.length % 5);
  if (remainingItems !== 5) {
    for (let i = 0; i < remainingItems; i++) {
      data.push({ id_cat: null, nombre_cat: null }); // Agrega objetos vacíos a la lista
    }
  }
  return data;
}
//FIN rellenar las tablas con lineas vacias-------------------------------------------------------
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
            this.responseListadoDetallePrep=this.padTableData(respuesta);
            
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
      case 'listPrepDesh': { 
        try{
          this.prodService.obtenerListadoPreparacionesDesahabilitadas().then(respuesta => {
            this.responseListadoPreparacionesDes = respuesta; //obj con listado ngFor
            
            
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
onCreate(cod: string): void {
  switch (cod) {
    case 'createDetallePrep': {
      try {
        this.formDetallePrep.controls['estado'].setValue(true);
        let formDetallePrepValue = JSON.stringify(this.formDetallePrep.value);
        console.log('form', formDetallePrepValue);
        this.prodService.crearDetallePrep(formDetallePrepValue).then(respuesta => {
          this.response = respuesta;
          console.log('respuesta', respuesta);
          if (typeof this.response.id_prep == 'number' && typeof this.response.id_ingre == 'number') {
            this.toastCheck.fire({ icon: 'success', title: 'Ingrediente de receta creado correctamente' })
            this.formDetallePrep.reset();
            this.refrescar.next();
          } else {
            this.toastError.fire({ icon: 'error', title: 'Ha ocurrido un error al crear la preparacion. IntÃ©ntelo nuevamente mÃ¡s tarde.' })
          }
        })
          .catch(err => {
            this.toastError.fire({ icon: 'error', title: err })
          });
      } catch (e: any) {
        console.log(e);
      }
      break;
    } default: {
      console.log('Error codigo: ' + cod)
      this.toastCheck.fire({ icon: 'error', title: 'Error desconocido, intente nuevamente mÃ¡s tarde. IntÃ©ntelo nuevamente mÃ¡s tarde.' })
      break;
    }
  }
}
  // onCreate(cod: string): void{
  //   switch(cod) { 
  //     case 'createDetallePrep': { 
  //       try{
  //         let formDetallePrepValue = JSON.stringify(this.formDetallePrep.value);
  //         console.log('form: ',formDetallePrepValue);
  //         this.prodService.crearDetallePrep(formDetallePrepValue).then(respuesta => { this.response = respuesta;
  //           console.log('detalle prep',respuesta);
  //           if (typeof this.response.id_prep == 'number' && typeof this.response.id_ingre == 'number'){
  //             this.toastCheck.fire({icon: 'success',title: 'Ingrediente de receta creado correctamente'})  
  //             this.formDetallePrep.reset();
  //             this.refrescar.next();
  //           }else{
  //             this.toastError.fire({icon: 'error',title: 'Ha ocurrido un error al crear la preparacion. Inténtelo nuevamente más tarde.'})  
              
  //           }

  //         })
  //         .catch(err => {
  //           this.toastError.fire({icon: 'error', title: err})
            
  //         });
  //       }catch (e: any){
  //         console.log(e);
  //       }
  //     break;
  //     }  default: { 
  //       console.log('Error codigo: '+cod)
  //       this.toastCheck.fire({icon: 'error',title: 'Error desconocido, intente nuevamente más tarde. Inténtelo nuevamente más tarde.'})  
  //     break; 
  //     } 
  //   } 
  // }
// FIN CREACIONES----------------------------------------------------------------------------------------



//ACTUALIZACIONES----------------------------------------------------------------------------------------
onActualizar(cod: string, id: number): void{
  switch(cod) { 
    
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
  default: {
    console.log('Error codigo: '+cod)
    this.toastError.fire({icon: 'error',title: 'Error desconocido, intente nuevamente más tarde. Inténtelo nuevamente más tarde.'})  
  break; 
  } 
} 
}
//RELLENAR CAMPOS EDIT
rellenarFormulario(cod:string): void{
  switch(cod){
    case 'formDetallePrep':{
      this.prodService.obtenerDetallePrepDetalle(this.idSeleccionado).then(respuesta =>{
        this.formDetallePrep.patchValue({
          id_detalle_prep: this.idSeleccionado,
          id_prep: respuesta['id_prep'],
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
