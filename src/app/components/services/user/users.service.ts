import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { OAuthService } from 'angular-oauth2-oidc';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from '../../model/UserModel';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
   
  constructor(private oauthService: OAuthService, private httpClient: HttpClient) { }

  getAllUsers():Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/users`, {
      headers: {
        'Authorization': `Bearer ${this.oauthService.getAccessToken()}`,
        //'Access-Control-Allow-Origin': '*',
      }
    });
  }

  getAllUsersForSucursal():Observable<any> {
    
    /*
    const payload: any = jwtDecode(this.oauthService.getAccessToken());
    var sucursalId='0';
    this.getUser(payload['name']).subscribe((userRes) => {
      
      console.log(userRes[0]);
      sucursalId=userRes[0].sucursal;
    });
    */

    const claims = this.oauthService.getIdentityClaims();
    const sucursalId = claims['sub']||[];

    return this.httpClient.get(`${environment.apiUrl}/users?sucursal=${sucursalId}`, {
      headers: {
        'Authorization': `Bearer ${this.oauthService.getAccessToken()}`,
        //'Access-Control-Allow-Origin': '*',
      }
      
    });

    
  }

  getUser(userName:string):Observable<any>{
    return this.httpClient.get(`${environment.apiUrl}/users?username=${userName}`, {
      headers: {
        'Authorization': `Bearer ${this.oauthService.getAccessToken()}`,
        //'Access-Control-Allow-Origin': '*',
      }
    });
  }

  getUserId(userId:string):Observable<any>{
    return this.httpClient.get(`${environment.apiUrl}/users/${userId}`, {
      headers: {
        'Authorization': `Bearer ${this.oauthService.getAccessToken()}`,
        //'Access-Control-Allow-Origin': '*',
      }
    });
  }

  createUser(user:UserModel):Observable<any>{
    return this.httpClient.post(`${environment.apiUrl}/users`, user,{
      headers: {
        'Authorization': `Bearer ${this.oauthService.getAccessToken()}`,
        //'Access-Control-Allow-Origin': '*',
      }
    });
  }

  createUserRole(userId:string,roles:any):Observable<any>{
    return this.httpClient.post(`${environment.apiUrl}/users/${userId}/role-mappings/realm`,roles,{
      headers: {
        'Authorization': `Bearer ${this.oauthService.getAccessToken()}`,
        //'Access-Control-Allow-Origin': '*',
      }
    });
  }

  updateUserGroup(userId:string,groupId:string):Observable<any>{
    return this.httpClient.put(`${environment.apiUrl}/users/${userId}/groups/${groupId}`,{
      headers: {
        'Authorization': `Bearer ${this.oauthService.getAccessToken()}`,
        //'Access-Control-Allow-Origin': '*',
      }
    });
  }

  updateUser(id:string,user:UserModel):Observable<any>{
    return this.httpClient.put(`${environment.apiUrl}/users/${id}`, user,{
      headers: {
        'Authorization': `Bearer ${this.oauthService.getAccessToken()}`,
        //'Access-Control-Allow-Origin': '*'
        //'responseType': 'text'
      }
    });
  }
  
  deleteUser(id:string):Observable<any>{
    return this.httpClient.delete(`${environment.apiUrl}/users/${id}`,{
      headers: {
        'Authorization': `Bearer ${this.oauthService.getAccessToken()}`,
        //'Access-Control-Allow-Origin': '*',
        'responseType': 'text'
      }
    });
  }

  getMyGroup():Observable<any> {
    const claims = this.oauthService.getIdentityClaims();
    const sub = claims['sub']||[];
    return this.httpClient.get(`${environment.apiUrl}/users/${sub}/groups`, {
      headers: {
        'Authorization': `Bearer ${this.oauthService.getAccessToken()}`,
        //'Access-Control-Allow-Origin': '*',
      }
    });
  }

}
