import { Component, OnInit } from '@angular/core';
import { GastoService } from '../gastos/gasto.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.sass'
})
export class PieChartComponent implements OnInit {
  public single: any[] = [];
  public view: any[] = [700, 400];

  // Opções para o ngx-charts
  public showLegend: boolean = true;
  public gradient: boolean = false;
  public showLabels: boolean = true;
  public isDoughnut: boolean = false;

  constructor(private gastoService: GastoService) {}

  ngOnInit(): void {
    this.loadChartData();
  }

  loadChartData(): void {
    // Aqui você pode agregar os dados dos gastos por categoria.
    // Exemplo com dados estáticos:
    this.single = [
      { "name": "Despesa Parental", "value": 1000 },
      { "name": "Despesa Própria", "value": 2000 },
      { "name": "Outros", "value": 500 }
    ];
  }

  onSelect(event: any): void {
    console.log(event);
  }
}
