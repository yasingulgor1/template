import { Component, OnInit, Input } from '@angular/core';

//helper
import { ModalHelper } from '../../../shared/helpers/modal.helper';

//model
import { AdvanceModel } from '../../Models/Model/advance.model';
import { UserModel } from '../../Models/Model/user.model';

@Component({
  selector: 'app-edit-btn',
  templateUrl: './edit-btn.component.html',
  styleUrls: ['./edit-btn.component.css']
})
export class EditBtnComponent implements OnInit {

  @Input()
  advance: AdvanceModel

  @Input()
  currentUser: UserModel

  constructor(private modalHelper: ModalHelper) { }

  ngOnInit() {
  }

  isVisible(): boolean{
    
    
    return true;
  }

}
