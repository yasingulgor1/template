import { Component, OnInit } from '@angular/core';
import * as adal from 'adal-angular';
import * as microsoftTeams from "@microsoft/teams-js";
import { TeamsBaseComponent } from '../teams-base/teams-base.component';
import { AppService } from 'src/app/advance/Service/app.service';
import { HttpClient } from '@angular/common/http';
import { StateService } from 'src/app/shared/services/state.service';
import { environment } from 'src/environments/environment';
import { QueryStringHelper } from 'src/app/auth/helper/querystring.helper';
@Component({
  selector: 'app-teams-silent-end',
  templateUrl: './teams-silent-end.component.html',
  styleUrls: ['./teams-silent-end.component.css']
})
export class TeamsSilentEndComponent extends TeamsBaseComponent {

  constructor(
    http: HttpClient,
    appService: AppService,
    private queryString: QueryStringHelper,
    private stateService: StateService,
  ) { super(http, appService); }

  /// https://docs.microsoft.com/en-us/microsoftteams/platform/tabs/how-to/authentication/auth-silent-aad
  /// https://github.com/OfficeDev/microsoft-teams-sample-complete-node/blob/master/src/views/tab-auth/silent-end.hbs
  ngOnInit() {
    let config: adal.Options = {
      clientId: environment.TeamsClientId,
      redirectUri: window.location.origin + "/teams/auth/silent-end",       // This should be in the list of redirect uris for the AAD app
      cacheLocation: "localStorage",
      navigateToLoginRequestUrl: false,
    };
    let authContext = new adal(config);

    if (authContext.isCallback(window.location.hash)) {
      authContext.handleWindowCallback(window.location.hash);
      if (window.opener) {
        if (authContext.getCachedUser()) {
          microsoftTeams.authentication.notifySuccess();
        } else {
          microsoftTeams.authentication.notifyFailure(authContext.getLoginError());
        }
      }
    }
  }
}
