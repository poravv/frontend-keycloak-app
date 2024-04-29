export const environment = {
    production: false,
    apiUrl: 'http://localhost:8080',
    keycloakConfig: {
        clientId:"client-spring-boot",
        issuer: 'http://localhost:5001/realms/realm-spring-boot-dev',
        tokenEndpoint: 'http://localhost:5001/realms/realm-spring-boot-dev/protocol/openid-connect/token',        
        responseType: 'code',
        scope: 'openid profile',
        showDebugInformation: true,
    }
  };
