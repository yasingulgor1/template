import { Injectable } from '@angular/core'

//Services

import { TranslateService } from '../translation/translate.service'

//Models

import { Language } from '../models/language'

@Injectable()
export class LanguageHelper {

    constructor(private translateService: TranslateService) {

    }

    init() {
        this.getBrowserLanguage();
    }

    private getBrowserLanguage() {

        let browserLanguage = navigator.language;

        if (browserLanguage.indexOf("-") != -1) {

            browserLanguage = this.parseLanguage(browserLanguage)

        }

        this.setDefaultLanguage(browserLanguage)

    }

    private parseLanguage(lang: string): string {

        return lang.split('-')[0]

    }

    private setDefaultLanguage(lang: string) {

        if (localStorage.getItem('application:lang') == undefined) {

            this.translateService.use(lang)
            localStorage.setItem('application:lang', lang)

        }
        else{

            this.translateService.use(localStorage.getItem('application:lang'))
        }

    }

    private isCurrentLanguage(lang:string){
        return lang == localStorage.getItem('application:lang') ? true : false;
    }

    setLanguage(lang: Language) {
        this.translateService.use(lang.name)
        localStorage.setItem('application:lang', lang.name)
    }

    getCurrentLanguage(): Language {
        let langName = this.translateService.currentLang;
        return this.getAvailableLanguages().filter(t => t.name == langName)[0]
    }

    getAvailableLanguages(): Language[] {
        return [
            {
                name: 'tr',
                displayName: 'Türkçe',
                flag: 'flag-icon flag-icon-tr',
                isCurrentLanguage : this.isCurrentLanguage('tr')
            },
            {
                name: 'en',
                displayName: 'English',
                flag: 'flag-icon flag-icon-gb',
                isCurrentLanguage : this.isCurrentLanguage('en')
            },

        ]
    }


}