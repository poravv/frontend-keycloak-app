import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';
import { UserGroupModel } from '../../model/GroupsModel';

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

  getGroupsForId(groupId:string):Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/groups/${groupId}`, {
      headers: {
        'Authorization': `Bearer ${this.oauthService.getAccessToken()}`,
        //'Access-Control-Allow-Origin': '*',
      }
    });
  }

  createUser(group:UserGroupModel):Observable<any>{
    return this.httpClient.post(`${environment.apiUrl}/groups`, group,{
      headers: {
        'Authorization': `Bearer ${this.oauthService.getAccessToken()}`,
        //'Access-Control-Allow-Origin': '*',
      }
    });
  }

  updateGroup(id:string,group:UserGroupModel):Observable<any>{
    return this.httpClient.put(`${environment.apiUrl}/groups/${id}`, group,{
      headers: {
        'Authorization': `Bearer ${this.oauthService.getAccessToken()}`,
        //'Access-Control-Allow-Origin': '*'
        //'responseType': 'text'
      }
    });
  }
  
  deleteGroup(id:string):Observable<any>{
    return this.httpClient.delete(`${environment.apiUrl}/groups/${id}`,{
      headers: {
        'Authorization': `Bearer ${this.oauthService.getAccessToken()}`,
        //'Access-Control-Allow-Origin': '*',
        //'responseType': 'text'
      }
    });
  }

}
