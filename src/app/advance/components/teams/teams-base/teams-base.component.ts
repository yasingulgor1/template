import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/advance/Service/app.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-teams-base',
  templateUrl: './teams-base.component.html',
  styleUrls: ['./teams-base.component.css']
})
export class TeamsBaseComponent implements OnInit {
  public profile: any = null;
  constructor(
    public http: HttpClient,
    public appService: AppService,
  ) { }

  ngOnInit() {
  }

  async doIfTeams(func: (context?: microsoftTeams.Context) => void | Promise<void>) {
    let context = await this.appService.getTeamsContextAsync();
    console.log("doIfTeams - context", context);
    if (context) {
      await func(context);
    }
    else {
      this.redirectToBase();
    }
  }
  redirectToBase() {
    window.location.href = environment.baseUri;
  }

}

