import { Component, OnInit } from '@angular/core'

//Helpers
import { DefaultsHelper } from '../../../shared/helpers/defaults.helper'
import { ModalHelper } from '../../../shared/helpers/modal.helper'

//Services
import { UserService } from '../../../shared/services/user.service'

//Models
import { User } from '../../../api/models/user'
import { PeakAuthHelper } from 'src/app/auth/helper/peak.auth.helper'

@Component({
    selector: 'header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.css']
})

export class HeaderComponent implements OnInit {

    currentUser: User

    constructor(private defaultsHelper: DefaultsHelper,
        private userService: UserService,
        private modalHelper: ModalHelper,
        private peakAuthHelper: PeakAuthHelper) { }

    ngOnInit() {

        this.initCurrentUserSubscriber();

    }

    initCurrentUserSubscriber() {
        this.userService.subscribeCurrentUser().subscribe((user: User) => {
            this.currentUser = user;
        })
    }

    getCurrentUserDisplayName() {
        if (this.currentUser != undefined) {
            return `${this.currentUser.name} ${this.currentUser.surname}`;
        }
    }

    showNotifications() {
        this.modalHelper.show('notificationsModal')
    }

    getDefaultLogoUri() {
        return this.defaultsHelper.getDefaultLogoUri();
    }

    logout() {
        this.peakAuthHelper.logout();
        localStorage.clear();
    }

    reauthAsAdmin() {
        this.peakAuthHelper.reauthAsAdmin();
    }

}
