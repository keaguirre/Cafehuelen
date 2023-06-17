import { Injectable } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { ThousandsPipe } from 'src/app/pipes/thousands.pipe';
import { CompraService } from '../compraService/compra.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { _isClickEvent } from 'chart.js/dist/helpers/helpers.core';

@Injectable({
    providedIn: 'root',
})
export class CarritoService {
    response!: any;
    ultimaCompra: any;

    constructor(
        private thousandsPipe: ThousandsPipe,
        private titleCasePipe: TitleCasePipe,
        private compraService: CompraService,
        private Router: Router
    ) {}

    getCart(): any {
        return JSON.parse(localStorage.getItem('cart') || '{}');
    }

    getCartItems(): any[] {
        let cart = this.getCart();
        let items: any[] = [];
        for (let producto in cart) {
            items.push(cart[producto]);
            // console.log('items', items);
        }
        return items;
    }

    addtoCart(producto: any): void {
        const nombreProductoTitleCase = this.titleCasePipe.transform(
            producto.nombre_prep
        );
        let cart = this.getCart();
        let id = producto.id_prep;
        let cantidad = cart[id] ? cart[id].cantidad + 1 : 1;
        let estado = (cart[id] = { producto, cantidad });
        localStorage.setItem('cart', JSON.stringify(cart));
        // console.log('cart', item);
        Swal.fire({
            icon: 'success',
            title: `${nombreProductoTitleCase} agregado`,
            showConfirmButton: false,
            timer: 1125,
        });
    }

    clearCart(): void {
        localStorage.removeItem('cart');
    }

    botonClearCart(): void {
        Swal.fire({
            icon: 'error',
            title: `¿Deseas eliminar todos los productos de la lista?`,
            showCancelButton: true,
            confirmButtonText: `Eliminar`,
            cancelButtonText: `Cancelar`,
            confirmButtonColor: '#2b8565',
        }).then((result) => {
            if (result.isConfirmed) {
                this.clearCart();
                Swal.fire({
                    icon: 'success',
                    title: `Lista de productos eliminada`,
                    showConfirmButton: false,
                    timer: 1125,
                });
            } else if (result.isDismissed) {
                Swal.fire({
                    icon: 'info',
                    title: `Lista de productos no eliminada`,
                    showConfirmButton: false,
                    timer: 1125,
                });
            }
        });
    }

    getCartLength(): number {
        let cart = this.getCart();
        return Object.keys(cart).length;
    }

    getCartTotalItems(): number {
        let cart = this.getCart();
        let total = 0;
        for (let item in cart) {
            total += cart[item].cantidad;
        }
        return total;
    }

