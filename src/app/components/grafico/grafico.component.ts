import { Component, AfterViewInit, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-grafico',
  standalone: true,
  template: `
    <div class="chart-container">
      <canvas #myChart></canvas>
    </div>
  `,
  styles: [`
    .chart-container {
      width: 100%;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
  `]
})
export class GraficoComponent implements AfterViewInit, OnDestroy {
  @ViewChild('myChart') myChart!: ElementRef<HTMLCanvasElement>;
  private chart: Chart | undefined;

  ngAfterViewInit() {
    const ctx = this.myChart.nativeElement.getContext('2d');
    if (ctx) {
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
          datasets: [{
            label: 'Personas reservadas por día',
            data: [10, 15, 12, 18, 20, 25, 22],
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)',
              'rgba(255, 99, 132, 0.5)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Reservas Totales por Día de la Semana'
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Cantidad de personas'
              }
            },
            x: {
              title: {
                display: true,
                text: 'Día de la semana'
              }
            }
          }
        }
      });
    }
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}
