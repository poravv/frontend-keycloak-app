import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { HttpClient } from '@angular/common/http';
import { GroupsService } from './components/services/groups/groups.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'frontend-keycloak-app';
  myGroup = '';
  helloText = '';


  constructor(private oauthService: OAuthService, private httpClient: HttpClient,private groupsService: GroupsService ) { }

  logout() {
    this.oauthService.logOut();
  }

  ngOnInit(): void {
    this.getMyUser();
  }

  getMyUser(){
    this.groupsService.getMyGroup().subscribe(resultado=>{
      console.log(resultado[0].name);
      this.myGroup=resultado[0].name;
    });
  }

  getHelloText() {
    this.httpClient.get<{ message: string }>('http://localhost:8080/hello-1', {
      headers: {
        'Authorization': `Bearer ${this.oauthService.getAccessToken()}`,
        "Access-Control-Allow-Origin": "*"
      }
    }).subscribe(result => {
      //console.log(result);
      this.helloText = result.message;
    });
  }
}