    eliminarItem(item: any) {
        let cart = this.getCart();
        let id = item.producto.id_prep;
        delete cart[id];
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    botonEliminarItem(item: any) {
        const nombreProductoTitleCase = this.titleCasePipe.transform(
            item.producto.nombre_prep
        );
        Swal.fire({
            icon: 'error',
            title: `¿Deseas eliminar ${nombreProductoTitleCase} de la lista?`,
            showCancelButton: true,
            confirmButtonText: `Eliminar`,
            cancelButtonText: `Cancelar`,
            confirmButtonColor: '#2b8565',
        }).then((result) => {
            if (result.isConfirmed) {
                this.eliminarItem(item);
                Swal.fire({
                    icon: 'success',
                    title: `${nombreProductoTitleCase} eliminado`,
                    showConfirmButton: false,
                    timer: 1125,
                });
            } else if (result.isDismissed) {
                Swal.fire({
                    icon: 'info',
                    title: `${nombreProductoTitleCase} no eliminado`,
                    showConfirmButton: false,
                    timer: 1125,
                });
            }
        });
    }

    incrementarCantidad(producto: any): void {
        let cart = this.getCart();
        // console.log('cart prev', cart)
        let id = producto.producto.id_prep;
        let item = cart[id];
        item.cantidad = item.cantidad + 1;
        // console.log('cart post', cart);
        // let cantidad = cart[id].cantidad + 1;
        // cart[id] = { producto, cantidad };
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    decrementarCantidad(producto: any): void {
        const nombreProductoTitleCase = this.titleCasePipe.transform(
            producto.producto.nombre_prep
        );
        let cart = this.getCart();
        let id = producto.producto.id_prep;
        let item = cart[id];
        item.cantidad = item.cantidad - 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        if (item.cantidad === 0) {
            Swal.fire({
                icon: 'error',
                title: `¿Deseas eliminar ${nombreProductoTitleCase} de la lista?`,
                showCancelButton: true,
                confirmButtonText: `Eliminar`,
                cancelButtonText: `Cancelar`,
                confirmButtonColor: '#2b8565',
            }).then((result) => {
                if (result.isConfirmed) {
                    this.eliminarItem(producto);
                    Swal.fire({
                        icon: 'success',
                        title: `${nombreProductoTitleCase} eliminado`,
                        showConfirmButton: false,
                        timer: 1125,
                    });
                } else if (result.isDismissed) {
                    Swal.fire({
                        icon: 'info',
                        title: `${nombreProductoTitleCase} no eliminado`,
                        showConfirmButton: false,
                        timer: 1125,
                    });
                    item.cantidad = item.cantidad + 1;
                    localStorage.setItem('cart', JSON.stringify(cart));
                }
            });
        }
    }

    getCartTotal(): number {
        let cart = this.getCart();
        let total = 0;
        for (let item in cart) {
            total += cart[item].producto.precio_prep * cart[item].cantidad;
        }
        return total;
    }

    getCartTotalIva(): number {
        let cart = this.getCart();
        let total = 0;
        for (let item in cart) {
            total += cart[item].producto.precio_prep * cart[item].cantidad;
        }
        return total * 0.19;
    }

    // OnSubmitItemCompra(id_compra: number) {
    //     let cart = this.getCart();

    //     for (let item in cart) {
    //         let id_prep = cart[item].producto.id_prep;
    //         let cantidad = cart[item].cantidad;
    //         let precio = cart[item].producto.precio_prep;
    //         let itemCompra = { id_compra, id_prep, cantidad, precio };
    //         this.compraService.crearItemCompra(itemCompra).then((res) => {
    //             this.response = res;
    //             console.log('response', this.response);
    //         });
    //     }
    // }

    sendOrder(order: any): void {
        let tipo_servicio_compra = 'Pa LLevar'; // Pa LLevar, Delivery
        let estado_compra = 'Espere su llamado'; // Pendiente, Aprobado, Rechazado
        let total_compra = this.getCartTotal(); // Precio total de la compra
        let procesador_pago_compra = 'MercadoPago'; // MercadoPago, PayPal, Stripe
        let id_transaccion_compra = '123456789'; // Id del pago en el procesador de pagos
        let iva = this.getCartTotalIva();
        // let cart = this.getCart();
        let totem_compra = 12;
        // let orderNumber = Math.floor(Math.random() * 1000000000);
        let orderData = {
            tipo_servicio_compra,
            estado_compra,
            total_compra,
            iva,
            procesador_pago_compra,
            id_transaccion_compra,
            totem_compra,
        };
        localStorage.setItem('orderData', JSON.stringify(orderData));
    }
   
    public verificadorBoolean: boolean = false;


    async verificadorStock(): Promise<boolean> {
        console.log('verificadorStock corriendo');
        
        let ArraydescuentoInventario: any = [];
        
        this.getCartItems().map((item: any) => {
            let id_prep = item.producto.id_prep;
            let cantidad_item = item.cantidad;
            let descuentoInventario = {
                id_prep,
                cantidad_item,
            };
            ArraydescuentoInventario = [
                ...ArraydescuentoInventario,
                descuentoInventario,
            ];
        });
        console.log('---- valor antes consulta', this.verificadorBoolean)
        // console.log('ArraydescuentoInventario', ArraydescuentoInventario);
        const resp = await this.compraService
            .mandarItemCompraAuto(ArraydescuentoInventario)
            .then((res) => {
                this.response = res;
                console.log('response', this.response);
                console.log('res ', res);
                if (res[0].includes('Stock actualizado correctamente')) {
                    this.verificadorBoolean = true;
                    return true
                } else {
                    this.verificadorBoolean = false;
                    return false
                }
            })
            .catch((err) => {
                console.log('err', err);
                this.verificadorBoolean = false;
                console.log('---- valor en error', this.verificadorBoolean)
               return false;
            });
            console.log('---- valor después', this.verificadorBoolean)
        return resp;
    }

    sendOrderItem(orderItem: any): void {
        this.getCartItems().map((item: any) => {
            let id_prep = item.producto.id_prep;
            let id_compra = this.ultimaCompra.id_compra;
            let cantidad_item = item.cantidad;
            let precio_unitario_item = item.producto.precio_prep;
            let total_item = item.producto.precio_prep * item.cantidad;
            let itemCompra = {
                id_prep,
                cantidad_item,
                precio_unitario_item,
                id_compra,
                total_item,
            };

            // console.log('ArraydescuentoInventario', ArraydescuentoInventario);
            // console.log('itemCompra', itemCompra);
            this.compraService
                .crearItemCompra(itemCompra)
                .then((res) => {
                    this.response = res;
                })
                .catch((err) => {
                    console.log('err', err);
                });
        });
    }

    clearOrderData(): void {
        localStorage.removeItem('orderData');
    }

    retirarInfoOrden(): any {
        const orderData = localStorage.getItem('orderData');
        if (orderData) {
            return JSON.parse(orderData);
        } else {
            return null;
        }
    }

    itemsCarritoservice: any;

    onCreate(cod: string): void {
        switch (cod) {
            case 'crearCompra':
                try {
                    const InfoOrden = this.retirarInfoOrden();
                    // console.log('infoOrden', InfoOrden);
                    if (InfoOrden) {
                        this.compraService
                            .crearCompra(InfoOrden)
                            .then((respuesta) => {
                                if (respuesta) {
                                    // console.log(respuesta, 'respuesta del if ');
                                    Swal.fire({
                                        icon: 'success',
                                        title: `Compra realizada con éxito`,
                                        showConfirmButton: false,
                                        timer: 1125,
                                    });
                                    this.ultimaCompra = respuesta;
                                    this.Router.navigate(['print'], {
                                        queryParams: this.retirarInfoOrden(),
                                        skipLocationChange: true,
                                    });
                                    this.clearOrderData();
                                    this.itemsCarritoservice =
                                        this.getCartItems();
                                    this.sendOrderItem(this.getCartItems());
                                    this.clearCart();
                                }
                                // console.log('ultimaCompra', this.ultimaCompra);
                            });
                    }
                } catch (error) {
                    console.log(error);
                    Swal.fire({
                        icon: 'error',
                        title: `Error al realizar la compra`,
                        showConfirmButton: false,
                        timer: 1125,
                    });
                }
                break;
        }
    }

    itemsCarrito() {
        return this.getCartItems();
    }

    botonPreCheckout() {
        console.log('Items Carrito', this.itemsCarrito());
        const verificadorBoolean2 = this.verificadorBoolean;

        const total = this.thousandsPipe.transform(this.getCartTotal());
        this.sendOrder(this.getCart);
        Swal.fire({
            html:
                '<div class="cart">' +
                '<div class="flex justify-center">' +
                '<table class="table object-center">' +
                '<thead class="table-header-group">' +
                '<tr>' +
                '<th ></th>' +
                '<th class="text-base-content text-center">Producto</th>' +
                '<th class="text-base-content text-center">Precio</th>' +
                '<th class="text-base-content text-center">Cantidad</th>' +
                '<th class="text-base-content text-center">Total</th>' +
                // '<th></th>' +
                '</tr>' +
                '</thead>' +
                '<tbody class="">' +
                this.itemsCarrito().map((item: any) => {
                    const nombreProductoTitleCase =
                        this.titleCasePipe.transform(item.producto.nombre_prep);
                    const precioProducto = this.thousandsPipe.transform(
                        item.producto.precio_prep
                    );
                    const totalxItem = this.thousandsPipe.transform(
                        item.producto.precio_prep * item.cantidad
                    );
                    return (
                        '<tr>' +
                        '<td><img src="' +
                        item.producto.imagen_prep +
                        '" class=" h-10 w-10"></td>' +
                        '<td class="text-lg text-base-content">' +
                        nombreProductoTitleCase +
                        '</td>' +
                        '<td class="text-lg text-base-content">$ ' +
                        precioProducto +
                        '</td>' +
                        '<td class="text-base-content text-center">' +
                        // '<button class="btn btn-xs" (click)="decrementarCantidad(item)"'+
                        //     '[disabled]="item.cantidad === 1">-</button>'+
                        item.cantidad +
                        // '<button class="btn btn-xs" (click)="incrementarCantidad(item)">+</button>'+
                        '</td>' +
                        '<td class="text-lg text-base-content">$' +
                        totalxItem +
                        '</td>' +
                        // '<td>'+
                        //     '<button class="btn btn-error no-animation" (click)="eliminarItem(item)">Eliminar'+
                        //         'item</button>'+
                        // '</td>'+
                        '</tr>'
                    );
                }) +
                '</tbody>' +
                '<tfoot class="table-footer-group">' +
                '<tr>' +
                '<td colspan="3" class="text-xl text-base-content">Total:</td>' +
                '<td></td>' +
                '<td class="text-xl text-base-content">$' +
                total +
                '</td>' +
                // '<td></td>' +
                '</tr>' +
                '</tfoot>' +
                '</table>' +
                '</div>' +
                // '<div class="flex justify-center">' +
                // '<button class="object-center btn btn-error" onclick="clearCart();" ">Limpiar carrito de compras</button>' +
                // '</div>' +
                '</div>',
            background: 'rgb(65, 69, 88)',
            width: '40%',
            focusConfirm: false,
            confirmButtonText: '<b>Finalizar compra</b>',
            confirmButtonColor: '#2b8565',
            showCancelButton: true,
            cancelButtonText: '<b>Seguir comprando</b>',
        }).then((result) => {
            if (result.isConfirmed) {
                //this.verificadorStock();
                this.checkStock();
                Swal.fire({
                    title: 'Espere mientras procesamos su pedido',
                    html:
                        '<div class="spinner-border" role="status">' +
                        '<span class="sr-only">Cargando...</span>' +
                        '</div>',

                    showConfirmButton: true,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    allowEnterKey: false,
                    timer: 2250,
                    didOpen: () => {
                        Swal.showLoading();
                        console.log('verificadorBoolean2', verificadorBoolean2);
                        console.log('didopen', this.verificadorBoolean);
                        // if (this.verificadorBoolean === false) {
                        //     result.isDenied 
                        //     Swal.fire({
                        //         title: 'Error',
                        //         text:
                        //             'No hay stock suficiente para realizar su pedido',
                        //         icon: 'error',
                        //         confirmButtonColor: '#2b8565',
                        //         timer: 1250,
                        //         showConfirmButton: false,
                        //     });
                        // }
                    },
                }).then((result) => {

                });
            } else if (result.isDismissed) {
                this.clearOrderData();
                Swal.fire({
                    title: 'Seguimos comprando',
                    text: 'Su pedido no se ha procesado',
                    icon: 'info',
                    confirmButtonColor: '#2b8565',
                    timer: 1250,
                    showConfirmButton: false,
                });
            }
        });
    }


    async checkStock() {
        try {
          const stockDisponible = await this.verificadorStock();
          console.log('---RESPUESTA STOCKKK ---', stockDisponible)
          if (stockDisponible) {
            // Mostrar alerta para indicar que el stock está disponible
            // alert('El stock está disponible');
            this.onCreate('crearCompra');
          } else {
            // Mostrar alerta para indicar que el stock no está disponible
            // alert('El stock no está disponible');
            Swal.fire({
                title: 'Error',
                text:
                    'No hay stock suficiente para realizar su pedido',
                icon: 'error',
                timer: 1250,
                showConfirmButton: false,
            });

          }
        } catch (error) {
          // Mostrar alerta para indicar un error en la verificación de stock
        //   alert('Error al verificar el stock');
        }
    }
}
