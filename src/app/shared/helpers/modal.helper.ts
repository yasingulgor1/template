import { Injectable } from '@angular/core'
import { Observable ,  Subject } from 'rxjs';

declare var jQuery: any

@Injectable()
export class ModalHelper {

    show(elementId: string) {
        jQuery(`#${elementId}`).modal('show');
    }

    hide(elementId: string) {
        jQuery(`#${elementId}`).modal('hide');
    }

    onClose(elementId: string) : Observable<any>{

        let subject = new Subject<any>();

        jQuery(`#${elementId}`).on('hidden.bs.modal', function () {
            subject.next();
        })

        return subject.asObservable();

    }

}