import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Gasto } from './gasto';
import { GastoService } from './gasto.service';
import { GastoDialogComponent } from '../gasto-dialog/gasto-dialog.component';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.scss']
})
export class GastosComponent implements OnInit {
  gastos: Gasto[] = [];
  displayedColumns: string[] = ['fonte', 'divida', 'valor', 'pago', 'acoes'];

  constructor(private gastoService: GastoService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadGastos();
  }

  loadGastos(): void {
    this.gastoService.getGastos().subscribe(
      data => this.gastos = data,
      error => console.error(error)
    );
  }

  openGastoDialog(gasto?: Gasto, isEdit: boolean = true): void {
    const dialogRef = this.dialog.open(GastoDialogComponent, {
      width: '500px',
      data: { gasto: gasto, isEdit: isEdit }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Se for edição ou adição, chame o serviço correspondente
        if (gasto) {
          // Atualização
          this.gastoService.updateGasto(result).subscribe(() => this.loadGastos());
        } else {
          // Criação
          result.id = 0;
          this.gastoService.createGasto(result).subscribe(() => this.loadGastos());
        }
      }
    });
  }

  deleteGasto(id: number): void {
    this.gastoService.deleteGasto(id).subscribe(() => this.loadGastos());
  }
}
