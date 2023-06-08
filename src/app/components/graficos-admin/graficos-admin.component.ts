import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { ThousandsPipe } from 'src/app/pipes/thousands.pipe';
import { AnaliticasService } from 'src/app/services/analiticasService/analiticas.service';

@Component({
  selector: 'app-graficos-admin',
  templateUrl: './graficos-admin.component.html',
  styleUrls: ['./graficos-admin.component.css']
})


export class GraficosAdminComponent implements OnInit {
  public chart: any;
  public chart1: any;
  public compraSemanalMesChart: any;
  public compraMensualAnualChart: any;

  //-------cantidad de compras-------
  responseComprasDiaSemana: any = [];
  responseCompraMesActual: any = [];
  responseComprasMesSemana: any = [];
  responseComprasPorMesAnual: any = [];
  responseCompraSemanalAnual: any = [];
  responseComprasHoy: any = [];
  responseComprasSemanal: any = [];
  responseRecaudacionSemanalMes:any=[];

  //------dineros---------
  responseRecaudacionHoy: any = [];
  responseRecaudacionSemanal: any = [];
  responseRecaudacionDiaSemanal: any = [];

  constructor(private analiticasServices: AnaliticasService) { }

  ngOnInit(): void {
    this.listComprasHoy();
    this.listCompraDiaSemana();
    this.listRecaudacionHoy();
    this.listComprasSemanal();
    this.listRecaudacionSemanal();
    this.listRecaudacionDiaSemanal();
    this.listComprasSemanalMes();
    this.listRecaudacionSemanalMes();
  };

  listComprasHoy() { //total compras(pedidos) hoy
    this.analiticasServices.obtenerListadoComprasHoy().then(respuesta => {
      this.responseComprasHoy = respuesta;
    })
  }
  listComprasSemanal() { //total de compras(pedidos) semana actual
    this.analiticasServices.obtenerListadoComprasHoy().then(respuesta => {
      this.responseComprasSemanal = respuesta;
    })
  }
  listCompraDiaSemana() { //compras(pedidos) por cada dia de la semana actual
    this.analiticasServices.obtenerListadoComprasDiaSemana().then(respuesta => {
      this.responseComprasDiaSemana = respuesta.map((item: any) => item.total_compras);
      const diasSemana = respuesta.map((item: any) => item.dia_semana);
      this.comprasDiarias(diasSemana);
    })
  }
  listCompraMesActual() {  //Cantidad de compras del mes actual
    this.analiticasServices.obtenerListadoComprasMesActual().then(respuesta => {
      this.responseCompraMesActual = respuesta;
    })
  }

  listComprasSemanalMes() { //listado compras por semana del mes actual
    this.analiticasServices.obtenerListadoTotalComprasMesSemana().then(respuesta => {
      this.responseComprasMesSemana = respuesta;
      this.responseComprasMesSemana = respuesta.map((item: any) => item.total_compras);
      const semanaMes = respuesta.map((item: any) => item.semana_del_mes);
      this.compraSemanalMes(semanaMes);

    })
  }
  listComprasPorMesAnual() {
    this.analiticasServices.obtenerListadoTotalComprasPorMesAnual().then(respuesta => {
      this.responseCompraMesActual = respuesta;

    })
  }
  listCompraSemanalAnual() {
    this.analiticasServices.obtenerListadoTotalCompraSemanalAnual().then(respuesta => {
      this.responseCompraSemanalAnual = respuesta;

    })
  }

  //---Recaudaciones--------------
  listRecaudacionHoy() { //total recaudacion hoy
    this.analiticasServices.obtenerTotalComprasHoy().then(respuesta => {
      this.responseRecaudacionHoy = respuesta;
    })
  }
  listRecaudacionSemanal() { //total semana actual
    this.analiticasServices.obtenerTotalSemanalAldia().then(respuesta => {
      this.responseRecaudacionSemanal = respuesta;
    })
  }
  listRecaudacionDiaSemanal() { //total por dia de la semana actual
    this.analiticasServices.obtenerListadoTotalComprasDiariaxSemana().then(respuesta => {
      this.responseRecaudacionDiaSemanal = respuesta.map((item: any) => item.total_compras);
      const diasSemana = respuesta.map((item: any) => item.dia_semana);
      this.ingresoDiario(diasSemana);
    })
  }

