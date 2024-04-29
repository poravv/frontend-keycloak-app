import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend-keycloak-app';
  helloText = '';

  constructor(private oauthService: OAuthService, private httpClient: HttpClient) { }

  logout() {
    this.oauthService.logOut();
  }

  getHelloText() {
    this.httpClient.get<{ message: string }>('http://localhost:8080/hello-1', {
      headers: {
        'Authorization': `Bearer ${this.oauthService.getAccessToken()}`,
        "Access-Control-Allow-Origin": "*"
      }
    }).subscribe(result => {
      
      console.log(result);

      this.helloText = result.message;
    });
  }

  getMyToken(){
    return this.oauthService.getAccessToken();
  }
}
