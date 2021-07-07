import { environment } from "src/environments/environment";
import * as adal from "adal-angular";
import { Property } from "src/app/auth/models/property";
import { AdvanceService } from "./advance.service";
import { PeakAuthHelper } from "src/app/auth/helper/peak.auth.helper";
import { TokenHelper } from "src/app/auth/helper/token.helper";
import { Injectable, Injector } from "@angular/core";
import { asapScheduler, Observable, scheduled } from "rxjs";
import * as microsoftTeams from "@microsoft/teams-js";
export function asapScheduled<T>(p: Promise<T>): Observable<T> {
  return scheduled(p, asapScheduler);
}

export type AppType = "Unknown" | "Web" | "Teams";

@Injectable({ providedIn: "root" })
export class AppService {
  private microsoftTeams = microsoftTeams;

  constructor(
    private _injector: Injector
  ) {
    let self = this;
    this.microsoftTeams.initialize();
  }
  private get advanceService() {
    return this._injector.get(AdvanceService);
  }
  private get peakAuthHelper() {
    return this._injector.get(PeakAuthHelper);
  }
  private get tokenHelper() {
    return this._injector.get(TokenHelper);
  }
  public type: Property<AppType> = new Property<AppType>("Unknown");

  public async updateAppTypeAsync() {
    if (this.type.value !== "Unknown") return;
    this.type.value = (await this.isTeamsAsync()) ? "Teams" : "Web";
    console.log(this.type.value);
  }

  public async processByAppTypeAsync() {
    if (this.type.value == "Unknown") await this.updateAppTypeAsync();
    await this.peakAuthHelper.auth.processAsync(this.type.value != "Teams");
  }

  public processByAppType() {
    return asapScheduled(this.processByAppTypeAsync());
  }

  public to<T>(p: Promise<T>): Promise<Array<T | {} | null>> {
    return p.then((v) => [null, v]).catch((err) => [err, null]);
  }

  async authAsync(): Promise<void> {
    console.log("App Service");

    await this.updateAppTypeAsync();
    let isTeams = this.type.value == "Teams";
    // if (!environment.production)
    //   if (!environment.production)
        //console.log("Init", "true");
        if (location.href.indexOf("/teams/auth/") > -1)
          //console.log("isTeams", isTeams.toString());
          return; // Teams içerisinden geldiği durumlar için önlem amaçlı.

    let isValid = false;
    await this.processByAppType();
    let verifyModel = await this.peakAuthHelper.auth.clients.verify.getAsync();
    console.log("verifyModel", isValid);
    // if (!environment.production)
      if (verifyModel.result) {
        //console.log("Verify model", verifyModel);
        // if (!environment.production)
          //console.log("verify", "true");
          isValid = true;
      }
    // if (!environment.production)
      if (
        !isValid &&
        isTeams &&
        localStorage.getItem("isSilentLoginAvailable") == "true"
      ) {
        console.log("isValid", isValid);
        let isTeamsAuthCompletedSuccessfully = await this.processAuthForTeams();
        console.log("isTeamsAuthCompletedSuccessfully: ", isTeamsAuthCompletedSuccessfully);
        if(isTeamsAuthCompletedSuccessfully) {
        }
        else if (!isTeamsAuthCompletedSuccessfully) {
          return;
        }
      }
    await this.peakAuthHelper.auth.processAsync(!isTeams);
  }

  async logoutAsync(redirectOrReload: boolean = true): Promise<void> {
    await this.updateAppTypeAsync();
    try {
      await this.peakAuthHelper.logout(redirectOrReload);
    } catch {}
    switch (this.type.value) {
      case "Teams":
        let response = await this.logoutForTeamsAsync();
        if (response.result && redirectOrReload) location.reload();
        break;
    }
  }

  async isTeamsAsync(timeout: number = 2000): Promise<boolean> {
    let self = this;
    return new Promise<boolean>((resolve, reject) => {
      // DEBUG
      if (environment.DebugAppMode == "Teams") {
        resolve(true);
        return;
      }
      let isResolved = false;
      try {
        self.microsoftTeams.getContext((context: microsoftTeams.Context) => {
          isResolved = true;
          console.log(context);
          // console.log("isTeams is resolved true");
          // localStorage.setItem(`isTeamsAsync-context-${moment().format("llll")}`, JSON.stringify(context));
          resolve(true);
        });
      } catch (e) {
        // console.log("Error when resolving isTeams", e);
        // localStorage.setItem(`isTeamsAsync-error-${moment().format("llll")}`, JSON.stringify(e));
      }
      setTimeout(() => {
        if (!isResolved) {
          // console.log("isTeams is resolved false");
          // localStorage.setItem(`isTeamsAsync-timeout-${moment().format("llll")}`, "");
          resolve(false);
        }
      }, timeout);
    });
  }

  getTeamsContextAsync(): Promise<microsoftTeams.Context> {
    let self = this;
    return new Promise<microsoftTeams.Context>((resolve, reject) => {
      // DEBUG
      if (environment.DebugAppMode == "Teams") {
        resolve({
          tid: "common",
          entityId: "",
          locale: "tr",
        });
        return;
      }
      this.isTeamsAsync().then((isTeams) => {
        if (isTeams)
          self.microsoftTeams.getContext((context: microsoftTeams.Context) => {
            console.log(context);
            resolve(context);
          });
        else reject("We are not in teams");
      });
    });
  }

