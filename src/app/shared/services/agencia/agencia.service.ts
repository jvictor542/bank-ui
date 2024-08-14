import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {IAgencia} from '@app/shared'

@Injectable({
  providedIn: 'root'
})
export class AgenciaService {

  private endpoint: string;

  constructor(
    private http: HttpClient
  ) {
    this.endpoint = `api/agencias`;
  }

  addAgencia(params: any): Observable<IAgencia> {
    return this.http.post<IAgencia>(this.endpoint, params);
  }

  getAgenciaById(id: number): Observable<IAgencia> {
    return this.http.get<IAgencia>(`${this.endpoint}/${id}`);
  }

  getAgencias(): Observable<IAgencia[]> {
    console.log(this.endpoint)
    return this.http.get<IAgencia[]>(this.endpoint);
  }

  updateAgencia(id: number, params: any): Observable<IAgencia> {
    return this.http.put<IAgencia>(`${this.endpoint}/${id}`, params);
  }

  deleteAgencia(id: number): Observable<IAgencia> {
    return this.http.delete<IAgencia>(`${this.endpoint}/${id}`);
  }
}
