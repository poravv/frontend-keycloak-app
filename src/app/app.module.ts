import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { APP_INITIALIZER } from '@angular/core';
import { AuthConfig, OAuthService, provideOAuthClient } from 'angular-oauth2-oidc';
import { provideHttpClient } from '@angular/common/http';
import { environment } from './environments/environments';
import { HomeComponent } from './components/pages/home/home.component';
import { UsersComponent } from './components/pages/users/users.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ModelComponent } from './components/shared/ui/model/model.component';
import { UserFormComponent } from './components/forms/user-form/user-form.component';
import { ProjectsComponent } from './components/pages/projects/projects.component';

export const authCodeFlowConfig: AuthConfig = {
  issuer: environment.keycloakConfig.issuer,
  tokenEndpoint: environment.keycloakConfig.tokenEndpoint,
  redirectUri: window.location.origin,
  clientId: environment.keycloakConfig.clientId,
  responseType: environment.keycloakConfig.responseType,
  scope: environment.keycloakConfig.scope,
  showDebugInformation: environment.keycloakConfig.showDebugInformation,
  
};


function initializeOAuth(oauthService: OAuthService): Promise<void> {
  return new Promise((resolve) => {
    oauthService.configure(authCodeFlowConfig);
    oauthService.setupAutomaticSilentRefresh();
    oauthService.loadDiscoveryDocumentAndLogin()
      .then(() => resolve());
  });
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsersComponent,
    UserFormComponent,
    ProjectsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule, 
    RouterOutlet,
    RouterLink,
    ReactiveFormsModule,
    ModelComponent,
    CommonModule,
    ToastrModule.forRoot({
      //positionClass: 'toast-top-full-width'
      timeOut: 5000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
  ],
  providers: [
    provideHttpClient(),
    provideOAuthClient(),
    provideAnimations(),
    {
      provide: APP_INITIALIZER,
      useFactory: (oauthService: OAuthService) => {
        return () => {
          initializeOAuth(oauthService);
        }
      },
      multi: true,
      deps: [
        OAuthService
      ]
    }
  ],
  bootstrap: [AppComponent],
})

export class AppModule { }
