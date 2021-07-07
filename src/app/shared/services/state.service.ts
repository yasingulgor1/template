
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';


@Injectable()

export class StateService {

    private mainComponentRefresh = new Subject();


    update(loading: boolean) {

        this.mainComponentRefresh.next(loading);

    }


    read(): Observable<any> {

        return this.mainComponentRefresh.asObservable();

    }


}