import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {EnvironmentService, IContaCorrente, IContaCorrenteRequestParams, IExtrato} from "@app/shared";
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class ExtratoService {

  private endpoint: string;

  constructor(
    private http: HttpClient,
    private environment: EnvironmentService
  ) {
    this.endpoint = `${this.environment.apiUrl}/extratos`;
  }

  addExtrato(params: IExtrato): Observable<IExtrato> {
    return this.http.post<IExtrato>(this.endpoint, params);
  }

  getExtratoById(id: bigint): Observable<IExtrato> {
    return this.http.get<IExtrato>(`${this.endpoint}/${id}`);
  }

  getExtratos(): Observable<IExtrato[]> {
    return this.http.get<IExtrato[]>(this.endpoint);
  }

  getExtratosByContaCorrenteId(id: bigint): Observable<IExtrato> {
    return this.http.get<IExtrato>(`${this.endpoint}/${id}`);
  }

  deleteExtrato(id: bigint): Observable<IExtrato> {
    return this.http.delete<IExtrato>(`${this.endpoint}/${id}`);
  }
}
