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
    audioTap!: HTMLAudioElement;
    audioProdAgregado!: HTMLAudioElement;
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
    ) {
        this.audioTap = new Audio();
        this.audioTap.src = '../../../assets/audios/tap.mp3'
        this.audioProdAgregado = new Audio();
        this.audioProdAgregado.src = '../../../assets/audios/Producto_agregado.m4a'
    }

    //LISTADO OBJETOS DE LA API
    onList(cod: string): void {
        
        switch (cod) {
            case 'listCat': {
                try {
                    this.prodService
                        .obtenerListadoCategoria()
                        .then((respuesta) => {
                          
                            this.responseListadoCategorias = respuesta; //obj con listado ngFor
                        });
                } catch (e: any) {
                    console.log(e);
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
                    console.log(e);
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
                    console.log(e);
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
                    console.log(e);
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

            });
        });
    }

    ModalPreparacion(item: any) {
        this.audioTap.play();
        const nombreProductoTitleCase = this.titlecasePipe.transform(
            item.nombre_prep
        );
        const precioProducto = this.thousandsPipe.transform(item.precio_prep);

        let descripcionPrep:string = item.descripcion_prep;
        descripcionPrep = descripcionPrep[0].toUpperCase() + descripcionPrep.slice(1);
        
        Swal.fire({
            width: '30%',
            html:
                '<div class="row object-center">' +
                '<div class="col-md-6 flex justify-center content-center">' +
                '<img src="' +
                item.imagen_prep +
                '" class="img-fluid w-96 h-96 object-cover content-center" alt="Responsive image">' +
                '</div>' +
                '<h3 class="card-title text-3xl flex justify-center content-center text-center font-bold text-base-content mb-2"> ¿Agregar ' +
                nombreProductoTitleCase +
                ' a la bolsa? </h3>' +
                '<h3 class=" text-secondary text-center font-semibold">'+ descripcionPrep +'</h3>' +
                '<div class="col-md-6">' +                
                '<p class="text-accent font-bold mb-0">Precio: $' +
                 precioProducto +
                '</p>' +
                '</div>' +
                '</div>',
            background:'rgb(65, 69, 88)',
            focusConfirm: false,
            confirmButtonText: '<b>Sí, agregar</b>',
            cancelButtonText: '<b>Cancelar</b>',
            confirmButtonColor: 'rgb(101, 92, 201)',
            showCancelButton: true,
            
            preConfirm: () => {
                this.carritoService.addtoCart(item);
                this.audioProdAgregado.play();
                this.refrescarMenu();
            },
        });
    }

    aumentarCantidad() {
        this.cantidadItem = this.cantidadItem + 1;
        this.audioTap.play();
    }

    disminuirCantidad() {
        if (this.cantidadItem > 1) {
            this.cantidadItem = this.cantidadItem - 1;
            this.audioTap.play();
        }
    }

    refrescarMenu() {
        this.refrescar.next();
    }

    addtoCart(item: any) {
        this.carritoService.addtoCart(item);
    }
    
    scrollToElement($element: any): void {
        $element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        
    }

    sonidoTap() {
        this.audioTap.play();
    }
    
}
