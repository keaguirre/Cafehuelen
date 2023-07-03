import { Injectable } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { ThousandsPipe } from 'src/app/pipes/thousands.pipe';
import { CompraService } from '../compraService/compra.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { _isClickEvent } from 'chart.js/dist/helpers/helpers.core';
import { CarritoComponent } from 'src/app/components/carrito/carrito.component';
import { EventEmitter } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class CarritoService {
    response!: any;
    responseAuto!: any;
    ultimaCompra: any;
    audioSinStock!: HTMLAudioElement;
    audioPedRealizado!: HTMLAudioElement;
    audioProdEliminado!: HTMLAudioElement;
    audioBolsaVaciada!: HTMLAudioElement;
    audioConfirmeAccion!: HTMLAudioElement;
    imprimirBoleta: EventEmitter<void> = new EventEmitter<void>();
    decision!: string;

    constructor(
        private thousandsPipe: ThousandsPipe,
        private titleCasePipe: TitleCasePipe,
        private compraService: CompraService,
        private Router: Router
    ) {
        this.audioSinStock = new Audio();
        this.audioSinStock.src = '../../../assets/audios/atencion-preparacion.mp3';
        this.audioPedRealizado = new Audio();
        this.audioPedRealizado.src = '../../../assets/audios/Pedido_realizado.m4a';
        this.audioProdEliminado = new Audio();
        this.audioProdEliminado.src = '../../../assets/audios/Producto-eliminado.mp3';
        this.audioBolsaVaciada = new Audio();
        this.audioBolsaVaciada.src = '../../../assets/audios/Bolsa-vaciada.mp3';
        this.audioConfirmeAccion = new Audio();
        this.audioConfirmeAccion.src = '../../../assets/audios/confirme_accion.mp3';
            
    }

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
            title:
                "<h5 class=' text-base-content'> " +
                `${nombreProductoTitleCase} agregado` +
                '</h5>',
            showConfirmButton: false,
            timer: 1125,
            background: 'rgb(65, 69, 88)',
        });
    }

    clearCart(): void {
        localStorage.removeItem('cart');
        this.audioBolsaVaciada.play();
    }

    clearCartNoAudio(): void {
        localStorage.removeItem('cart');
    }

    botonClearCart(): void {
        this.audioConfirmeAccion.play();
        Swal.fire({
            icon: 'error',
            title: "<h5 class=' text-base-content'> ¿Deseas eliminar todos los productos de la lista?</h5>",
            showCancelButton: true,
            confirmButtonText: `Eliminar`,
            cancelButtonText: `Cancelar`,
            confirmButtonColor: '#2b8565',
            background: 'rgb(65, 69, 88)',
        }).then((result) => {
            if (result.isConfirmed) {
                this.clearCart();
                Swal.fire({
                    icon: 'success',
                    title: "<h5 class=' text-base-content'> Lista de productos eliminada</h5>",
                    showConfirmButton: false,
                    timer: 1125,
                    background: 'rgb(65, 69, 88)',
                });
            } else if (result.isDismissed) {
                Swal.fire({
                    icon: 'info',
                    title: "<h5 class=' text-base-content'> Lista de productos no eliminada</h5>",
                    showConfirmButton: false,
                    timer: 1125,
                    background: 'rgb(65, 69, 88)',
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
        this.audioConfirmeAccion.play();
        Swal.fire({
            icon: 'error',
            title:
                "<h5 class=' text-base-content'> " +
                `¿Deseas eliminar ${nombreProductoTitleCase} de la lista?` +
                '</h5>',
            showCancelButton: true,
            confirmButtonText: `Eliminar`,
            cancelButtonText: `Cancelar`,
            confirmButtonColor: '#2b8565',
            background: 'rgb(65, 69, 88)',
        }).then((result) => {
            if (result.isConfirmed) {
                this.audioProdEliminado.play();
                this.eliminarItem(item);
                Swal.fire({
                    icon: 'success',
                    title:
                        "<h5 class=' text-base-content'> " +
                        `${nombreProductoTitleCase} eliminado` +
                        '</h5>',
                    showConfirmButton: false,
                    timer: 1125,
                    background: 'rgb(65, 69, 88)',
                });
            } else if (result.isDismissed) {
                Swal.fire({
                    icon: 'info',
                    title:
                        "<h5 class=' text-base-content'> " +
                        `${nombreProductoTitleCase} no eliminado` +
                        '</h5>',
                    showConfirmButton: false,
                    timer: 1125,
                    background: 'rgb(65, 69, 88)',
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
                title:
                    "<h5 class=' text-base-content'> " +
                    `¿Deseas eliminar ${nombreProductoTitleCase} de la lista?` +
                    '</h5>',
                showCancelButton: true,
                confirmButtonText: `Eliminar`,
                cancelButtonText: `Cancelar`,
                confirmButtonColor: '#2b8565',
                background: 'rgb(65, 69, 88)',
            }).then((result) => {
                if (result.isConfirmed) {
                    this.audioProdEliminado.play();
                    this.eliminarItem(producto);
                    Swal.fire({
                        icon: 'success',
                        title:
                            "<h5 class=' text-base-content'> " +
                            `${nombreProductoTitleCase} eliminado` +
                            '</h5>',
                        showConfirmButton: false,
                        timer: 1125,
                        background: 'rgb(65, 69, 88)',
                    });
                } else if (result.isDismissed) {
                    Swal.fire({
                        icon: 'info',
                        title:
                            "<h5 class=' text-base-content'> " +
                            `${nombreProductoTitleCase} no eliminado` +
                            '</h5>',
                        showConfirmButton: false,
                        timer: 1125,
                        background: 'rgb(65, 69, 88)',
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

    sendOrder(order: any): void {
        let tipo_servicio_compra = this.decision; // Pa LLevar, Delivery
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
            let nombre_prep = item.producto.nombre_prep;
            let descuentoInventario = {
                id_prep,
                cantidad_item,
                nombre_prep,
            };
            ArraydescuentoInventario = [
                ...ArraydescuentoInventario,
                descuentoInventario,
            ];
        });
        console.log('---- valor antes consulta', this.verificadorBoolean);
        // console.log('ArraydescuentoInventario', ArraydescuentoInventario);
        const resp = await this.compraService
            .mandarItemCompraAuto(ArraydescuentoInventario)
            .then((res) => {
                this.responseAuto = res;
                console.log('response', this.responseAuto);
                console.log('res ', res);
                if (res[0].includes('Stock actualizado correctamente')) {
                    this.verificadorBoolean = true;
                    return true;
                } else {
                    this.verificadorBoolean = false;
                    return false;
                }
            })
            .catch((err) => {
                console.log('err', err);
                this.verificadorBoolean = false;
                console.log('---- valor en error', this.verificadorBoolean);
                return false;
            });
        console.log('---- valor después', this.verificadorBoolean);
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
                                    this.audioPedRealizado.play();
                                    // console.log(respuesta, 'respuesta del if ');
                                    Swal.fire({
                                        icon: 'success',
                                        title: "<h5 class=' text-base-content'> Pedido realizado con éxito </h5>",
                                        showConfirmButton: false,
                                        timer: 1125,
                                        background: 'rgb(65, 69, 88)',
                                    });
                                    this.ultimaCompra = respuesta;
                                    this.imprimirBoleta.emit();
                                    this.Router.navigate(['print'], {
                                        queryParams: this.retirarInfoOrden(),
                                        skipLocationChange: true,
                                    });
                                    this.clearOrderData();
                                    this.itemsCarritoservice =
                                        this.getCartItems();
                                    this.sendOrderItem(this.getCartItems());
                                    this.clearCartNoAudio();
                                }

                                // console.log('ultimaCompra', this.ultimaCompra);
                            });
                    }
                } catch (error) {
                    console.log(error);
                    Swal.fire({
                        icon: 'error',
                        title: "<h5 class=' text-base-content'>  Error al realizar el pedido </h5>",
                        showConfirmButton: false,
                        timer: 1125,
                        background: 'rgb(65, 69, 88)',
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

        this.sendOrder(this.getCart);
        Swal.fire({
            // html:,
            title: "<h5 class=' text-base-content'> ¿Desea finalizar su pedido? </h5>",
            background: 'rgb(65, 69, 88)',
            width: '40%',
            focusConfirm: false,
            confirmButtonText: '<b>Finalizar pedido </b>',
            confirmButtonColor: '#2b8565',
            showCancelButton: true,
            cancelButtonText: '<b>Seguir comprando </b>',
        }).then((result) => {
            if (result.isConfirmed) {
                //this.verificadorStock();
                this.checkStock();
                Swal.fire({
                    title: "<h5 class=' text-base-content'> Espere mientras procesamos su pedido </h5>",
                    html:
                        '<div class="spinner-border" role="status">' +
                        '<span class="sr-only">Cargando...</span>' +
                        '</div>',
                    background: 'rgb(65, 69, 88)',
                    showConfirmButton: true,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    allowEnterKey: false,
                    timer: 2250,

                    didOpen: () => {
                        Swal.showLoading();
                        console.log('verificadorBoolean2', verificadorBoolean2);
                        console.log('didopen', this.verificadorBoolean);
                    },
                }).then((result) => {});
            } else if (result.isDismissed) {
                this.clearOrderData();
                Swal.fire({
                    title: "<h5 class=' text-base-content'> Seguimos comprando </h5>",
                    html: '<span class="text-base-content text-lg"> Su pedido no se ha procesado </span>',
                    icon: 'info',
                    confirmButtonColor: '#2b8565',
                    timer: 1250,
                    showConfirmButton: false,
                    background: 'rgb(65, 69, 88)',
                });
            }
        });
    }

    async checkStock() {
        try {
            const stockDisponible = await this.verificadorStock();
            console.log('---RESPUESTA STOCKKK ---', stockDisponible);

            if (stockDisponible) {
                // Mostrar alerta para indicar que el stock está disponible
                // alert('El stock está disponible');
                this.onCreate('crearCompra');
            } else {
                this.audioSinStock.play();
                // Mostrar alerta para indicar que el stock no está disponible
                // alert('El stock no está disponible');
                Swal.fire({
                    title: "<h5 class=' text-base-content'> Error </h5>",
                    html:
                        '<span class="text-base-content text-lg">' +
                        this.responseAuto +
                        '</span>',
                    icon: 'error',
                    showConfirmButton: true,
                    confirmButtonText: 'Aceptar',
                    background: 'rgb(65, 69, 88)',
                });
            }
        } catch (error) {
            // Mostrar alerta para indicar un error en la verificación de stock
            //   alert('Error al verificar el stock');
        }
    }

    setDecision(decision: string) {
        this.decision = decision;
    }

}
