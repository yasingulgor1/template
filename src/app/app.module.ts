import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './main/components/app/app.component';
import { CoreModule } from './core/core.module';
import { ApiModule } from './api/api.module'

import { SimpleNotificationsModule } from 'angular2-notifications';
import { AdvanceDateAdapter } from './shared/helpers/adapters/AdvanceDateAdapter';
import { MAT_DATE_LOCALE, DateAdapter, MatNativeDateModule } from '@angular/material/core';
import { environment } from 'src/environments/environment';

import { PeakAngularModule } from 'peak-angular';
import { TokenHelper } from './auth/helper/token.helper';
import { AppService } from './advance/Service/app.service';
import { AdvanceService } from './advance/Service/advance.service';

export function init(appService: AppService) {
  return async () => {
    await appService.authAsync();
  };
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    ApiModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot(),
    MatNativeDateModule,
    PeakAngularModule.forRoot(
      {
        auth: {
          baseUri: environment.peakAuthUri
        }
      }
    ),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: init,
      deps: [AppService, AdvanceService],
      multi: true,
    },
    TokenHelper,
    {provide: MAT_DATE_LOCALE, useValue: 'tr-TR'},
    {provide: DateAdapter, useClass: AdvanceDateAdapter},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
