import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [

   
    // {
    //     path: 'management',
    //     loadChildren: '../admin/admin.module#AdminModule'
    // },
    // {
    //     path: '',
    //     loadChildren: '../suite/suite.module#SuiteModule'
    // }
      
    {
        path: '',
        loadChildren: () => import('../advance/advance.module').then(m => m.AdvanceModule)
    }
    

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class CoreRoutingModule { }