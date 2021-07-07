import { Component, OnInit, Input } from '@angular/core';

//service
import { AdvanceService } from '../../Service/advance.service'

//model
import { UserModel } from '../../Models/Model/user.model';
import { InstallmentModel } from '../../Models/Model/installment.model';
import { SettingModel } from '../../Models/Model/setting.model';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  @Input()
  currentUser: UserModel

  installments: InstallmentModel[] = []
  setting: SettingModel
  _installment: number = null

  _err: string
  _succ: string

  isLoading:boolean = true;

  constructor(private advanceService: AdvanceService) { }

  ngOnInit() {
    this.get();
  }

  get(){
    this.advanceService.getSetting().subscribe((resp: SettingModel) => {
      this.setting = resp;
      this.isLoading = false;
    },
    err =>{
      console.log("err", err)
    })
  }


  add() {
    if (this._installment == null) this._err = "sayı girilmelidir.";
    else {
      if (this._installment <= 1)
        var item: InstallmentModel = { Name: "1 Peşin", Number: 1 }
      else
        var item: InstallmentModel = { Name: this._installment + " Taksit", Number: this._installment }

      if (this.setting.Installments.find((t: InstallmentModel) => t.Number == item.Number)) {
        this._err = "taksit var";
      }
      else {
        this._err = null;
        this.setting.Installments.push(item);
      }
    }
  }

  remove(item:InstallmentModel){
    console.log()
    this.setting.Installments.splice(this.setting.Installments.indexOf(item), 1);
  }

  save(){
    this.isLoading = true;
    this.advanceService.putSetting(this.setting).subscribe((resp: SettingModel) => {
      this.get();
      this._succ = "Ayarlar Güncellendi";
    },
    err => {
       this.isLoading = false;
        console.log("err", err);
    })
  }

}
