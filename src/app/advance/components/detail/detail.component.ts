import { Component, OnInit, Input } from '@angular/core';
import { AdvanceModel } from '../../Models/Model/advance.model';
import { UserModel } from '../../Models/Model/user.model';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {


  @Input()
  advance: AdvanceModel

  @Input()
  isResponsible: boolean

  @Input()
  user: UserModel

  isLoading: boolean = false;

  constructor(public loadingService: LoadingService) { }

  ngOnInit() {
    this.loadingService.subscribeLoading().subscribe(loading => {
      if(loading.show === true || loading.show == true || loading.show === false || loading.show == false && loading.type === "detail" || loading.type == "detail"){
        this.isLoading = loading.show;
      }
    })
  }

  isVisible(): boolean{
    if(this.advance != undefined && this.user != undefined){
      if(this.advance.CurrentStep.Responsible.Id != this.user.Id){
        return false;
      }
      else if(this.advance.CurrentStep.Responsible.Id == this.user.Id && this.advance.CurrentStep.Status.Key != "waiting" && this.advance.CurrentStep.Status.Key != 'pending'){
        return false;
      }
    }
    
    return true;
  }

}
