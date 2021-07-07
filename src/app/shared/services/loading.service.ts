import { Injectable } from '@angular/core';
import { Observable ,  Subject } from 'rxjs';



@Injectable()
export class LoadingService {

    private subject = new Subject<any>();

    setLoading(show:boolean, message?:string) {
        this.subject.next({show:show, message:message});
    }

    subscribeLoading(): Observable<any> {
        return this.subject.asObservable();
    }
    
    updateLoading(show:boolean, type:string){
        this.subject.next({show: show, type:type});
    }

}