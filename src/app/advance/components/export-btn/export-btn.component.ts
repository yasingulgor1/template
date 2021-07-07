import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AdvanceService } from '../../Service/advance.service';

@Component({
  selector: 'app-export-btn',
  templateUrl: './export-btn.component.html',
  styleUrls: ['./export-btn.component.css']
})
export class ExportBtnComponent implements OnInit {

  @Output()
  onExportClicked: EventEmitter<null> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  export(){
    this.onExportClicked.emit();
  }


}
