import { BaseModel } from "./base.model";
import { StatusModel } from "./status.model";
import { UserModel } from "./user.model";

export class StepModel extends BaseModel {
    Responsible: UserModel
    Status: StatusModel
    
}
