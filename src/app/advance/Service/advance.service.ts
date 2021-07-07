import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseRepository } from '../../api/repositories/base.repository';
import 'rxjs/add/operator/map';

//models
import  { AddRequestModel } from '../Models/RequestModels/add.request.model';
import { AdvanceModel } from '../Models/Model/advance.model';
import { SettingModel } from '../Models/Model/setting.model';
import { TokenHelper } from 'src/app/auth/helper/token.helper';


@Injectable({
  providedIn: 'root'
})
export class AdvanceService extends BaseRepository{

  constructor(private http: HttpClient, tokenHelper: TokenHelper) { super('advance', tokenHelper); }

  add(advance: AddRequestModel){ return this.http.post(`${this.apiRoot}advance/post`, JSON.stringify(advance), { headers: this.defaultHeaders() }); }

  getAdvance(page: number, pageSize: number = 20, status: string, startAmount: number = 0, endAmount: number = 0, startDate: string = null, endDate: string = null){return this.http.get(`${this.apiRoot}advance/get/me?page=${page}&pagesize=${pageSize}&status=${status}&startamount=${startAmount}&endamount=${endAmount}&startDate=${startDate}&endDate=${endDate}`, {headers: this.defaultHeaders() })}

  getResponsibleAdvance(page: number, pageSize: number = 20, status: string, startAmount: number = null, endAmount: number = null, user: string = null, startDate: string = null, endDate: string = null){return this.http.get(`${this.apiRoot}advance/get/responsible?page=${page}&pagesize=${pageSize}&status=${status}&userName=${user}&startamount=${startAmount}&endamount=${endAmount}&startDate=${startDate}&endDate=${endDate}`, {headers: this.defaultHeaders() })}

  getSetting(){return this.http.get(`${this.apiRoot}setting/get`, { headers: this.defaultHeaders() })}

  putSetting(setting: SettingModel){return this.http.put(`${this.apiRoot}setting/put`, JSON.stringify(setting), { headers: this.defaultHeaders() }); }

  getUser(){ return this.http.get(`${this.apiRoot}user/get`, {headers: this.defaultHeaders() })}

  Remove(advance: AdvanceModel){return this.http.delete(`${this.apiRoot}advance/remove/${advance.Id}`, {headers: this.defaultHeaders() })}

  Response(advance: AdvanceModel, value: string){return this.http.put(`${this.apiRoot}advance/response/${advance.Id}/${value}`, "noBody", {headers: this.defaultHeaders() })}

  getStatus(){ return this.http.get(`${this.apiRoot}status/get`, {headers: this.defaultHeaders()} )}

  getReport(status: string, startAmount: number = null, endAmount: number = null, user: string = null, startDate: string = null, endDate: string = null) {
    return this.http.get(`${this.apiRoot}report/get?status=${status}&userName=${user}&startamount=${startAmount}&endamount=${endAmount}&startDate=${startDate}&endDate=${endDate}`,{
        headers: this.dataHeaders(), responseType: "blob"}).map(res => new Blob([res],{ type: 'application/vnd.ms-excel' }));
}
}
