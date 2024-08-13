import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EnvironmentService} from "@shared/services/environment";
import {ICliente} from "@app/shared";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private endpoint: string;

  constructor(
    private http: HttpClient,
    private environment: EnvironmentService
  ) {
    this.endpoint = `${this.environment.apiUrl}/clientes`;
  }

  addCliente(params: ICliente): Observable<ICliente> {
    return this.http.post<ICliente>(this.endpoint, params);
  }

  getClienteById(id: bigint): Observable<ICliente> {
    return this.http.get<ICliente>(`${this.endpoint}/${id}`);
  }

  getClientes(): Observable<ICliente[]> {
    return this.http.get<ICliente[]>(this.endpoint);
  }

  updateClientes(id: bigint, params: ICliente): Observable<ICliente> {
    return this.http.put<ICliente>(`${this.endpoint}/${id}`, params);
  }

  deleteCliente(id: bigint): Observable<ICliente> {
    return this.http.delete<ICliente>(`${this.endpoint}/${id}`);
  }
}
