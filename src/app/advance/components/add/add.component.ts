import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { delay } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

//service
import { AdvanceService } from './../../Service/advance.service';

//helper
import { ModalHelper } from './../../../shared/helpers/modal.helper';
import { NotificationsService } from 'angular2-notifications'

//models
import { SettingModel } from './../../Models/Model/setting.model';
import { Token } from './../../../shared/models/token';
import { UserModel } from '../../Models/Model/user.model';
import { InstallmentModel } from '../../Models/Model/installment.model';
import { CurrencyModel } from '../../Models/Model/currency.model';
import { AddRequestModel } from '../../Models/RequestModels/add.request.model';
import { StateService } from 'src/app/shared/services/state.service';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  @Input()
  currentUser: UserModel


  constructor(
    private advanceService: AdvanceService,
    private formBuilder: FormBuilder,
    private modalHelper: ModalHelper,
    private notification: NotificationsService,
    public stateService: StateService
  ) { }

  ngOnInit() {
  }



}
