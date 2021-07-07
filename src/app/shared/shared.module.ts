import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select'
import { FormsModule } from '@angular/forms';

//Helpers
import { DefaultsHelper } from './helpers/defaults.helper'
import { LanguageHelper } from './helpers/language.helper'
import { ModalHelper } from './helpers/modal.helper'
import { ManagerGuard } from './helpers/manager.guard'
import { Select2Helper } from './helpers/select2.helper'

//Translation
import { TranslatePipe } from './translation/translate.pipe'
import { TranslateService } from './translation/translate.service'
import { TRANSLATION_PROVIDERS } from './translation/translations'

//Services
import { UserService } from './services/user.service'
import { LoadingService } from './services/loading.service'

//Components


import { FileUploadModule } from 'ng2-file-upload';
import { StateService } from './services/state.service';
import { PeakAuthHelper } from '../auth/helper/peak.auth.helper';
import { TokenHelper } from '../auth/helper/token.helper';



@NgModule({
    imports: [
        CommonModule,
        // FileUploadModule,
        NgSelectModule,
        FormsModule
    ],
    providers: [
        DefaultsHelper,
        LanguageHelper,
        ModalHelper,
        TokenHelper,
        PeakAuthHelper,
        TRANSLATION_PROVIDERS,
        TranslateService,
        UserService,
        LoadingService,
        ManagerGuard,
        Select2Helper,
        StateService
    ],
    declarations: [
        TranslatePipe
    ],
    exports: [
        TranslatePipe,
        NgSelectModule,
        FormsModule
    ]
})

export class SharedModule {

    constructor(private languageHelper: LanguageHelper) {
        this.languageHelper.init();
    }
}
