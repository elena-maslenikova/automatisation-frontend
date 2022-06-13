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
  private readonly api: string = `${environment.api}/systems/classes`

  constructor(
    private http: HttpClient
  ) { }

  getClassesIspdn(params: any): Observable<PaginatedResponse<IspdnClass>> {
    return this.http.get<PaginatedResponse<IspdnClass>>(`${this.api}/ispdn`, { params });
  }

  getIspdnConsequences(params: any): Observable<PaginatedResponse<IspdnClass>> {
    return this.http.get<PaginatedResponse<IspdnClass>>(`${this.api}/ispdn/negative_consequences`, { params });
  }

  getClassesGis(params: any): Observable<PaginatedResponse<GisClass>> {
    return this.http.get<PaginatedResponse<GisClass>>(`${this.api}/gis`, { params });
  }

  getGisConsequences(params: any): Observable<PaginatedResponse<GisClass>> {
    return this.http.get<PaginatedResponse<GisClass>>(`${this.api}/gis/negative_consequences`, { params });
  }

  getClassesAsutp(params: any): Observable<PaginatedResponse<AsutpClass>> {
    return this.http.get<PaginatedResponse<AsutpClass>>(`${this.api}/asutp`, { params });
  }

  getAsutpConsequences(params: any): Observable<PaginatedResponse<AsutpClass>> {
    return this.http.get<PaginatedResponse<AsutpClass>>(`${this.api}/asutp/negative_consequences`, { params });
  }

  getClassesKii(params: any): Observable<PaginatedResponse<KiiClass>> {
    return this.http.get<PaginatedResponse<KiiClass>>(`${this.api}/kii`, { params });
  }

  getKiiConsequences(params: any): Observable<PaginatedResponse<KiiClass>> {
    return this.http.get<PaginatedResponse<KiiClass>>(`${this.api}/kii/negative_consequences`, { params });
  }
}
