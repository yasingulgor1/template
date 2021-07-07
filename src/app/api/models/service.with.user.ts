import { SuiteService } from "./suite.service";
import { ServiceUser } from "./service.user";

export class ServiceWithUser {
    service: SuiteService
    users: ServiceUser[]
}