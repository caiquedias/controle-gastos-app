import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Gasto } from './gasto';

@Injectable({
  providedIn: 'root'
})
export class GastoService {
  private apiUrl = 'https://localhost:7130/api/gasto';
  stackMethod = 'NoS method called';

  constructor(private http: HttpClient) { }

  getGastos(): Observable<Gasto[]> {
    this.stackMethod = 'getGastos()';
    return this.http.get<Gasto[]>(this.apiUrl)
      .pipe(
        map(data => data || []),
        catchError(this.handleError)
      );
  }

  getGastoById(id: number): Observable<Gasto> {
    this.stackMethod = 'getGastoById(id: number)';
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Gasto>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  createGasto(gasto: Gasto): Observable<Gasto> {
    this.stackMethod = 'createGasto(gasto: Gasto)';
    return this.http.post<Gasto>(this.apiUrl, gasto)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateGasto(gasto: Gasto): Observable<Gasto> {
    this.stackMethod = 'updateGasto(gasto: Gasto)';
    const url = `${this.apiUrl}/${gasto.id}`;
    return this.http.put<Gasto>(url, gasto)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteGasto(id: number): Observable<void> {
    this.stackMethod = 'deleteGasto(id: number)';
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    // Erro retornado pelo servidor
    console.log(error.error);
    console.error(
      `Backend retornou o código ${error.status}, ` +
      `corpo da resposta: ${error.error as any}, ` +
      `mensagem de erro: ${error.message}, ` +
      `URL: ${error.url}, ` +
      `Método: ${this.stackMethod}`);
    
    // Retorna um observable com mensagem de erro
    return throwError(() => new Error('Algo deu errado; tente novamente mais tarde.'));
  }
}