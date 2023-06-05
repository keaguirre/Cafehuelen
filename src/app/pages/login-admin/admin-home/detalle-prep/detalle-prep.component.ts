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

  //API subir imagen a imgbb-----------------------------------------------------------------
async onImagenSelecta(event: any) {
  const imagen: FileList | null = event?.target?.files;
  if (imagen && imagen.length > 0) {
    this.imagenSelecta = imagen.item(0);
    this.convertToBase64(this.imagenSelecta);
    const imagenUrl = await this.imgService.uploadImage(this.imagenSelecta);

    if (this.formIngrediente.controls['imagen_ingre']) {
      this.formIngrediente.controls['imagen_ingre'].setValue(imagenUrl);
    }
    if (this.formPreparaciones.controls['imagen_prep']) {
      this.formPreparaciones.controls['imagen_prep'].setValue(imagenUrl);
    }
  }
}
convertToBase64(file: File) {
  const reader = new FileReader();
  reader.onloadstart = () => {
    this.base64Image = reader.result as string;
  };
  reader.readAsDataURL(file);
}
async uploadImage() {
  if (this.imagenSelecta) {
    const imagenUrl = await this.imgService.uploadImage(this.imagenSelecta);
    console.log('URL', imagenUrl);
    this.formIngrediente.controls['imagen_ingre'].setValue(imagenUrl);
    this.formPreparaciones.controls['imagen_prep'].setValue(imagenUrl);
  
  }
}
limpiarCampos(){
  this.formPreparaciones.get('imagen_prep')?.setValue('');
  this.formPreparaciones.get('imagen_prep')?.markAsPristine();
  this.formPreparaciones.get('imagen_prep')?.markAllAsTouched();
  this.formPreparaciones.get('imagen_prep')?.updateValueAndValidity();
  this.imagenInput.nativeElement.value=null;
}
//FIN API subir imagen a imgbb-------------------------------------------------------------------
 
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
  onCreate(cod: string,valor?:any): void{
    switch(cod) { 
      case 'createCat': { 
        try{
          let formCatValue = JSON.stringify(this.formCategorias.value);
          this.prodService.crearCategoria(formCatValue).then(respuesta => { this.response = respuesta;
            console.log('cat',respuesta);
            if(this.response.includes(this.formCategorias.value.nombre_cat)){
              console.log('cat',respuesta);
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
      case 'createPrep': { 
        try{
          this.formPreparaciones.controls['estado'].setValue(true)
          let formPrepValue = JSON.stringify(this.formPreparaciones.value);
          this.prodService.crearPreparaciones(formPrepValue).then(respuesta => {
            this.response = respuesta;
            this.tomarId = respuesta.id_prep;
            this.refrescar.next();
            if (this.formPreparaciones.value.nombre_prep === this.response.nombre_prep){
              this.refrescar.next();
              this.prodService.obtenerPreparacionDetalle(this.tomarId).then(respuesta =>{
                this.formDetallePrep.patchValue({
                id_prep : respuesta['nombre_prep'],
                })
              })
              // this.formDetallePrep.controls['id_prep'].setValue(tomarId)
              this.toastCheck.fire({icon: 'success',title: 'Preparación creada correctamente'})  
              this.mostrarFormDp=true;
              this.mostrarFormPrep=false;
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
      }
      case 'createDetallePrep': { 
        
        try{
          
          let obj = this.getObj();
          const id= uudidv4();
          this.formDetallePrep.controls['estado'].setValue(true);
          this.formDetallePrep.controls['id_prep'].setValue(this.tomarId);
          this.formDetallePrep.controls['id_detalle_prep'].setValue(id);
          obj[id] = { detallePrep: this.formDetallePrep.value,                 
            id_detalle_prep: id                
          };          
          sessionStorage.setItem('detallePrep',JSON.stringify(obj));
           this.refrescar.next;
           this.formDetallePrep.controls['id_prep'].setValue(this.tomarId)
                     this.prodService.obtenerPreparacionDetalle(this.tomarId).then(respuesta =>{
                       this.formDetallePrep.patchValue({
                       id_prep : respuesta['nombre_prep'],
                       });
                    });
            this.formDetallePrep.reset();
            this.refrescar.next;
            
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


// FUNCIONES PARA EL USO DEL SESSION STORAGE(ALMACENA OBJETOS DETALLE-PREP EN EL SSTOGARE PARA LUEGO ENVIARLOS AL BACKEND)
getObjItems(): any[] {
  let obj = this.getObj();   
  let items: any[] = [];  
   for (let detallePrep in obj) { 
       items.push(obj[detallePrep]);       
       }   
         return items;  } 

getObj(): any { 
 return JSON.parse(sessionStorage.getItem('detallePrep') || '{}'); 
}  

addObj(formDetallePrep: FormGroup,): void {
  console.log( 'formulario',formDetallePrep.value);      
  let obj = this.getObj();      
  let id = uudidv4();           
  obj[id] = { detallePrep: formDetallePrep.value,                 
   id_detalle_prep: id                
 };          
 sessionStorage.setItem('detallePrep',JSON.stringify(obj));
 this.refrescar.next();
 console.log('obj', obj);  }

clearSession(): void {
 sessionStorage.removeItem('detallePrep');
}

botonClearSession(): void {
 Swal.fire({
     icon: 'error',
     title: `¿Deseas eliminar todos los detalles agregados?`,
     showCancelButton: true,
     confirmButtonText: `Eliminar`,
     cancelButtonText: `Cancelar`,
     confirmButtonColor: '#2b8565',
 }).then((result) => {
     if (result.isConfirmed) {
         this.clearSession();
         Swal.fire({
             icon: 'success',
             title: `Detalles eliminados`,
             showConfirmButton: false,
             timer: 1125,
         });
     } else if (result.isDismissed) {
         Swal.fire({
             icon: 'info',
             title: `Detalles no eliminados`,
             showConfirmButton: false,
             timer: 1125,
         });
     }
 });
}

eliminarItem(formDepPrep: any) {
 let obj = this.getObj();
 let id = formDepPrep.id_detalle_prep;   
 delete obj[id];
 sessionStorage.setItem('detallePrep', JSON.stringify(obj));
}

botonEliminarItem(formDepPrep: any) {
console.log('OBJETO', formDepPrep)
 Swal.fire({
     icon: 'error',
     title: `¿Deseas eliminar este detalle?`,
     showCancelButton: true,
     confirmButtonText: `Eliminar`,
     cancelButtonText: `Cancelar`,
     confirmButtonColor: '#2b8565',
 }).then((result) => {
     if (result.isConfirmed) {
         this.eliminarItem(formDepPrep);
         Swal.fire({
             icon: 'success',
             title: `Detalle eliminado`,
             showConfirmButton: false,
             timer: 1125,
         });
     } else if (result.isDismissed) {
         Swal.fire({
             icon: 'info',
             title: `Error. Detalle no eliminado`,
             showConfirmButton: false,
             timer: 1125,
         });
     }
 });
}

sendDetallePrep(): void {
this.getObjItems().map((item: any) => {
   let id_prep = item.detallePrep.id_prep;
   let id_ingre = item.detallePrep.id_ingre;
   let cantidad_necesaria = item.detallePrep.cantidad_necesaria;
   let tipo_unidad = item.detallePrep.tipo_unidad;
   let estado = item.detallePrep.estado ;
   let detalleEnviar = {
       id_prep,
       id_ingre,
       cantidad_necesaria,
       tipo_unidad,
       estado,
   };
   sessionStorage.setItem('detalleEnviar', JSON.stringify(detalleEnviar));
    this.prodService.crearDetallePrep(detalleEnviar).then((res:any) => {
     this.response = res
     this.refrescar.next();
        if (typeof this.response.id_prep == 'number' && typeof this.response.id_ingre == 'number'){
         this.toastCheck.fire({icon: 'success',title: 'Ingrediente de receta creado correctamente'})  
         this.refrescar.next();
         this.formDetallePrep.reset();
         this.formDetallePrep.controls['id_prep'].setValue(this.tomarId)
                   this.prodService.obtenerPreparacionDetalle(this.tomarId).then(respuesta =>{
                     this.formDetallePrep.patchValue({
                     id_prep : respuesta['nombre_prep'],
                     })
                   })
         sessionStorage.removeItem('detallePrep');
         sessionStorage.removeItem('detalleEnviar')
       }else{
         this.toastError.fire({icon: 'error',title: 'Ha ocurrido un error al crear la preparacion. Inténtelo nuevamente más tarde.'})  
       }
         })
    .catch((err:any) => {
             this.toastError.fire({icon: 'error', title: err})
             this.formDetallePrep.reset();
           });
});
}
crearDetPrep(){
const dP =sessionStorage.getItem('detallePrep');
console.log('dp', dP)
if(dP){

dP.forEach((detallePrep:any)=>{
 const detallePrepJSON= JSON.stringify(detallePrep);
 console.log('respuesta',detallePrepJSON);
 this.prodService.crearDetallePrep(detallePrepJSON).then(
   
   (response:any)=>{
     console.log(response);
     console.log('respuesta',response);
   },
   (err:any)=>{
     console.log(err);
   }
 );
});
}
}
// FIN FUNCIONES PARA EL USO DEL SESSION STORAGE
}
