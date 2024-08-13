import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EnvironmentService} from "@shared/services/environment";
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
    private http: HttpClient,
    private environment: EnvironmentService
  ) {
    this.endpoint = `${this.environment.apiUrl}/contas`;
  }

  addConta(params: IContaCorrenteRequestParams): Observable<IContaCorrente> {
    return this.http.post<IContaCorrente>(this.endpoint, params);
  }

  getContaById(id: bigint): Observable<IContaCorrente> {
    return this.http.get<IContaCorrente>(`${this.endpoint}/${id}`);
  }

  getContas(): Observable<IContaCorrente[]> {
    return this.http.get<IContaCorrente[]>(this.endpoint);
  }

  updateContas(id: bigint, params: IContaCorrente): Observable<IContaCorrente> {
    return this.http.put<IContaCorrente>(`${this.endpoint}/${id}`, params);
  }

  deleteContas(id: bigint): Observable<IContaCorrente> {
    return this.http.delete<IContaCorrente>(`${this.endpoint}/${id}`);
  }
}
