import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PagerModel } from '../../Models/Model/pager.model';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.css']
})
export class PagerComponent implements OnInit {

  @Input()
  pager: PagerModel

  @Output()
  onGoToPageClicked: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  range(n : number, r: number, min: number, max: number)
  {
    if((n+(r/2)) >= max+1 ) n = (max-(r/2))
    if((n-(r/2)) <=2) n = 6
    let arr = [];
    for(let i = Math.max((n-(r/2-1)), 2); i <= Math.min((n+(r/2+1)), max); i++)
      arr.push(i);
    return arr;
  }

  pageArray() {
    return this.range(this.pager.CurrentPage, 10, 2, (this.pager.TotalPages-1) );
  }

  nextPage(){
    this.onGoToPageClicked.emit(this.pager.CurrentPage+1)
  }

  previousPage(){
    this.onGoToPageClicked.emit(this.pager.CurrentPage-1)
  }

  goToPage(page: number){
    this.onGoToPageClicked.emit(page);
  }

}