  listRecaudacionSemanalMes() { //Recaudacion por semana del mes actual
    this.analiticasServices.obtenerTotalCompraSemanalMes().then(respuesta => {
      this.responseRecaudacionSemanalMes = respuesta;
      this.responseRecaudacionSemanalMes = respuesta.map((item: any) => item.total_compras);
      const semanaDelMes = respuesta.map((item: any) => item.semana_del_mes);
      this.ingresoSemanalMes(semanaDelMes);

    })
  }


  comprasDiarias(labels: string[]) {
    Chart.defaults.color = '#F8F8F2';
    this.chart = new Chart("comprasDiarias", {
      type: 'line', //this denotes tha type of chart
      data: {
        labels: ['Lunes', 'Martes', 'Miercoles', 'Jueves',
          'Viernes', 'Sabado', 'Domingo'],
          
        datasets: [{
          label: 'Compras por dia de esta semana',
          data: this.responseComprasDiaSemana ,
          fill: false,
          borderColor: '#FF79C6',
          tension: 0.10,
        },],
        
      },
      options: {
        aspectRatio: 5,
        scales: {
          x: {
            grid: {
              color: '#545970',
            },
            ticks: {
              font: {
                  size: 16 //this change the font size
              }
            }
          },
          y: {
            grid: {
              color: '#545970',
            },
            ticks: {
              font: {
                  size: 14 //this change the font size
              }
            }
          }
        },
        plugins: {
          legend: {
              labels: {
                  // This more specific font property overrides the global property
                  font: {
                      size: 14
                  }
              }
          }
      }
      }
    });
  }
  ingresoDiario(labels: string[]) {
    Chart.defaults.color = '#F8F8F2';
    this.chart = new Chart("ingresoDiario", {
      type: 'line', //this denotes tha type of chart
      data: {
        labels: ['Lunes', 'Martes', 'Miercoles', 'Jueves',
          'Viernes', 'Sabado', 'Domingo'],
          
        datasets: [{
          label: 'Facturacion por dia de esta semana',
          data: this.responseRecaudacionDiaSemanal,
          fill: false,
          borderColor: '#FF79C6',
          tension: 0.10,
        },],
        
      },
      options: {
        aspectRatio: 5,
        scales: {
          x: {
            grid: {
              color: '#545970',
            },
            ticks: {
              font: {
                  size: 16 //this change the font size
              }
            }
          },
          y: {
            grid: {
              color: '#545970',
            },
            ticks: {
              font: {
                  size: 14 //this change the font size
              }
            }
          }
        },
        plugins: {
          legend: {
              labels: {
                  // This more specific font property overrides the global property
                  font: {
                      size: 14
                  }
              }
          }
      }
      }
    });
  }
  compraSemanalMes(labels: string[]) {
    Chart.defaults.color = '#F8F8F2';
    this.chart = new Chart("compraSemanalMes", {
      type: 'line', //this denotes tha type of chart
      data: {
        labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4',
        'Semana 5'],
          
        datasets: [{
          label: 'Pedidos por semana del mes',
          data: this.responseComprasMesSemana,
          fill: false,
          borderColor: '#FF79C6',
          tension: 0.10,
        },],
        
      },
      options: {
        aspectRatio: 5,
        scales: {
          x: {
            grid: {
              color: '#545970',
            },
            ticks: {
              font: {
                  size: 16 //this change the font size
              }
            }
          },
          y: {
            grid: {
              color: '#545970',
            },
            ticks: {
              font: {
                  size: 14 //this change the font size
              }
            }
          }
        },
        plugins: {
          legend: {
              labels: {
                  // This more specific font property overrides the global property
                  font: {
                      size: 14
                  }
              }
          }
      }
      }
    });
  }
  ingresoSemanalMes(labels: string[]) {
    Chart.defaults.color = '#F8F8F2';
    this.chart = new Chart("ingresoSemanalMes", {
      type: 'line', //this denotes tha type of chart
      data: {
        labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4',
        'Semana 5'],
        datasets: [{
          label: 'Facturacion por semana del mes actual',
          data: this.responseRecaudacionSemanalMes,
          fill: false,
          borderColor: '#FF79C6',
          tension: 0.10,
        },],
        
      },
      options: {
        aspectRatio: 5,
        scales: {
          x: {
            grid: {
              color: '#545970',
            },
            ticks: {
              font: {
                  size: 16 //this change the font size
              }
            }
          },
          y: {
            grid: {
              color: '#545970',
            },
            ticks: {
              font: {
                  size: 14 //this change the font size
              }
            }
          }
        },
        plugins: {
          legend: {
              labels: {
                  // This more specific font property overrides the global property
                  font: {
                      size: 14
                  }
              }
          }
      }
      }
    });
  }
  // compraMensualAnual(labels: string[]) {
  //   Chart.defaults.color = '#F8F8F2';
  //   this.chart = new Chart("compraMensualAnual", {
  //     type: 'line', //this denotes tha type of chart
  //     data: {
  //       labels: ['Lunes', 'Martes', 'Miercoles', 'Jueves',
  //         'Viernes', 'Sabado', 'Domingo'],
          
  //       datasets: [{
  //         label: 'Facturacion por dia de esta semana',
  //         data: this.responseRecaudacionSemanalMes,
  //         fill: false,
  //         borderColor: '#FF79C6',
  //         tension: 0.10,
  //       },],
        
  //     },
  //     options: {
  //       aspectRatio: 5,
  //       scales: {
  //         x: {
  //           grid: {
  //             color: '#545970',
  //           },
  //           ticks: {
  //             font: {
  //                 size: 16 //this change the font size
  //             }
  //           }
  //         },
  //         y: {
  //           grid: {
  //             color: '#545970',
  //           },
  //           ticks: {
  //             font: {
  //                 size: 14 //this change the font size
  //             }
  //           }
  //         }
  //       },
  //       plugins: {
  //         legend: {
  //             labels: {
  //                 // This more specific font property overrides the global property
  //                 font: {
  //                     size: 14
  //                 }
  //             }
  //         }
  //     }
  //     }
  //   });
  // }
  
  // ingresoMensualAnual(labels: string[]) {
  //   Chart.defaults.color = '#F8F8F2';
  //   this.chart = new Chart("ingresoMensualAnual", {
  //     type: 'line', //this denotes tha type of chart
  //     data: {
  //       labels: ['Lunes', 'Martes', 'Miercoles', 'Jueves',
  //         'Viernes', 'Sabado', 'Domingo'],
          
  //       datasets: [{
  //         label: 'Facturacion por dia de esta semana',
  //         data: this.responseRecaudacionSemanalMes,
  //         fill: false,
  //         borderColor: '#FF79C6',
  //         tension: 0.10,
  //       },],
        
  //     },
  //     options: {
  //       aspectRatio: 5,
  //       scales: {
  //         x: {
  //           grid: {
  //             color: '#545970',
  //           },
  //           ticks: {
  //             font: {
  //                 size: 16 //this change the font size
  //             }
  //           }
  //         },
  //         y: {
  //           grid: {
  //             color: '#545970',
  //           },
  //           ticks: {
  //             font: {
  //                 size: 14 //this change the font size
  //             }
  //           }
  //         }
  //       },
  //       plugins: {
  //         legend: {
  //             labels: {
  //                 // This more specific font property overrides the global property
  //                 font: {
  //                     size: 14
  //                 }
  //             }
  //         }
  //     }
  //     }
  //   });
  // }
}
