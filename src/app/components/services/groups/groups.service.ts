import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  constructor(private oauthService: OAuthService, private httpClient: HttpClient) { }

  getGroupMembers(groupId:string):Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/groups/${groupId}/members`, {
      headers: {
        'Authorization': `Bearer ${this.oauthService.getAccessToken()}`,
        //'Access-Control-Allow-Origin': '*',
      }
    });
  }

  getGroups():Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/groups`, {
      headers: {
        'Authorization': `Bearer ${this.oauthService.getAccessToken()}`,
        //'Access-Control-Allow-Origin': '*',
      }
    });
  }

}
