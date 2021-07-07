import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from '../shared/shared.module';

// Repositories
import { SuiteServiceRepository } from './repositories/services.repository';
import { MeRepository } from './repositories/me.repository';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        HttpClientModule
    ],
    providers: [
        SuiteServiceRepository,
        MeRepository
    ],
    declarations: [],
    exports: [

    ]
})
export class ApiModule {

}
