import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

//service
import { AdvanceService } from '../../Service/advance.service';

//model
import { FilterModel } from '../../Models/Model/filter.model';
import { StatusModel } from '../../Models/Model/status.model';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  public firstDay: Date = new Date(Date.now())

  @Input()
  isResponsible: boolean = false

  @Output()
  onApplyFilterClicked: EventEmitter<FilterModel> = new EventEmitter<FilterModel>();

  status: StatusModel[]=[]
  filter: FilterModel = {status:new StatusModel, startAmount:null, endAmount: null, dateEnd: null, dateStart: null, user: null};
  isFilterOpen : boolean = false;

  _status: string =null;

  constructor(private advanceService: AdvanceService) {}

  ngOnInit() {
    this.getStatus()
  }
  onChange($event: StatusModel){
    this.filter.status = $event;
  }

  apply(){
    this.onApplyFilterClicked.emit(this.filter);
  }

  reset(){
    this.filter = {status:new StatusModel, startAmount:null, endAmount: null, dateEnd: null, dateStart: null, user: null};
    this._status = this.status.filter(t => t.Key == "all")[0].Id;
  }

  getStatus(){
    this.advanceService.getStatus().subscribe((resp:StatusModel[]) => {
      this.status = resp;
      this._status = resp.filter(t => t.Key == "all")[0].Id;
    },
    err => {
      console.log("err", err)
    })
  }

}
