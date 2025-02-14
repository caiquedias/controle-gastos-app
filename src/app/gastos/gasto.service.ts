import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gasto } from './gasto';

@Injectable({
  providedIn: 'root'
})
export class GastoService {
  private apiUrl = 'https://localhost:5001/api/gasto'; // Ajuste a URL conforme necessário

  constructor(private http: HttpClient) { }

  getGastos(): Observable<Gasto[]> {
    return this.http.get<Gasto[]>(this.apiUrl);
  }
}