import { Component, OnInit } from '@angular/core';
import { AdvanceService } from '../../Service/advance.service';
import { UserModel } from '../../Models/Model/user.model';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  currentUser: UserModel;
  isResponsible: boolean = true;
  constructor(public advanceService: AdvanceService) { }

  ngOnInit() {
    this.getUSer();
  }

  getUSer(){
    this.advanceService.getUser().subscribe((user: UserModel) => {
      this.currentUser = user;
      this.isResponsible = user.IsResponsible;

    })
  }
}
