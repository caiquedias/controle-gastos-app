import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <h1>Controle de Gastos</h1>
  <app-gastos></app-gastos>
  <app-pie-chart></app-pie-chart>
  `,
  styles: []
})
export class AppComponent {
  title = 'controle-gastos-app';
}
