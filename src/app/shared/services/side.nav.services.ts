
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';


@Injectable({providedIn:'root'})
export class SideNavService {

    private subject = new Subject<any>();

    updateStatus(isOpen: boolean) {
        this.subject.next(isOpen);
    }

    status(): Observable<any> {
        return this.subject.asObservable();
    }

}