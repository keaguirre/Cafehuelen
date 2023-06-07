import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { AnaliticasService } from 'src/app/services/analiticasService/analiticas.service';

@Component({
  selector: 'app-graficos-admin',
  templateUrl: './graficos-admin.component.html',
  styleUrls: ['./graficos-admin.component.css']
})


export class GraficosAdminComponent implements OnInit {
  public chart: any;
  public chart1: any;
  responseComprasDiaSemana: any = [];
  responseCompraMesActual: any = [];
  responseComprasMesSemana: any = [];
  responseComprasPorMesAnual: any = [];
  responseCompraSemanalAnual: any = [];
  responseComprasHoy: any = [];
  constructor(private analiticasServices: AnaliticasService) { }

  ngOnInit(): void {
    this.listComprasHoy();
    this.ingresoDiario();
    this.listCompraDiaSemana();
  };
  listComprasHoy() {
    this.analiticasServices.obtenerListadoComprasHoy().then(respuesta => {
      console.log('resp component: ', respuesta)
      this.responseComprasHoy = respuesta;
    })
  }
  listCompraDiaSemana() {
    this.analiticasServices.obtenerListadoComprasDiaSemana().then(respuesta => {
      this.responseComprasDiaSemana = respuesta.map((item: any) => item.total_compras);
      const diasSemana = respuesta.map((item: any) => item.dia_semana);
      this.createChart(diasSemana);
    })
  }
  listCompraMesActual() {
    this.analiticasServices.obtenerListadoComprasMesActual().then(respuesta => {
      this.responseCompraMesActual = respuesta;
      this.ingresoDiario();
    })
  }
  listComprasMesSemana() {
    this.analiticasServices.obtenerListadoTotalComprasMesSemana().then(respuesta => {
      this.responseComprasMesSemana = respuesta;

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

  createChart(labels: string[]) {
    Chart.defaults.color = '#F8F8F2';
    this.chart = new Chart("MyChart", {
      type: 'line', //this denotes tha type of chart
      data: {
        labels: ['Lunes', 'Martes', 'Miercoles', 'Jueves',
          'Viernes', 'Sabado', 'Domingo'],
          
        datasets: [{
          label: 'Compras por dia de esta semana',
          data: this.responseComprasDiaSemana,
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
  ingresoDiario() {
    Chart.defaults.color = '#F8F8F2';
    this.chart = new Chart("ingresoDiario", {
      type: 'line', //this denotes tha type of chart
      data: {
        labels: ['Lunes', 'Martes', 'Miercoles', 'Jueves',
          'Viernes', 'Sabado', 'Domingo'],
          
        datasets: [{
          label: 'Facturacion por dia de esta semana',
          data: this.responseComprasDiaSemana,
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
}
