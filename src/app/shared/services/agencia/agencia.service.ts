import { Injectable } from '@angular/core';
import {EnvironmentService} from "@shared/services/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {IAgencia} from '@app/shared'

@Injectable({
  providedIn: 'root'
})
export class AgenciaService {

  private endpoint: string;

  constructor(
    private http: HttpClient,
    private environment: EnvironmentService,
  ) {
    this.endpoint = `api/agencias`;
  }

  addAgencia(params: IAgencia): Observable<IAgencia> {
    return this.http.post<IAgencia>(this.endpoint, params);
  }

  getAgenciaById(id: bigint): Observable<IAgencia> {
    return this.http.get<IAgencia>(`${this.endpoint}/${id}`);
  }

  getAgencias(): Observable<IAgencia[]> {
    console.log(this.endpoint)
    return this.http.get<IAgencia[]>(this.endpoint);
  }

  updateAgrupe(id: bigint, params: IAgencia): Observable<IAgencia> {
    return this.http.put<IAgencia>(`${this.endpoint}/${id}`, params);
  }

  deleteAgencia(id: bigint): Observable<IAgencia> {
    return this.http.delete<IAgencia>(`${this.endpoint}/${id}`);
  }
}
