import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IspdnClass, GisClass, AsutpClass, KiiClass, Consequence } from '@app/models';
import { environment } from '@env/environment';
import { PaginatedResponse } from '@shared/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsequencesService {
  private readonly api: string = `${environment.api}/systems/classes`;

  constructor(
    private http: HttpClient
  ) { }

  getConsequences(): Observable<Consequence[]> {
    return this.http.get<Consequence[]>(`${environment.api}/negative-consequences/`);
  }

  getIspdnConsequences(params: any): Observable<PaginatedResponse<IspdnClass>> {
    return this.http.get<PaginatedResponse<IspdnClass>>(`${this.api}/ispdn/negative_consequences/`, { params });
  }

  getGisConsequences(params: any): Observable<PaginatedResponse<GisClass>> {
    return this.http.get<PaginatedResponse<GisClass>>(`${this.api}/gis/negative_consequences/`, { params });
  }

  getAsutpConsequences(params: any): Observable<PaginatedResponse<AsutpClass>> {
    return this.http.get<PaginatedResponse<AsutpClass>>(`${this.api}/asutp/negative_consequences/`, { params });
  }

  getKiiConsequences(params: any): Observable<PaginatedResponse<KiiClass>> {
    return this.http.get<PaginatedResponse<KiiClass>>(`${this.api}/kii/negative_consequences/`, { params });
  }

}
