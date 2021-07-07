import { Injectable } from '@angular/core'
import { Observable ,  Subject } from 'rxjs';
import { FormGroup } from '@angular/forms';

//Services
import { TranslateService } from '../translation/translate.service'

declare var jQuery: any

@Injectable()
export class Select2Helper {

    constructor(private translationService: TranslateService) {

    }



    init(elementId: string) {

        let translatedPlaceholderText = this.translationService.instant('placeholders:select');

        setTimeout(() => {

            jQuery(document).ready(function () {

                jQuery(`#${elementId}`).select2({
                    tags: false,
                    allowClear: false,
                    placeholder: translatedPlaceholderText
                });

            });

        }, 1);

    }

    initInModal(elementId: string, modalId: string) {

        let translatedPlaceholderText = this.translationService.instant('placeholders:select');

        setTimeout(() => {



            jQuery(document).ready(function () {

                jQuery(`#${elementId}`).select2({
                    tags: false,
                    dropdownParent: jQuery(`#${modalId}`),
                    allowClear: false,
                    placeholder: translatedPlaceholderText
                });


            });

        }, 1);

    }

    subscribeSelections(elementId: string): Observable<any> {

        let subject = new Subject<any>();

        jQuery(`#${elementId}`).on('select2:select', function (e) {
            var data = e.params.data;
            subject.next(data);
        });

        return subject.asObservable();

    }

    bindFormValue(elementId: string, form: FormGroup, controlName: string): Observable<any> {

        let subject = new Subject<any>();

        jQuery(`#${elementId}`).on('select2:select', function (e) {

            var data = e.params.data;

            let formControl = form.get(controlName)

            if (formControl != undefined) {
                formControl.setValue(data.id)
            }

            subject.next(data);
        });

        return subject.asObservable();

    }


}