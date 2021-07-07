import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { TokenHelper } from 'src/app/auth/helper/token.helper';
import { environment } from 'src/environments/environment';

//Helpers

//Models

@Injectable()
export class BaseRepository {
  constructor(private controller: string, private tokenHelper: TokenHelper) { }

  public apiRoot = environment.baseApiUri;
  //public apiRoot = `http://dev-advance.peakup.org/api/`
  //public apiRoot = `http://localhost:49402/api/`

  public peakAuthRoot = `https://auth.peakup.org/api/${this.controller}/`
  public peakDataRoot = `https://peakdata.peakup.org/api/${this.controller}/`

  defaultHeaders(lang: string = 'tr') {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept-Language': lang,
      'Authorization': `Bearer ${this.tokenHelper.getToken()}`
    });
  }
  dataHeaders(lang: string = 'tr') {
    return new HttpHeaders({
      'Accept-Language': lang,
      'Authorization': `Bearer ${this.tokenHelper.getToken()}`
    });
  }
  resourceHeaders(language: string) {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.tokenHelper.getToken()}`,
      'Peak-Service': 'advance',
      'Peak-Language': language
    });
  }
  peakDataHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Token': '49d3d3c8-0918-4354-ad99-3d58a2195dd4',
    })
  }

  public handleError(error: any) {
    console.log('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
