import { NgModule, OnInit } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Components

import { MainComponent } from './components/main/main.component'
import { ReportComponent } from './components/report/report.component';
import { TeamsConfigComponent } from './components/teams/teams-config/teams-config.component';
import { TeamsEndComponent } from './components/teams/teams-end/teams-end.component';
import { TeamsSilentEndComponent } from './components/teams/teams-silent-end/teams-silent-end.component';
import { TeamsSilentStartComponent } from './components/teams/teams-silent-start/teams-silent-start.component';
import { TeamsStartComponent } from './components/teams/teams-start/teams-start.component';


const routes: Routes = [

    {
        path: '', component: MainComponent
    },
    {
        path: 'main', component : MainComponent
    },
    {
        path: 'report', component : ReportComponent
    },
    {
      path: "teams/config",
      component: TeamsConfigComponent,
    },
    {
      path: "teams/auth/start",
      component: TeamsStartComponent,
    },
    {
      path: "teams/auth/end",
      component: TeamsEndComponent,
    },
    {
      path: "teams/auth/silent-start",
      component: TeamsSilentStartComponent,
    },
    {
      path: "teams/auth/silent-end",
      component: TeamsSilentEndComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})

export class AdvanceRoutingModule { }
