import { User } from "./user";
import { SuiteService } from "./suite.service";
import { Tenant } from "./tenant";

export class Me{

    isMasterAdmin:boolean
    user:User
    service:SuiteService
    tenant:Tenant

}
