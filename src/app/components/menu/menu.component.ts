import { Component, OnInit } from '@angular/core';
import { CarritoService } from 'src/app/services/carritoService/carrito.service';
import Swal from 'sweetalert2';
import { ProductosService } from 'src/app/services/ProductosService/productos.service';
import { Subject, Subscription } from 'rxjs';
import { TitleCasePipe } from '@angular/common';
import { CompraService } from 'src/app/services/compraService/compra.service';
import { HttpHeaders } from '@angular/common/http';
import { CatalogoComponent } from 'src/app/pages/catalogo/catalogo.component';
import { ThousandsPipe } from 'src/app/pipes/thousands.pipe';


@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
    public responseListadoIngredPrep: any = [];
    public responseListadoPreparacion: any = [];
    public responseListadoIngrediente: any = [];
    public responseListadoCategorias: any = [];
    public respuesta: any;
    public MenuCatalogo: any[] = [];
    suscripcion: Subscription = new Subscription();
    private refrescar = new Subject<void>();
    public compraData: any;
    public compraDetalle: any;
    mostrarCarrito: boolean = false;
    mostrarCatalogo: boolean = true;
    public cantidadItem: number = 1;

    httpOptions = {
        headers: new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
        }),
    };

    static responseListadoCategorias: any;
    static MenuCatalogo: any;
    response: any;

    ngOnInit(): void {
        this.CatalogoMenu();
        this.onList('listCat');
        this.suscripcion = this.refrescar.subscribe(() => {
            this.CatalogoMenu();
            this.onList('listCat');
        });
    }

    ngOnDestroy(): void {
        this.suscripcion.unsubscribe();
    }

    constructor(
        private catalogoComponent: CatalogoComponent,
        private prodService: ProductosService,
        private carritoService: CarritoService,
        private titlecasePipe: TitleCasePipe,
        private compraService: CompraService,
        private thousandsPipe: ThousandsPipe,
        
    ) {}

    //LISTADO OBJETOS DE LA API
    onList(cod: string): void {
        // console.log('testmethod: ', this.responseListadoCategorias);
        switch (cod) {
            case 'listCat': {
                try {
                    this.prodService
                        .obtenerListadoCategoria()
                        .then((respuesta) => {
                            // console.log('test listCat: ', this.responseListadoCategorias);
                            this.responseListadoCategorias = respuesta; //obj con listado ngFor
                        });
                } catch (e: any) {
                    // console.log(e);
                }
                break;
            }
            case 'listIngre': {
                try {
                    this.prodService
                        .obtenerListadoIngrediente()
                        .then((respuesta) => {
                            this.responseListadoIngrediente = respuesta; //obj con listado ngFor
                            this.refrescar.next();
                        });
                } catch (e: any) {
                    // console.log(e);
                }
                break;
            }
            case 'listIngrePrep': {
                try {
                    this.prodService
                        .obtenerListadoIngrediente()
                        .then((respuesta) => {
                            this.responseListadoIngredPrep = respuesta; //obj con listado ngFor
                        });
                } catch (e: any) {
                    // console.log(e);
                }
                break;
            }
            case 'listPrep': {
                try {
                    this.prodService
                        .obtenerListadoPreparacion()
                        .then((respuesta) => {
                            this.responseListadoPreparacion = respuesta; //obj con listado ngFor
                        });
                } catch (e: any) {
                    // console.log(e);
                }
                break;
            }
        }
    }

    // FUNCION FILTRO DE CATEGORIAS Y PREPARACIONES VALIDAS

    CatalogoMenu() {
        let respuestaFinal: any = {};
        let preparaciones: any = [];
        let categorias: any = [];
        let menu = [];
        this.prodService.obtenerListadoPreparacion().then((respuesta) => {
            preparaciones = respuesta; //obj con listado ngFor

            this.prodService.obtenerListadoCategoria().then((respuesta2) => {
                categorias = respuesta2; //obj con listado ngFor
                // console.log('categorias', categorias);
                // console.log('preparaciones', preparaciones);

                preparaciones.forEach((Item: any) => {
                    if (!respuestaFinal[Item.nombre_cat]) {
                        respuestaFinal[Item.nombre_cat] = {
                            categoria: categorias.find(
                                (cat: any) => cat.nombre_cat === Item.nombre_cat
                            ),
                            items: [],
                        };
                    }
                    respuestaFinal[Item.nombre_cat].items.push(Item);
                });
                menu = respuestaFinal;
                this.MenuCatalogo = Object.values(menu);
                // console.log('MENUCATALOGO', this.MenuCatalogo);
                // console.log('RESPUESTA FINAL', respuestaFinal);
            });
        });
    }

    ModalPreparacion(item: any) {
        const nombreProductoTitleCase = this.titlecasePipe.transform(
            item.nombre_prep
        );
        const precioProducto = this.thousandsPipe.transform(item.precio_prep);
        
        Swal.fire({
            html:
                '<div class="row">' +
                '<div class="col-md-6">' +
                '<img src="' +
                item.imagen_prep +
                '" class="img-fluid" alt="Responsive image">' +
                '</div>' +
                '<h3 class="card-title text-3xl text-center font-bold text-gray-800 mb-2"> Agregar ' +
                nombreProductoTitleCase +
                ' a la bolsa? </h3>' +
                '<div class="col-md-6">' +
                //'<p class="text-left">Ingredientes: ' + item.ingredientes_prep + '</p>' +
                // '<p class="text-left">Descripción: ' + item.descripcion_prep + '</p>' +
                '<p class="text-gray-800 font-bold mb-0">Precio: $' +
                 precioProducto +
                '</p>' +
                // '<p class="text-gray-800 font-bold mb-0">Cantidad: ' +
                // this.cantidadItem +
                // '</p>' +
                '<div class="input-group mb-3">' +
                '<button class="btn btn-s bg-neutral-focus no-animation" (click)="disminuirCantidad()">-' +
                '</button>' +
                '<span class="text-error-content font-semibold ">'+ this.cantidadItem +'</span>' +
                '<button class="btn btn-s bg-neutral-focus no-animation" (click)="aumentarCantidad()">+' +
                '</button>' +
                '</div>' +
                '</div>' +
                '</div>',
            focusConfirm: false,
            confirmButtonText: '<b>Sí, agregar</b>',
            cancelButtonText: '<b>Cancelar</b>',
            confirmButtonColor: '#2b8565',
            showCancelButton: true,
            preConfirm: () => {
                this.carritoService.addtoCart(item);
                this.refrescarMenu();
            },
        });
    }

    aumentarCantidad() {
        this.cantidadItem = this.cantidadItem + 1;
    }

    disminuirCantidad() {
        if (this.cantidadItem > 1) {
            this.cantidadItem = this.cantidadItem - 1;
        }
    }



    refrescarMenu() {
        this.refrescar.next();
    }

    addtoCart(item: any) {
        this.carritoService.addtoCart(item);
    }


}
