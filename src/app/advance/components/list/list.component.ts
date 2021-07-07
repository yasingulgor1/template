import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

//service
import { AdvanceService } from './../../Service/advance.service';
import { NotificationsService } from 'angular2-notifications';

//helper
import { DefaultsHelper } from "../../../shared/helpers/defaults.helper";

//model
import { AdvanceModel } from '../../Models/Model/advance.model';
import { AdvanceViewModel } from '../../Models/RequestViewModel/advance.view.model';
import { PagerModel } from '../../Models/Model/pager.model';
import { UserModel } from '../../Models/Model/user.model';
import { FilterModel } from '../../Models/Model/filter.model';
import { StateService } from 'src/app/shared/services/state.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { FilterSimpleModel } from '../../Models/Model/filter.simple.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Input()
  isResponsible: boolean = false;

  @Input()
  currentUser: UserModel

  @Input()
  showButtons: boolean = true

  @Input()
  isReportPage: boolean = false;

  @Output()
  onShowDetailClicked: EventEmitter<AdvanceModel> = new EventEmitter<AdvanceModel>();

  @Output()
  onShowEditClicked: EventEmitter<AdvanceModel> = new EventEmitter<AdvanceModel>();

  advances: AdvanceModel[];
  pager: PagerModel

  filter: FilterSimpleModel = new FilterSimpleModel;

  isLoading: boolean = false;

  constructor(
    private advanceService: AdvanceService,
    private defaultHelper: DefaultsHelper, 
    public stateService: StateService,
    public loadingService: LoadingService,
    private notification: NotificationsService) { }

  ngOnInit() {
  }

  getNotFoundImageUrl() {
    return this.defaultHelper.getNotFoundImageUrl();
  }



}
