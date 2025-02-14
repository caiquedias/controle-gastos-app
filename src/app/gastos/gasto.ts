export interface Gasto {
    id: number;
    fonte: string;
    divida: string;
    valor: number;
    quinzena: number;
    pago: boolean;
    valorPrimeiraQuinzena: number;
    valorSegundaQuinzena: number;
    valorDevedor: number;
  }