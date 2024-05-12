import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})

export class RolesService {

  constructor(private oauthService: OAuthService, private httpClient: HttpClient) { }

  getRoles():Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/roles`, {
      headers: {
        'Authorization': `Bearer ${this.oauthService.getAccessToken()}`,
        //'Access-Control-Allow-Origin': '*',
      }
    });
  }

  createRole(groupId:string):Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/groups/${groupId}/members`, {
      headers: {
        'Authorization': `Bearer ${this.oauthService.getAccessToken()}`,
        //'Access-Control-Allow-Origin': '*',
      }
    });
  }
}
