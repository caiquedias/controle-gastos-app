import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Gasto } from '../gastos/gasto';
import { GastoService } from '../gastos/gasto.service';

export interface GastoDialogData {
  gasto: Gasto | null;
  isEdit: boolean;
}
enum FonteGastoEnum {
  DespesaParental = 'Despesa Parental',
  DespesaPropria = 'Despesa Própria'
}

@Component({
  selector: 'app-gasto-dialog',
  templateUrl: './gasto-dialog.component.html',
  styleUrls: ['./gasto-dialog.component.scss']
})
export class GastoDialogComponent implements OnInit {
  gastoForm: FormGroup;
  isEdit: boolean;
  availableOptions = [FonteGastoEnum.DespesaParental, FonteGastoEnum.DespesaPropria];
  selected = FonteGastoEnum.DespesaPropria;

  constructor(
    public dialogRef: MatDialogRef<GastoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GastoDialogData,
    private fb: FormBuilder,
    private gastoService: GastoService
  ) {
    this.isEdit = data.isEdit;

    // Inicializa o formulário com os dados do gasto (ou valores padrão para criação)
    this.gastoForm = this.fb.group({
      id: [data.gasto ? data.gasto.id : null],
      fonte: [data.gasto ? data.gasto.fonte : '', Validators.required],
      divida: [data.gasto ? data.gasto.divida : '', Validators.required],
      valor: [data.gasto ? data.gasto.valor : 0, [Validators.required, Validators.min(0)]],
      quinzena: [data.gasto ? data.gasto.quinzena : 1, [Validators.required, Validators.min(1)]],
      pago: [data.gasto ? data.gasto.pago : false, Validators.required]
    });
  }

  ngOnInit(): void {}

  /**
   * Chamada quando o usuário clica em "Salvar".
   * Se estiver em modo edição, atualiza o gasto existente;
   * caso contrário, cria um novo gasto.
   */
  onSave(): void {
    if (this.gastoForm.invalid) {
      return;
    }
    const gastoData = this.gastoForm.value;
    if (this.isEdit && gastoData.id) {
      // Atualização de gasto existente
      this.gastoService.updateGasto(gastoData).subscribe({
        next: (updatedGasto) => {
          this.dialogRef.close(updatedGasto);
        },
        error: (err) => {
          console.error('Erro ao atualizar gasto:', err);
          // Aqui você pode exibir uma mensagem de erro para o usuário
        }
      });
    } else {
      // Criação de novo gasto
      this.gastoService.createGasto(gastoData).subscribe({
        next: (newGasto) => {
          this.dialogRef.close(newGasto);
        },
        error: (err) => {
          console.error('Erro ao criar gasto:', err);
          // Aqui você pode exibir uma mensagem de erro para o usuário
        }
      });
    }
  }

  /**
   * Chamada quando o usuário clica em "Excluir".
   * Apenas disponível no modo de edição.
   */
  onDelete(): void {
    if (!this.isEdit || !this.gastoForm.value.id) {
      return;
    }
    if (confirm('Tem certeza que deseja excluir este gasto?')) {
      const id = this.gastoForm.value.id;
      this.gastoService.deleteGasto(id).subscribe({
        next: () => {
          // Envia um objeto indicando que o gasto foi excluído
          this.dialogRef.close({ deleted: true });
        },
        error: (err) => {
          console.error('Erro ao excluir gasto:', err);
          // Aqui você pode exibir uma mensagem de erro para o usuário
        }
      });
    }
  }

  /**
   * Fecha o diálogo sem realizar nenhuma operação.
   */
  onCancel(): void {
    this.dialogRef.close();
  }

  getOptionLabel(option: FonteGastoEnum): string {
    switch (option) {
      case FonteGastoEnum.DespesaParental:
        return "Despesa Parental";
      case FonteGastoEnum.DespesaPropria:
        return "Despesa Própria";
      default:
        throw new Error("Unsupported option");
    }
  }
}
