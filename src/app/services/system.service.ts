import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { System, SystemRequest } from '@app/models';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  constructor(
    private httpClient: HttpClient
  ) { }

  createSystem(params: SystemRequest): Observable<System> {
    return this.httpClient.post<System>(`${environment.api}/systems`, { params })
  }

  buildReport(id: number): Observable<any> {
    return this.httpClient.get(`${environment.api}/systems/${id}/build_report`);
  }
}
