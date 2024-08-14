import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IContaCorrente} from "@app/shared";
import {Observable} from "rxjs";

export interface IContaCorrenteRequestParams {
  numero: string;
  saldo: number;
  agenciaId: bigint;
  clienteId: bigint;
}

@Injectable({
  providedIn: 'root'
})
export class ContacorrenteService {

  private endpoint: string;

  constructor(
    private http: HttpClient
  ) {
    this.endpoint = `api/contas`;
  }

  addConta(params: any): Observable<IContaCorrente> {
    return this.http.post<IContaCorrente>(this.endpoint, params);
  }

  getContaById(id: bigint): Observable<IContaCorrente> {
    return this.http.get<IContaCorrente>(`${this.endpoint}/${id}`);
  }

  getContas(): Observable<IContaCorrente[]> {
    return this.http.get<IContaCorrente[]>(this.endpoint);
  }

  updateContas(id: number, params: IContaCorrente): Observable<IContaCorrente> {
    return this.http.put<IContaCorrente>(`${this.endpoint}/${id}`, params);
  }

  deleteContas(id: number): Observable<IContaCorrente> {
    return this.http.delete<IContaCorrente>(`${this.endpoint}/${id}`);
  }
}
