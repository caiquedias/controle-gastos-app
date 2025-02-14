import { Component, OnInit } from '@angular/core';
import { Gasto } from './gasto';
import { GastoService } from './gasto.service';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrl: './gastos.component.sass'
})
export class GastosComponent implements OnInit {
  gastos: Gasto[] = [];

  constructor(private gastoService: GastoService) { }

  ngOnInit(): void {
    this.loadGastos();
  }

  loadGastos(): void {
    this.gastoService.getGastos().subscribe(
      (data: any) => this.gastos = data,
      (error: any) => console.error(error)
    );
  }
}