  private async renewIdTokenAsync(
    authContext: adal
  ): Promise<{ error: string; token: string }> {
    return new Promise<{ error: string; token: string }>((resolve, reject) => {
      (authContext as any)._renewIdToken((e, t) => {
        resolve({ error: e, token: t });
      });
    });
  }

  private async processAuthForTeams(): Promise<boolean> {
    // if (!environment.production) console.log("processAuthForTeams", "true");
    let isSilentAuthSucceeded = await this.silentAuthForTeams();
    // if (!environment.production)
      console.log(
        "isSilentAuthSucceeded",
        JSON.stringify(isSilentAuthSucceeded)
      );
    if (isSilentAuthSucceeded) {
      console.log("Azure AD silent auth is completed successfully");
      return true;
    }
    return false;
  }

  public async requestAuthForTeams(): Promise<boolean> {
    let isAuthSucceeded = await this.authForTeamsAsync();
    // if (!environment.production)
      console.log("isAuthSucceeded", JSON.stringify(isAuthSucceeded));
    console.log("Azure AD auth is completed successfully");
    return isAuthSucceeded.result;
  }

  private async silentAuthForTeams(): Promise<boolean> {
    if (!environment.production) console.log("Teams: Silent auth");
    let loginHint = null;
    let tenantId = "common";
    let teamsContext = await this.getTeamsContextAsync();
    if (teamsContext) {
      if (teamsContext["loginHint"]) loginHint = teamsContext["loginHint"];
      if (teamsContext["tid"]) tenantId = teamsContext["tid"];
    }
    console.log(teamsContext);

    let config: adal.Options = {
      tenant: tenantId,
      clientId: environment.TeamsClientId,
      redirectUri: window.location.origin + "/teams/auth/silent-end",
      cacheLocation: "localStorage",
      navigateToLoginRequestUrl: false,
      extraQueryParameter: null,
      loadFrameTimeout: 10000,
    };

    if (loginHint) {
      config.extraQueryParameter =
        "scope=openid+profile&login_hint=" + encodeURIComponent(loginHint);
    } else {
      config.extraQueryParameter = "scope=openid+profile";
    }

    let authContext = new adal(config);

    let user = authContext.getCachedUser();
    if (user && user.userName !== loginHint) {
      authContext.clearCache();
    }
    let token = authContext.getCachedToken(config.clientId);
    if (
      token &&
      (await this.peakAuthHelper.processTokenAsync(token, "teams"))
    ) {
      if (!environment.production) console.log("Token is valid");
      return true;
    } else {
      if (!environment.production) console.log("Renewing token");
      let renewResult = await this.renewIdTokenAsync(authContext);
      if (!renewResult.error) {
        if (!environment.production) console.log("Token renewed");
        this.tokenHelper.setTeamsToken(renewResult.token);
        await this.peakAuthHelper.processTokenAsync(renewResult.token, "teams");
        return true;
      } else if (!environment.production)
        console.log("Error when renewing token", renewResult.error);
    }
    return false;
  }

  private async authForTeamsAsync(): Promise<{
    result: boolean;
    content: string;
  }> {
    console.log("auth for teams");
    let response = await this.teamsAuthenticateAsync({
      url: window.location.origin + "/teams/auth/start",
      width: 600,
      height: 535,
    });
    if (response.result) {
      let result = typeof response.content === 'string' ? JSON.parse(response.content) : response.content;
      if (result.idToken) {
        this.tokenHelper.setTeamsToken(result.idToken);
        this.peakAuthHelper.processTokenAsync(result.idToken, "teams");
        localStorage.setItem("isSilentLoginAvailable", "true");
      }
    }
    return response;
  }

  private async logoutForTeamsAsync(): Promise<{
    result: boolean;
    content: string;
  }> {
    this.peakAuthHelper.logout(false);
    this.tokenHelper.removeTeamsToken();
    this.clearAdalCacheFromLocalStorage();
    localStorage.removeItem("isSilentLoginAvailable");

    // let response = await this.teamsAuthenticateAsync({
    //     url: window.location.origin + "/teams/logout/start",
    //     width: 600,
    //     height: 535
    // });
    return { result: true, content: "" };
  }

  private async teamsAuthenticateAsync(authenticateParameters: {
    url: string;
    width?: number;
    height?: number;
  }) {
    let self = this;
    // if (!environment.production)
      console.log("Teams: Auth", authenticateParameters);
    return new Promise<{ result: boolean; content: string }>(
      (resolve, reject) => {
        self.microsoftTeams.authentication.authenticate({
          ...authenticateParameters,
          successCallback: (content) => resolve({ result: true, content }),
          failureCallback: (content) => resolve({ result: false, content }),
        });
      }
    );
  }

  private async clearAdalCacheFromLocalStorage() {
    if (localStorage) {
      Object.keys(localStorage)
        .filter((key) => key.indexOf("adal") > -1)
        .forEach((key) => localStorage.removeItem(key));
    }
  }
}
