import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/advance/Service/app.service';
import { HashHelper } from 'src/app/auth/helper/hash.helper';
import { StateService } from 'src/app/shared/services/state.service';
import { TeamsBaseComponent } from '../teams-base/teams-base.component';

@Component({
  selector: 'app-teams-end',
  templateUrl: './teams-end.component.html',
  styleUrls: ['./teams-end.component.css']
})
export class TeamsEndComponent extends TeamsBaseComponent {

  constructor(
    http: HttpClient,
    appService: AppService,
    private hashHelper: HashHelper,
  ) { super(http, appService); }

  /// https://docs.microsoft.com/en-us/microsoftteams/platform/tabs/how-to/authentication/auth-tab-aad
  ngOnInit() {
    let hashParams = {
      error: this.hashHelper.get("error"),
      access_token: this.hashHelper.get("access_token"),
      state: this.hashHelper.get("state"),
      id_token: this.hashHelper.get("id_token"),
      token_type: this.hashHelper.get("token_type"),
      expires_in: this.hashHelper.get("expires_in"),
    };
    if (hashParams.error) {
      // Authentication/authorization failed
      microsoftTeams.authentication.notifyFailure(hashParams.error);
    } else if (hashParams.access_token) {
      // Get the stored state parameter and compare with incoming state
      // This validates that the data is coming from Azure AD
      let expectedState = localStorage.getItem("simple.state");
      if (expectedState !== hashParams.state) {
        // State does not match, report error
        microsoftTeams.authentication.notifyFailure("StateDoesNotMatch");
      } else {
        // Success: return token information to the tab
        microsoftTeams.authentication.notifySuccess(JSON.stringify({
          idToken: hashParams.id_token,
          accessToken: hashParams.access_token,
          tokenType: hashParams.token_type,
          expiresIn: hashParams.expires_in
        }));
      }
    } else {
      // Unexpected condition: hash does not contain error or access_token parameter
      microsoftTeams.authentication.notifyFailure("UnexpectedFailure");
    }
  }

}
