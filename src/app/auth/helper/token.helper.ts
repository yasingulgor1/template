import { Injectable } from '@angular/core';
import { Token } from '../models/token';

@Injectable()
export class TokenHelper {

    public getToken() {
        let token = localStorage.getItem('peakauth:code')
        return JSON.parse(token);
    }

    public getTeamsToken(): string {
        let token = localStorage.getItem('teams.token')
        return token;
    }

    public setTeamsToken(token: any) {
        localStorage.setItem('teams.token', token)
    }

    public setToken(token: Token) {
        localStorage.setItem('peakauth:code', JSON.stringify(token))
    }

    public removeTeamsToken(){
        localStorage.removeItem('teams.token');
    }

    removeToken() {
        localStorage.removeItem('peakauth:code')
    }

    public clearStorage() {
        localStorage.clear();
    }

    public getMe() {
      return localStorage.getItem('advance:me');
    }

    public setMe(me) {
      localStorage.setItem('advance:me', JSON.stringify(me));
    }

}
