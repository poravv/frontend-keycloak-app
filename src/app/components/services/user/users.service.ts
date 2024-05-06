import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { OAuthService } from 'angular-oauth2-oidc';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, IUser } from '../../model/User';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
   
  constructor(private oauthService: OAuthService, private httpClient: HttpClient) { }

  getAllUsers():Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/keycloak/user/search`, {
      headers: {
        'Authorization': `Bearer ${this.oauthService.getAccessToken()}`,
        'Access-Control-Allow-Origin': '*',
      }
    });
  }

  getUser(userName:string):Observable<ApiResponse<IUser>>{
    return this.httpClient.get(`${environment.apiUrl}/keycloak/user/search/${userName}`, {
      headers: {
        'Authorization': `Bearer ${this.oauthService.getAccessToken()}`,
        'Access-Control-Allow-Origin': '*',
      }
    });
  }

  createUser(user:IUser):Observable<any>{
    return this.httpClient.post(`${environment.apiUrl}/keycloak/user/create`, user,{
      headers: {
        'Authorization': `Bearer ${this.oauthService.getAccessToken()}`,
        'Access-Control-Allow-Origin': '*',
      }
    });
  }

  updateUser(id:string,user:IUser):Observable<any>{
    return this.httpClient.put(`${environment.apiUrl}/keycloak/user/update/${id}`, user,{
      headers: {
        'Authorization': `Bearer ${this.oauthService.getAccessToken()}`,
        'Access-Control-Allow-Origin': '*',
        'responseType': 'text'
      }
    });
  }
  
  deleteUser(id:string):Observable<any>{
    return this.httpClient.delete(`${environment.apiUrl}/keycloak/user/delete/${id}`,{
      headers: {
        'Authorization': `Bearer ${this.oauthService.getAccessToken()}`,
        'Access-Control-Allow-Origin': '*',
        'responseType': 'text'
      }
    });
  }
}
