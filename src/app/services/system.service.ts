import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { System, SystemRequest } from '@app/models';
import { environment } from '@env/environment';
import { PaginatedResponse } from '@shared/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getSystems(): Observable<PaginatedResponse<System>> {
    return this.httpClient.get<PaginatedResponse<System>>(`${environment.api}/systems/`);
  }

  createSystem(body: SystemRequest): Observable<System> {
    return this.httpClient.post<System>(`${environment.api}/systems/`, body);
  }

  buildReport(id: number): Observable<Blob> {
    return this.httpClient.get(
      `${environment.api}/systems/${id}/build_report/`,
      { responseType: 'blob' }
    );
  }
}
