import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

//service
import { AdvanceService } from '../../Service/advance.service';

//model
import { AdvanceModel } from '../../Models/Model/advance.model';
import { UserModel } from '../../Models/Model/user.model';
import { StateService } from 'src/app/shared/services/state.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { ModalHelper } from 'src/app/shared/helpers/modal.helper';

@Component({
  selector: 'app-accept-btn',
  templateUrl: './accept-btn.component.html',
  styleUrls: ['./accept-btn.component.css']
})
export class AcceptBtnComponent implements OnInit {

  @Input()
  advance: AdvanceModel

  @Input()
  currentUser: UserModel

  constructor(
    private advanceService: AdvanceService, 
    public stateService: StateService,
    public loadingService: LoadingService,
    public modalHelper: ModalHelper) { }

  ngOnInit() {
  }

  isVisible(): boolean{
    if(this.advance != undefined && this.currentUser != undefined){
      if(this.advance.CurrentStep.Responsible.Id != this.currentUser.Id){
        return false;
      }
      else if(this.advance.CurrentStep.Responsible.Id == this.currentUser.Id && this.advance.CurrentStep.Status.Key != "waiting" && this.advance.CurrentStep.Status.Key != 'pending'){
        return false;
      }
    }
    
    return true;
  }

  accept() {
    this.loadingService.updateLoading(true, "list");
    this.loadingService.updateLoading(true, 'detail');
    this.advanceService.Response(this.advance, "accepted").subscribe((resp: any) => {
      this.modalHelper.hide('detail');
      this.loadingService.updateLoading(false, 'detail');
      this.stateService.update(true);
    },
      err => {
        console.log("err", err);
      });
  }

}
