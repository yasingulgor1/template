import { Component, OnInit } from '@angular/core';
import { Guid } from 'guid-typescript';
import { environment } from 'src/environments/environment';
import { TeamsBaseComponent } from '../teams-base/teams-base.component';
import * as queryString from 'query-string';

@Component({
  selector: 'app-teams-start',
  templateUrl: './teams-start.component.html',
  styleUrls: ['./teams-start.component.css']
})
export class TeamsStartComponent extends TeamsBaseComponent {

  ngOnInit() {
    this.login();
  }

  login() {
    this.doIfTeams(context => {
      console.log('do if teams');
      let state = Guid.create();

      localStorage.setItem("simple.state", state.toString());

      localStorage.removeItem("simple.error");

      let queryParams = {
        client_id: environment.TeamsClientId,
        response_type: "id_token token",
        response_mode: "fragment",
        scope: `${environment.GraphUri}/User.Read openid`,
        redirect_uri: window.location.origin + "/teams/auth/end",
        nonce: Guid.create().toString(),
        state: state,
        login_hint: context.loginHint,
      };
      console.log(queryParams.redirect_uri);

      var authorizeEndpoint = `https://login.microsoftonline.com/${context.tid}/oauth2/v2.0/authorize?${queryString.stringify(queryParams)}`;
      window.location.assign(authorizeEndpoint);
    });
  }

}
