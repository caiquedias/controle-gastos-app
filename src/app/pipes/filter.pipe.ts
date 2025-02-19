import { Pipe, PipeTransform } from '@angular/core';
import { Gasto } from '../gastos/gasto';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(gastos: Gasto[], searchTerm: string): Gasto[] {
    if (!gastos || !searchTerm) {
      return gastos;
    }
    const lowerTerm = searchTerm.toLowerCase();
    return gastos.filter(gasto =>
      gasto.fonte.toLowerCase().includes(lowerTerm) ||
      gasto.divida.toLowerCase().includes(lowerTerm)
    );
  }
}
