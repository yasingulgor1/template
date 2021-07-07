import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { BaseRepository } from './base.repository';
import { TokenHelper } from 'src/app/auth/helper/token.helper';

@Injectable()
export class SuiteServiceRepository extends BaseRepository {

    constructor(private http: HttpClient, tokenHelper: TokenHelper) {
        super('services', tokenHelper);
    }

    all(by?: string) {
        return this.http.get(`${this.peakAuthRoot}` + (by ? `?by=${by}` : ''), { headers : this.defaultHeaders() });
        }
}
