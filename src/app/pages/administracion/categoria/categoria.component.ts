import { Component, Renderer2, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductosService } from 'src/app/services/ProductosService/productos.service';
import Swal from 'sweetalert2';
import { Subject, Subscription } from 'rxjs';
import { ImgServiceService } from 'src/app/services/imgService/img-service.service';
@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent  {
  response!: any
  responseListadoCategorias: any = []
  responseListadoCategoriasDes: any = []
  private refrescar= new Subject<void>();
  idSeleccionado!: number;
  modalDelete: boolean = false;
  nombreCatBuscada!:any;
  responseUpdate!: any;
  tostadaText!: string;
  showToast!: boolean;
  suscripcion!:Subscription;
  isChecked:Boolean=false;
  pagesCat: number = 1;
  pagesCatDes: number = 1;
  totalItems:number=0;
  missingCategories: any[] = [];
  imagenSelecta: any | undefined;
  base64Image:any;
  formularioActivo: string = '';
  
  ngOnInit(): void {
    this.onList('listCat');
    this.onList('listCatDesh'); 
    this.suscripcion=this.refrescar.subscribe(()=>{
      this.onList('listCat');
      this.onList('listCatDesh');
    });
  }
  ngOnDestroy():void{
    this.suscripcion.unsubscribe();
  }
// ngOnChange();void{}; pasarle la funcion del checkbox 
  constructor(private prodService:ProductosService, private imgService:ImgServiceService,private renderer: Renderer2, private elementRef: ElementRef){}

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
//Fin funcion para pasar a minusculas---------------------------------------------------------
//FORMULARIOS-----------------------------------------------------------------------------------
  public formCategorias: FormGroup = new FormGroup({
    id_cat: new FormControl('',[Validators.required]),
    nombre_cat: new FormControl('',[Validators.required, Validators.minLength(3)]),
  });
  public formCategoriasEdit: FormGroup = new FormGroup({
    id_cat: new FormControl('',[Validators.required]),
    nombre_cat: new FormControl('',[Validators.required, Validators.minLength(3)]),
  });
//FIN FORMULARIOS---------------------------------------------------------------------------------
//DECLARACION DE TOASTS---------------------------------------------------------------------------
//TOAST OK----------------------------------------------------------------------------------------
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
//Fin TOAST OK------------------------------------------------------------------------------------
//TOAST ERROR-------------------------------------------------------------------------------------
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
//FIN DECLARACION TOASTS------------------------------------------------------------------------
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
            this.responseListadoCategorias = this.padTableData(respuesta);
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
  onCreate(cod: string): void{
    switch(cod) { 
      case 'createCat': { 
        try{
          let formCatValue = JSON.stringify(this.formCategorias.value);
          this.prodService.crearCategoria(formCatValue).then(respuesta => { this.response = respuesta;
            if(this.response.includes(this.formCategorias.value.nombre_cat)){
              this.toastCheck.fire({icon: 'success',title: 'categoria correctamente creada'})  
              this.refrescar.next();
              this.totalItems = this.responseListadoCategorias.length;
              this.formCategorias.reset();
            }else{
              this.toastError.fire({icon: 'error',title: 'Ha ocurrido un error al crear la categoría. Inténtelo nuevamente más tarde.'})  
              this.formCategorias.reset();
            }
            this.formCategorias.reset();
          })
          .catch(err => { //cachea el error de promise al crear una categoria
            this.toastError.fire({icon: 'error',title: err});
            this.formCategorias.reset();
          });
        }catch (e: any){
          console.log(e);
        }
      break; 
      } default: { 
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
            this.formCategorias.reset();
          }
          });
        }catch (e: any) {
        console.log(e);
        } 
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
//FIN ACTUALIZACIONES------------------------------------------------------------------------------------------
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
    default: {
      console.log('Error codigo: '+cod)
      this.toastError.fire({icon: 'error',title: 'Error desconocido, intente nuevamente más tarde. Inténtelo nuevamente más tarde.'})  
    break; 
    } 
  } 
}
//RELLENAR CAMPOS EDIT----------------------------------------------------------------------------------------------------------------------
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
      default:{
        console.log('Error codigo: '+cod)
        this.toastCheck.fire({icon: 'error',title: 'Error desconocido, intente nuevamente más tarde. Inténtelo nuevamente más tarde.'})  
      }
    }
  }  
}
 