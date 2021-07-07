import { Component, OnInit, Input } from '@angular/core';
import { AdvanceModel } from '../../Models/Model/advance.model';
import { UserModel } from '../../Models/Model/user.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  @Input()
  advance: AdvanceModel

  @Input()
  currentUser: UserModel

  @Input()
  isResponsible: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
