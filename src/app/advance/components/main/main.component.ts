import { Component, OnInit } from '@angular/core';
import { ModalHelper } from './../../../shared/helpers/modal.helper';

//services
import { AdvanceService } from './../../Service/advance.service'
import { AdvanceModel } from '../../Models/Model/advance.model';
import { AdvanceViewModel } from '../../Models/RequestViewModel/advance.view.model';
import { UserModel } from './../../Models/Model/user.model'
import { TokenHelper } from 'src/app/auth/helper/token.helper';
import { AppService } from '../../Service/app.service';

@Component({
  selector: 'advance-main',
  templateUrl: 'main.component.html'
})

export class MainComponent implements OnInit {
  constructor(
    private modalHelper: ModalHelper,
    private advanceService: AdvanceService,
    private tokenHelper: TokenHelper,
    private appService: AppService) { }

  selectedAdvance: AdvanceModel;
  isResponsible: boolean = false;
  isMasterAdmin: boolean = false;
  currentUser: UserModel;

  showConsentModal: boolean = true;

  ngOnInit() {
    this.handleConsentModal();
    this.getUSer();
  }

  handleConsentModal() {
    var teamsToken = this.tokenHelper.getTeamsToken();
    if (!teamsToken && this.appService.type.value == "Teams") {
      this.showConsentModal = true;
    } else {
      this.showConsentModal = false;
    }
    this.appService.isTeamsAsync().then((isTeams) => {
      this.showConsentModal = isTeams && !this.tokenHelper.getTeamsToken();
    });
  }

  getUSer() {
    this.advanceService.getUser().subscribe((user: UserModel) => {
      this.currentUser = user;
      this.isResponsible = user.IsResponsible;
      this.isMasterAdmin = user.IsMasterAdmin;
    })
  }

  add() {
    this.modalHelper.show('add');
  }

  showDetail(advance: AdvanceModel) {
    this.selectedAdvance = advance;
    this.modalHelper.show('detail');
  }

  showEdit(advance: AdvanceModel) {
    this.selectedAdvance = advance;
    this.modalHelper.show('edit');
  }

  showSetting() {
    this.modalHelper.show('settings')
  }

  requestAuthForTeams() {
    this.appService.requestAuthForTeams().then(result => {
      if (result) {
        location.reload();
      }
    });
  }

}
