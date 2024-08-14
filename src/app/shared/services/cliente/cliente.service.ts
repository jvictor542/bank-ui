import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ICliente} from "@app/shared";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private endpoint: string;

  constructor(
    private http: HttpClient
  ) {
    this.endpoint = `api/clientes`;
  }

  addCliente(params: any): Observable<ICliente> {
    return this.http.post<ICliente>(this.endpoint, params);
  }

  getClienteById(id: number): Observable<ICliente> {
    return this.http.get<ICliente>(`${this.endpoint}/${id}`);
  }

  getClientes(): Observable<ICliente[]> {
    return this.http.get<ICliente[]>(this.endpoint);
  }

  updateClientes(id: number, params: any): Observable<ICliente> {
    return this.http.put<ICliente>(`${this.endpoint}/${id}`, params);
  }

  deleteCliente(id: number): Observable<ICliente> {
    return this.http.delete<ICliente>(`${this.endpoint}/${id}`);
  }
}
