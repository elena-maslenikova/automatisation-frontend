import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Asset, AssetType } from '@app/models';
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
    return this.http.get<PaginatedResponse<AssetType>>(`${environment.api}/assets-types/`);
  }

  getAssets(asset_type__in?: string, requestUrl?: string): Observable<PaginatedResponse<Asset>> {
    let params: { asset_type__in?: string } = {};
    asset_type__in ? params.asset_type__in = asset_type__in : null;

    return this.http.get<PaginatedResponse<Asset>>(requestUrl || `${environment.api}/assets/`,
      { params: !requestUrl ? params : null });
  }
}
