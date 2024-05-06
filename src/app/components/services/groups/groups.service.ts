import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor(private oauthService: OAuthService, private httpClient: HttpClient) { }

  getGroups(userId:string):Observable<any> {
    //console.log(this.oauthService.getAccessToken());
    //console.log(this.oauthService.getIdentityClaims());
    //const claims = this.oauthService.getIdentityClaims()
    //const sub = claims['sub']||[];
    //console.log(sub);
    return this.httpClient.get(`${environment.apiUrl}/keycloak/user/groups/${userId}`, {
      headers: {
        'Authorization': `Bearer ${this.oauthService.getAccessToken()}`,
      }
    });
  }

  getMyGroup():Observable<any> {
    const claims = this.oauthService.getIdentityClaims();
    const sub = claims['sub']||[];
    return this.httpClient.get(`${environment.apiUrl}/keycloak/user/groups/${sub}`, {
      headers: {
        'Authorization': `Bearer ${this.oauthService.getAccessToken()}`,
      }
    });
  }
}
