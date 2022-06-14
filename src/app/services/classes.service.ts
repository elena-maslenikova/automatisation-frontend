import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AsutpClass, GisClass, IspdnClass, KiiClass } from '@app/models';
import { environment } from '@env/environment';
import { PaginatedResponse } from '@shared/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {
  private readonly api: string = `${environment.api}/systems/classes`;

  constructor(
    private http: HttpClient
  ) { }

  getClassesIspdn(params: any): Observable<PaginatedResponse<IspdnClass>> {
    return this.http.get<PaginatedResponse<IspdnClass>>(`${this.api}/ispdn`, { params });
  }
  getClassesGis(params: any): Observable<PaginatedResponse<GisClass>> {
    return this.http.get<PaginatedResponse<GisClass>>(`${this.api}/gis`, { params });
  }

  getClassesAsutp(params: any): Observable<PaginatedResponse<AsutpClass>> {
    return this.http.get<PaginatedResponse<AsutpClass>>(`${this.api}/asutp`, { params });
  }

  getClassesKii(params: any): Observable<PaginatedResponse<KiiClass>> {
    return this.http.get<PaginatedResponse<KiiClass>>(`${this.api}/kii`, { params });
  }
}
