import { PeakAuthToken } from "peak-angular";
import PeakAuth from "peakauth";
import { Inject, Injectable } from "@angular/core";

export type PeakAuthHelperTokenType = ''

@Injectable()
export class PeakAuthHelper {

    constructor(
        @Inject(PeakAuthToken) public auth: PeakAuth
    ) {
    }

    public async processTokenAsync(token: string = null, tokenType: 'peakauth' | 'teams'): Promise<boolean> {
        let result = false;
        switch (tokenType) {
            case 'peakauth':
                let verifyModel = await this.auth.clients.verify.getAsync(token);
                if (verifyModel.result) {
                    this.auth.client.resolver.cache.code.value = token;
                    result = true;
                }
            case 'teams':
                let tokenModel = await this.auth.clients.oauth.azureAdAsync(token);
                console.log("processTokenAsync for Teams - result", JSON.stringify(tokenModel));
                this.auth.handleToken(tokenModel);
                result = !!tokenModel.access_token;
        }
        return result;
    }

    private to<T>(p: Promise<T>): Promise<Array<T | {} | null>> {
        return p.then(v => [null, v]).catch(err => [err]);
    }

    async logout(redirect: boolean = true) {
        let [err, data] = await this.to(this.auth.clients.logout.postAsync());
        this.auth.resolver.cache.tokenResponse.remove(); // TODO: PeakAuth bug
        await this.auth.reauthAsync(false, redirect);
    }

    async reauthAsAdmin(redirect: boolean = true) {
        let [err, data] = await this.to(this.auth.clients.logout.postAsync());
        await this.auth.reauthAsync(true, redirect);
    }

}
