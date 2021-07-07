import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

//helper


//service
import { AdvanceService } from '../../Service/advance.service';


//model
import { AdvanceModel } from '../../Models/Model/advance.model';
import { UserModel } from '../../Models/Model/user.model';
import { StateService } from 'src/app/shared/services/state.service';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-remove-btn',
  templateUrl: './remove-btn.component.html',
  styleUrls: ['./remove-btn.component.css']
})
export class RemoveBtnComponent implements OnInit {

@Input()
advance: AdvanceModel

@Input()
currentUser: UserModel

  constructor(private advanceService: AdvanceService, 
    public stateService: StateService,
    public loadingService: LoadingService) { }

  ngOnInit() {
    
  }

  isVisible(): boolean{
    if(this.advance != undefined || this.currentUser != undefined){
      if(!this.currentUser.IsMasterAdmin || !this.currentUser.IsIk){
        if(this.advance.CurrentStep.Responsible.Id != this.currentUser.Id){
          if(this.advance.User.Id != this.currentUser.Id){
            return false;
          }
          else if(this.advance.User.Id == this.currentUser.Id && this.advance.CurrentStep.Status.Key.toLowerCase() == "accepted" || this.advance.CurrentStep.Status.Key.toLowerCase() == "declined"){
            return false;
          }
        }
        else if(this.advance.CurrentStep.Responsible.Id == this.currentUser.Id && this.advance.CurrentStep.Status.Key.toLowerCase() == "accepted" || this.advance.CurrentStep.Status.Key.toLowerCase() == "declined"){
          return false
        }
      }
    }
    
      return true;
  }

  remove(){
    if(confirm("Silmek istediğinizden emin misiniz?")){
      this.loadingService.updateLoading(true, "list");
      this.advanceService.Remove(this.advance).subscribe((resp: any) => {
        this.stateService.update(true);
      },
      err => {
        console.log("err", err);
      })
    }
  }

}
