import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {IContaCorrente, IExtrato} from "@app/shared";
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

  deleteContas(id: number): Observable<any> {
    return this.http.delete<any>(`${this.endpoint}/${id}`);
  }

  depositar(id: number, valor: number): Observable<any> {
    return this.http.post<any>(`${this.endpoint}/${id}/deposito`, valor)
  }

  sacar(id: number, valor: number): Observable<any> {
    return this.http.post<any>(`${this.endpoint}/${id}/saque`, valor)
  }

  transferir(idOrigem: number, idDestino: number, valor:number): Observable<any> {
    return this.http.post<any>(`${this.endpoint}/${idOrigem}/transferencia/${idDestino}`, valor)
  }

  recalcularSaldo(id: number): Observable<number> {
    return this.http.get<number>(`${this.endpoint}/${id}/recalculo-saldo`)
  }

  exibirExtratos(id: number): Observable<IExtrato[]> {
    return this.http.get<IExtrato[]>(`${this.endpoint}/${id}/extrato`)
  }

}
