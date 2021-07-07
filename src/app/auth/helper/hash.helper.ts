import { Injectable } from '@angular/core'

@Injectable()
export class HashHelper {

    public get(name: string, hash?: string) : string {
        if (!hash) hash = window.location.hash;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[#&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(hash);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    public remove(name: string, hash?: string) : string {
        if (!hash) hash = window.location.hash;
        var urlparts = hash.split('#');
        if (urlparts.length >= 2) {
            var prefix = encodeURIComponent(name) + '=';
            var pars = urlparts[1].split(/[&;]/g);
            for (var i = pars.length; i-- > 0;) {
                if (pars[i].lastIndexOf(prefix, 0) !== -1) {
                    pars.splice(i, 1);
                }
            }

            hash = urlparts[0] + (pars.length > 0 ? '#' + pars.join('&') : "");
            return hash;
        } else {
            return hash;
        }
    }
}
