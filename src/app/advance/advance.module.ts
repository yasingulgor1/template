import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdvanceRoutingModule } from './advance.routing.module';
import { SharedModule } from '../shared/shared.module';
import { ApiModule } from '../api/api.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

//Components
import { MainComponent } from './components/main/main.component';
import { AddComponent } from './components/add/add.component';
import { DetailComponent } from './components/detail/detail.component';
import { ListComponent } from './components/list/list.component';
import { PagerComponent } from './components/pager/pager.component';


//Service
import { AdvanceService } from './Service/advance.service';
import { RemoveBtnComponent } from './components/remove-btn/remove-btn.component';
import { AcceptBtnComponent } from './components/accept-btn/accept-btn.component';
import { EditComponent } from './components/edit/edit.component';
import { SettingsComponent } from './components/settings/settings.component';
import { RejectBtnComponent } from './components/reject-btn/reject-btn.component';
import { DetailBtnComponent } from './components/detail-btn/detail-btn.component';
import { EditBtnComponent } from './components/edit-btn/edit-btn.component';
import { FilterComponent } from './components/filter/filter.component';
import { ReportComponent } from './components/report/report.component';
import { ExportBtnComponent } from './components/export-btn/export-btn.component';

//Angular Material
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from "@angular/material/input";
import { TokenHelper } from '../auth/helper/token.helper';
import { AppService } from './Service/app.service';
import { HashHelper } from '../auth/helper/hash.helper';
import { QueryStringHelper } from '../auth/helper/querystring.helper';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    AdvanceRoutingModule,
    SharedModule,
    ApiModule,
    FormsModule,
    ReactiveFormsModule,
    // NgDatepickerModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  declarations: [
    MainComponent,
    AddComponent,
    DetailComponent,
    ListComponent,
    RemoveBtnComponent,
    EditComponent,
    SettingsComponent,
    AcceptBtnComponent,
    RejectBtnComponent,
    DetailBtnComponent,
    EditBtnComponent,
    ExportBtnComponent,
    PagerComponent,
    FilterComponent,
    ReportComponent,
    ],
    providers: [
      MatDatepickerModule,
      AdvanceService,
      TokenHelper,
      HashHelper,
      QueryStringHelper
    ]
})
export class AdvanceModule { }
