import { BaseModel } from "./base.model";

export class UserModel extends BaseModel {
        Name: string
        Surname: string
        DisplayName: string
        MailAddress: string
        PhoneNumber: string
        ProfileImageUri: string
        Department: string
        JobTitle: string
        JoinDate: Date
        IsResponsible: boolean
        IsIk: boolean
        IsMasterAdmin: boolean
        IsReporter: boolean
        
        
}
