import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { BaseRepository } from './base.repository';
import { TokenHelper } from 'src/app/auth/helper/token.helper';

@Injectable()
export class MeRepository extends BaseRepository {

    constructor(private http: HttpClient, tokenHelper:TokenHelper) {

        super('me',tokenHelper);

    }

    get() {
        return this.http.get(`${this.peakAuthRoot}`, { headers: this.defaultHeaders() })
    }

}
