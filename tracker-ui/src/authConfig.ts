import { Configuration, PopupRequest } from '@azure/msal-browser'

export const msalConfig: Configuration = {
    auth: {
      clientId: "79aff226-24f6-4e8e-907e-e8e4385c3463",
      authority: "https://login.microsoftonline.com/common",
      redirectUri: "/",
      postLogoutRedirectUri: "/"
    },
    cache: {
      cacheLocation: "localStorage", // This configures where your cache will be stored
      storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    }
  };
  
  // Add scopes here for ID token to be used at Microsoft identity platform endpoints.
  export const loginRequest: PopupRequest = {
   scopes: ["User.Read"]
  };
  
  // Add the endpoints here for Microsoft Graph API services you'd like to use.
  export const graphConfig = {
      graphMeEndpoint: "https://graph.microsoft-ppe.com/v1.0/me"
  };