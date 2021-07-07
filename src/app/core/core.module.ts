import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CoreRoutingModule } from './core.routing.module';
import { SharedModule } from '../shared/shared.module';

// Components
import { HeaderComponent } from './components/header/header.component'
import { SideNavComponent } from './components/side-nav/side.nav.component'


@NgModule({
    imports: [
      CommonModule,
      CoreRoutingModule,
      SharedModule
    ],
    declarations: [
        HeaderComponent,
        SideNavComponent
    ],
    exports: [
        RouterModule,
        HeaderComponent,
        SideNavComponent
    ],
    providers: [

    ]
  })
  export class CoreModule { }