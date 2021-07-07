import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AdvanceModel } from '../../Models/Model/advance.model';

//helper
import { ModalHelper } from '../../../shared/helpers/modal.helper';

@Component({
  selector: 'app-detail-btn',
  templateUrl: './detail-btn.component.html',
  styleUrls: ['./detail-btn.component.css']
})
export class DetailBtnComponent implements OnInit {

  @Input()
  advance: AdvanceModel

  constructor(private modalHelper: ModalHelper) { }

  ngOnInit() {
  }

 

}
