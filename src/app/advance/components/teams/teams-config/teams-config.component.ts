import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TeamsBaseComponent } from '../teams-base/teams-base.component';

@Component({
  selector: 'app-teams-config',
  templateUrl: './teams-config.component.html',
  styleUrls: ['./teams-config.component.css']
})
export class TeamsConfigComponent extends TeamsBaseComponent {

  ngOnInit() {

    this.doIfTeams(async () => {
      this.profile = await this.getProfile(localStorage.getItem('teams.token'));

      microsoftTeams.settings.registerOnSaveHandler(function (saveEvent) {
        microsoftTeams.settings.setSettings({
          contentUrl: environment.baseUri,
          entityId: environment.baseUri
        });

        saveEvent.notifySuccess();

      });

      microsoftTeams.settings.setValidityState(true);
    });
  }

  getProfile(token) {
    return this.http.get(`${environment.GraphUri}/v1.0/me/`, { headers: new HttpHeaders({ "Authorization": "Bearer " + token }) }).toPromise();
  }

}
