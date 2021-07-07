import { Injectable } from '@angular/core'
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


//Models
import { Menu } from '../../core/models/menu'
import { MenuItem } from '../../core/models/menu.item'
import { MenuItemGroup } from '../../core/models/menu.item.group'
// import { ApplicationPackage } from '../../suite/models/application.package'
// import { ManagerApplication } from '../../suite/models/manager.application'
import { UserGroup } from '../../api/models/user.group';

//Enums
import { IconType } from '../../core/enums/icon.type'
import { RouteType } from '../../core/enums/route.type'
// import { UserAction } from '../../admin/models/user.action';

//Services
import { TranslateService } from '../translation/translate.service'
import { City } from '../../api/models/city';




@Injectable()
export class DefaultsHelper {

    constructor(private sanitizer: DomSanitizer, private translationService: TranslateService) {

    }

    getDefaultNotificationUserGroups(): UserGroup[] {
        return [
            { 
                name: 'all',
                displayName: this.translationService.instant('option:notification:userGroup:all'),
                needApplication:false,
                key:'all' 
            },
            { 
                name: 'allAdmins',
                displayName: this.translationService.instant('option:notification:userGroup:allAdmins'),
                needApplication:false,
                key:'all-admins' 
            },
            { 
                name: 'serviceAll',
                displayName: this.translationService.instant('option:notification:userGroup:allUsersByService'),
                needApplication:true,
                key:'all' 
            },
            { name: 'serviceAdmins',
            displayName: this.translationService.instant('option:notification:userGroup:allAdminsByService'),
            needApplication:true,
            key:'all-admins' 
        }

        ]
    }

    getDefaultCoutries(): City[] {
        return [
            {
                name: 'Türkiye',
            }
        ]
    }

    // getDefaultRemoveActions(): UserAction[] {

    //     return [
    //         {
    //             name: 'cancelRemove',
    //             displayName: this.translationService.instant('buttons:cancel'),
    //             icon: 'ion ion-close',
    //             btnClass: 'btn btn-danger btn-danger-radius'
    //         },
    //         {
    //             name: 'applyRemove',
    //             displayName: this.translationService.instant('buttons:remove'),
    //             icon: 'ion ion-checkmark',
    //             btnClass: 'btn btn-success btn-success-radius'
    //         }
    //     ]

    // }

    // getDefaultUserActions(isEditable: boolean): UserAction[] {

    //     return isEditable
    //         ? [
    //             {
    //                 name: 'view',
    //                 displayName: this.translationService.instant('buttons:view'),
    //                 icon: 'ion ion-eye',
    //                 btnClass: 'btn btn-primary btn-primary-radius'
    //             },
    //             {
    //                 name: 'edit',
    //                 displayName: this.translationService.instant('buttons:edit'),
    //                 icon: 'ion ion-edit',
    //                 btnClass: 'btn btn-complete btn-complete-radius'
    //             },
    //             {
    //                 name: 'remove',
    //                 displayName: this.translationService.instant('buttons:remove'),
    //                 icon: 'ion ion-ios-trash-outline',
    //                 btnClass: 'btn btn-danger btn-danger-radius'
    //             }
    //         ]
    //         : [

    //             {
    //                 name: 'view',
    //                 displayName: this.translationService.instant('buttons:view'),
    //                 icon: 'ion ion-eye',
    //                 btnClass: 'btn btn-primary btn-primary-radius'
    //             }

    //         ]

    // }

    // getDefaultManagerApplications(): ManagerApplication[] {
    //     return [
    //         {
    //             name: 'licences',
    //             displayName: this.translationService.instant('statics:managerApplication:licences'),
    //             route: 'management/licences',
    //             heroImageUri: 'https://peakup.blob.core.windows.net/authenticator/services/licences.png'
    //         },
    //         {
    //             name: 'users',
    //             displayName: this.translationService.instant('statics:managerApplication:users'),
    //             route: 'management/users',
    //             heroImageUri: 'https://peakup.blob.core.windows.net/authenticator/services/users.png'
    //         }
    //     ]
    // }

    // getDefaultApplicationPackages(): ApplicationPackage[] {
    //     return [
    //         {
    //             name: this.translationService.instant('statics:applicationPackage:signandgo:x86'),
    //             heroImageUri: 'https://peakup.blob.core.windows.net/authenticator/services/signandgo.png',
    //             uri: 'https://signandgo.blob.core.windows.net/packages/signandgo.x86.msi'
    //         }, {
    //             name: this.translationService.instant('statics:applicationPackage:signandgo:x64'),
    //             heroImageUri: 'https://peakup.blob.core.windows.net/authenticator/services/signandgo.png',
    //             uri: 'https://signandgo.blob.core.windows.net/packages/signandgo.x64.msi'
    //         }
    //     ];
    // }

    getDefaultMenu(): Menu {

        let menu: Menu = {

            groups: [
            {
                name: 'advance',
                title: 'Avans Yönetimi',
                items: [
                    {

                        title: this.translationService.instant('sideMenu:home'),
                        iconType: IconType.fontIcon,
                        icon: 'fa fa-home',
                        routeType: RouteType.external,
                        routeUrl: location.origin

                    },
                    {

                        title: "Rapor",
                        iconType: IconType.fontIcon,
                        icon: 'fa fa-chart-bar',
                        routeType: RouteType.component,
                        routeUrl: 'report'

                    }]

            },
            {
                name: 'velocity',
                title: 'Velocity Apps',
                items: [
                    {

                        title: this.translationService.instant('sideMenu:home'),
                        iconType: IconType.fontIcon,
                        icon: 'fa fa-home',
                        routeType: RouteType.external,
                        routeUrl: 'https://velocity.peakup.org'

                    }]

            }]

        };

        return menu;

    }

    getDefaultLogoUri() {
        return 'assets/img/advance.png'
    }

    getDefaultLightLogoUri() {
        return 'assets/img/advance.png'
    }

    private sanitizeUrl(url: string): SafeUrl {
        return this.sanitizer.bypassSecurityTrustUrl(url);
    }

    getDefaultLoading(){
        return ` <div class="appLoading">
        <div class="loading-content">
            <img src="../../assets/img/loading.gif" />
        </div>
    </div>`
    }

    
    getNotFoundImageUrl(){
        return '../../assets/img/notfound_icon.png'
    }


}