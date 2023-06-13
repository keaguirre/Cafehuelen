import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductosService } from 'src/app/services/ProductosService/productos.service';
import Swal from 'sweetalert2';
import { Subject, Subscription } from 'rxjs';
import { tap,switchMap,map, startWith} from 'rxjs/operators';
import { ImgServiceService } from 'src/app/services/imgService/img-service.service';
@Component({
  selector: 'app-ingredientes',
  templateUrl: './ingredientes.component.html',
  styleUrls: ['./ingredientes.component.css']
})
export class IngredientesComponent {
  response!: any
  responseListadoIngrediente: any = [];
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
  pagesIngre: number = 1;
  totalItems:number=0;
  missingCategories: any[] = [];
  imagenSelecta: any | undefined;
  base64Image:any;
  formularioActivo: string ='';
  ngOnInit(): void {
    this.onList('listIngre');
    this.suscripcion=this.refrescar.subscribe(()=>{
      this.onList('listIngre');
    });
  }
  ngOnDestroy():void{
    this.suscripcion.unsubscribe();
  }

  constructor(private prodService:ProductosService, private imgService:ImgServiceService){}

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
    nombre_ingre: new FormControl('',[Validators.required]),
    stock_ingrediente: new FormControl('',[Validators.required]),
    tipo_unidad_ingrediente: new FormControl('',[Validators.required]),
    tamano_envase: new FormControl(''),
    cantidad_envase: new FormControl(''),
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
      case 'listIngre': { 
        try{
          this.prodService.obtenerListadoIngrediente().then(respuesta => {
            this.responseListadoIngrediente = respuesta; //obj con listado ngFor
            this.responseListadoIngrediente = this.responseListadoIngrediente.sort()
            this.totalItems  = respuesta.length;
            this.responseListadoIngrediente = this.padTableData(respuesta);
            
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
      
      case 'createIngre': {
        try{
          let formIngreValue = JSON.stringify(this.formIngrediente.value);
          this.prodService.crearIngrediente(formIngreValue).then(respuesta => {
            this.response = respuesta;
            if (typeof this.response.id_ingre =='number'){
              this.toastCheck.fire({icon: 'success',title: 'Ingrediente creado correctamente'})  
              this.refrescar.next();
              this.formIngrediente.reset();
            }else{
              this.toastError.fire({icon:'error',title: 'Ha ocurrido un error al crear el ingrediente. Inténtelo nuevamente más tarde.'})  
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
      default: { 
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
      case 'formIngre':{
        this.prodService.obtenerIngredienteDetalle(this.idSeleccionado).then(respuesta =>{
          this.formIngrediente.patchValue({
            id_ingre: this.idSeleccionado,
            nombre_ingre: respuesta['nombre_ingre'],
            stock_ingrediente: respuesta['stock_ingrediente'],
            tipo_unidad_ingrediente: respuesta['tipo_unidad_ingrediente'],
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
//Agregar Stock
  agregarStock(id:number){
    this.idSeleccionado= id;
     const tamanoEnvase = this.formIngrediente.get('tamano_envase')!.value;
     const cantidadEnvase = this.formIngrediente.get('cantidad_envase')!.value;
    const stockIngre= tamanoEnvase * cantidadEnvase;

    this.formIngrediente.patchValue({stock_ingrediente:stockIngre});
    
    this.prodService.agregarStockIngre(this.idSeleccionado, this.formIngrediente.value).then(respuesta =>{
      this.response= respuesta;
      if(this.formIngrediente.value.id_ingre === this.response.id_ingre){
        this.toastCheck.fire({ icon: 'success', title: 'Stock actualizado correctamente.'})  
        this.refrescar.next(); 
        this.formIngrediente.reset();
      }else{
        this.toastError.fire({icon: 'error',title: 'Ha ocurrido un error al ingresar el stock. Inténtelo nuevamente más tarde.'})  
        this.formIngrediente.reset();
      }
      this.formIngrediente.reset();
    })
  }
//Fin Agregar Stock

}
