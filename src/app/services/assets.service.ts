import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AssetType } from '@app/models';
import { environment } from '@env/environment';
import { PaginatedResponse } from '@shared/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssetsService {

  constructor(
    private http: HttpClient
  ) { }

  getAssetTypes(): Observable<PaginatedResponse<AssetType>> {
    return this.http.get<PaginatedResponse<AssetType>>(`${environment.api}/assets-types`);
  }
}
