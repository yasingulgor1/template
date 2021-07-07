import { Component, OnInit, Input, AfterViewInit } from '@angular/core';

//Helpers
import { DefaultsHelper } from '../../../shared/helpers/defaults.helper'
import { LanguageHelper } from '../../../shared/helpers/language.helper'

//Models
import { Menu } from '../../models/menu';
import { Language } from '../../../shared/models/language';

//Services
import { NotificationsService } from 'angular2-notifications'
import { TranslateService } from '../../../shared/translation/translate.service'
import { SideNavService } from '../../../shared/services/side.nav.services'

declare var Tippy: any
declare var jQuery: any

@Component({
    selector: 'side-nav',
    templateUrl: 'side.nav.component.html',
    styleUrls: ['side.nav.component.css']
})

export class SideNavComponent implements OnInit,AfterViewInit {

    //Inputs

    @Input()
    menu: Menu

    sideNavIsOpen: boolean = false;

    //Models
    languageOptions: Language[]


    constructor(private defaultsHelper: DefaultsHelper,
        private languageHelper: LanguageHelper,
        private notificationService: NotificationsService,
        private translateService: TranslateService,
        private sideNavService: SideNavService) { }

    ngOnInit() {

        this.getLanguageOptions();

    }


    getLanguageOptions() {
        this.languageOptions = this.languageHelper.getAvailableLanguages();
        this.languageHelper.setLanguage(this.languageOptions.filter(t => t.name == 'tr')[0]);

    }

    applyLanguage(lang: Language) {
        if (lang.name != this.languageHelper.getCurrentLanguage().name) {
            this.languageHelper.setLanguage(lang)
            this.getLanguageOptions();
            this.notificationService.success(this.translateService.instant('notification:languageChangedTitle'), this.translateService.instant('notification:languageChangedContent'))
        }


    }

    getDefaultLogoUri(){
        return this.defaultsHelper.getDefaultLogoUri();
    }

    sideNavOnHover() {
        new Tippy('.tippy', { position: 'right', animation: 'fade', arrow: true })
    }

    ngAfterViewInit() {
        let self = this;

        jQuery(document).mouseup(function (e) {
            var container = jQuery(".page-sidebar");
            // if the target of the click isn't the container nor a descendant of the container
            if (!container.is(e.target) && container.has(e.target).length === 0 && self.sideNavIsOpen) {
                var body = jQuery("body");
                body.removeClass("sidebar-visible");
                body.removeClass("sidebar-open");
                jQuery(".page-sidebar").animate().removeClass("visible");
                jQuery(".page-sidebar").animate().css({ "transform": "translate3d(0px, 0px, 0px)" });
                self.sideNavIsOpen = false;
                self.sideNavService.updateStatus(false);
            }
        });


    }

    subscribeSideNavStatus() {
        this.sideNavService.status().subscribe((status: boolean) => {
            this.sideNavIsOpen = status
        })
    }


    initSideBar() {
        var body = jQuery("body");
        if (body.hasClass("sidebar-visible")) {
            body.removeClass("sidebar-visible");
            jQuery(".page-sidebar").animate().css({ "transform": "translate3d(0px, 0px, 0px)" });
            this.sideNavIsOpen = false;
            this.sideNavService.updateStatus(false)
        } else {
            body.addClass("sidebar-visible");
            jQuery(".page-sidebar").animate().css({ "transform": "translate(210px, 0px)" });
            this.sideNavIsOpen = true;
            this.sideNavService.updateStatus(true)
        }
    }


}