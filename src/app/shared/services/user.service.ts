import { Injectable } from '@angular/core';
import { Observable ,  Subject } from 'rxjs';

//Models
import { User } from '../../api/models/user'

@Injectable()
export class UserService {

    private subject = new Subject<any>();

    updateCurrentUser(user: User) {
        this.subject.next(user);
    }

    subscribeCurrentUser(): Observable<any> {
        return this.subject.asObservable();
    } 

}