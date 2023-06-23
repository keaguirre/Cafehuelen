import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarritoService } from 'src/app/services/carritoService/carrito.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import * as printJS from 'print-js';
import { style } from '@angular/animations';

@Component({
    selector: 'app-print',
    templateUrl: './print.component.html',
    styleUrls: ['./print.component.css'],
})
export class PrintComponent implements OnInit {
    orderCarrito: any;
    itemsCarrito: any;
    infoBack: any;
    infoQr: string = '';

    constructor(
        private _route: ActivatedRoute,
        private carritoService: CarritoService,
        private elementRef: ElementRef
    ) {
        this.infoQr = JSON.stringify(this.infoBack);
        this.infoBack;
    }

    ngOnInit(): void {
        this._route.queryParams.subscribe((params) => {
            this.orderCarrito = params;
            this.itemsCarrito = this.carritoService.itemsCarritoservice;
            this.infoBack = this.carritoService.ultimaCompra;
            this.infoQr = JSON.stringify(this.infoBack);
        });
        setTimeout(() => {
            this.imprimirPDF();
        }, 2000);
    }

    imprimirBoleta(): void {
        const contenidoBoleta =
            this.elementRef.nativeElement.querySelector('#invoice-POS');
        const elementosBody = Array.from(
            document.body.children
        ) as HTMLElement[];

        elementosBody.forEach((elemento: HTMLElement) => {
            if (elemento !== contenidoBoleta) {
                elemento.style.display = '';
            }
        });

        window.print();

        elementosBody.forEach((elemento: HTMLElement) => {
            if (elemento !== contenidoBoleta) {
                elemento.style.display = '';
            }
        });
    }

    //    imprimirPDF(): void {
    //    const contenidoBoleta = this.elementRef.nativeElement.querySelector('#invoice-POS');

    //    html2canvas(contenidoBoleta, { scrollX: 0, scrollY: -window.scrollY, scale: 5 }).then(canvas => {
    //      const imgData = canvas.toDataURL('image/png');
    //      const doc = new jsPDF({
    //        unit: 'mm',
    //        format: [80, 297] // Ajusta las dimensiones según el tamaño de tu boleta POS 59 en milímetros
    //      });

    //      const imgProps = doc.getImageProperties(imgData);
    //      const pdfWidth = doc.internal.pageSize.getWidth();
    //      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    //      // Agregar imagen
    //      doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

    //      // Envía el archivo PDF a imprimir
    //      doc.autoPrint();
    //      const blob = doc.output('blob');
    //      const url = URL.createObjectURL(blob);
    //      window.open(url, '_blank', );

    //      // Liberar recursos después de imprimir
    //      URL.revokeObjectURL(url);
    //    });
    //  }

    imprimirPDF(): void {
        const contenidoBoleta =
            this.elementRef.nativeElement.querySelector('#invoice-POS');

        // Convierto el contenido de la boleta en una imagen y luego la exporto a pdf
        html2canvas(contenidoBoleta, {
            scrollX: 0,
            scrollY: -window.scrollY,
            scale: 10,
        }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const doc = new jsPDF({
                unit: 'mm',
                format: [80, 297],
            });
            //Configuro la imagen segun el tamano necesario
            const imgProps = doc.getImageProperties(imgData);
            const pdfWidth = doc.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            // exporto la  imagen a pdf
            doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

            // Generar el archivo PDF y luego imprimirlo usando print-js
            doc.autoPrint();
            const blob = doc.output('blob');
            const url = URL.createObjectURL(blob);
            printJS(url);

            // Limpia los recursos después de imprimir
            URL.revokeObjectURL(url);

            // Recargar la página después de 10 segundos
            setTimeout(() => {
                window.location.reload();
            }, 6000);
        });
    }
}

// imprimirPDF(): void {
//   const contenidoBoleta = this.elementRef.nativeElement.querySelector('#invoice-POS');

//   html2canvas(contenidoBoleta, { scrollX: 0, scrollY: -window.scrollY, scale: 5 }).then(canvas => {
//     const imgData = canvas.toDataURL('image/png');
//     const doc = new jsPDF({
//       unit: 'mm',
//       format: [80, 297] // Ajusta las dimensiones según el tamaño de tu boleta POS 59 en milímetros
//     });

//     const imgProps = doc.getImageProperties(imgData);
//     const pdfWidth = doc.internal.pageSize.getWidth();
//     const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

//     // Agregar imagen
//     doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

//     // Envía el archivo PDF a imprimir
//     doc.autoPrint();
//     const blob = doc.output('blob');
//     const url = URL.createObjectURL(blob);
//     const printWindow = window.open(url, '_blank');

//     if (printWindow) {
//       printWindow.addEventListener('afterprint', () => {
//         printWindow.close();
//         URL.revokeObjectURL(url);

//       });
//     }
//   });
//
