import { Component, OnInit } from '@angular/core';
import * as microsoftTeams from '@microsoft/teams-js'

//Helpers
import { DefaultsHelper } from '../../../shared/helpers/defaults.helper'

//Models
import { SuiteService } from '../../../api/models/suite.service';
import { Menu } from '../../../core/models/menu'
import { Me } from '../../../api/models/me'

//Enums
import { RouteType } from '../../../core/enums/route.type'
import { IconType } from '../../../core/enums/icon.type'

//Repositories
import { SuiteServiceRepository } from '../../../api/repositories/services.repository'
import { MeRepository } from '../../../api/repositories/me.repository'

//Services
import { UserService } from '../../../shared/services/user.service'
import { LoadingService } from '../../../shared/services/loading.service'
import { TranslateService } from '../../../shared/translation/translate.service'
import { PeakAuthHelper } from 'src/app/auth/helper/peak.auth.helper';
import PeakAuthMeModel from 'peakauth/lib/models/PeakAuthMeModel';
import { TokenHelper } from 'src/app/auth/helper/token.helper';
import { PeakSidebarGroupService } from 'peak-angular';
import { environment } from 'src/environments/environment';
import { AppService } from 'src/app/advance/Service/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  menu: Menu
  appType: string;
  loadingContext: any = {
    show: false,
    message: ''
  }

  isMenu: boolean = true;


  public simpleNotificationsOptions = {
    positions: ["bottom", "left"],
    timeOut: 3000,
    lastOnBottom: true,
    showProgressBar: false,
    pauseOnHover: false,
    clickToClose: true
  }

  constructor(private defaultsHelper: DefaultsHelper,
    private tokenHelper: TokenHelper,
    private peakAuthHelper: PeakAuthHelper,
    private suiteServiceRepository: SuiteServiceRepository,
    private userService: UserService,
    private loadingService: LoadingService,
    private meRepository: MeRepository,
    private translationService: TranslateService,
    public groups: PeakSidebarGroupService,
    public appService: AppService) { }

  ngOnInit() {
    if (this.tokenHelper.getToken()) {
      this.subscribeLoading();
      this.getUser();
    }
    this.appType = this.appService.type.value;
    //this.groups.app.add("Raporlar", 'Font', 'fa fa-chart-line', 'Internal', '/report');
  }

  async isTeamsAsync(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      let r = false;
      microsoftTeams.initialize();
      microsoftTeams.getContext((context: microsoftTeams.Context) => { r = true; this.isMenu = false; });
      setTimeout(() => resolve(r), 2000);
    });
  }

  private subscribeLoading() {
    this.loadingService.subscribeLoading().subscribe((loadingContext: any) => {
      this.loadingContext.show = loadingContext.show;
      this.loadingContext.message = loadingContext.message
    })
  }
  private getUser() {
    this.loadingService.setLoading(true, this.translationService.instant('loadingMessages:suiteLoading'))
    this.meRepository.get().subscribe((me: Me) => {

      if (me != undefined) {
        this.loadingService.setLoading(false, '')
        this.tokenHelper.setMe(me.user);
        this.userService.updateCurrentUser(me.user)
      }
    })
  }

  isTeams() {
    var isTeams = this.appService.type.value == "Teams";
    return isTeams;
  }

}
