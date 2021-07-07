import { Component, OnInit } from '@angular/core';
import { TeamsBaseComponent } from '../teams-base/teams-base.component';
import * as adal from 'adal-angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-teams-silent-start',
  templateUrl: './teams-silent-start.component.html',
  styleUrls: ['./teams-silent-start.component.css']
})
export class TeamsSilentStartComponent extends TeamsBaseComponent {

  ngOnInit() {
    this.login();
  }

  login() {
    this.doIfTeams(context => {
      let config: adal.Options = {
        clientId: environment.TeamsClientId,
        redirectUri: window.location.origin + "/teams/auth/silent-end",       // This should be in the list of redirect uris for the AAD app
        cacheLocation: "localStorage",
        navigateToLoginRequestUrl: false,
      };
      // Setup extra query parameters for ADAL
      // - openid and profile scope adds profile information to the id_token
      // - login_hint provides the expected user name
      if (context.loginHint) {
        config.extraQueryParameter = "scope=openid+profile&login_hint=" + encodeURIComponent(context.loginHint);
      } else {
        config.extraQueryParameter = "scope=openid+profile";
      }

      // Use a custom displayCall function to add extra query parameters to the url before navigating to it
      config.displayCall = function (urlNavigate) {
        if (urlNavigate) {
          if (config.extraQueryParameter) {
            urlNavigate += "&" + config.extraQueryParameter;
          }
          window.location.replace(urlNavigate);
        }
      }
      // Navigate to the AzureAD login page
      let authContext = new adal(config);
      authContext.login();

    });
  }
}
