//Models

import { Source } from "./source";
// import { UserAction } from "../../admin/models/user.action";

export class User {
    id:string
    name: string
    surname: string
    mailAddress: string
    jobTitle: string
    displayName: string
    department: string
    companyName: string
    country: string
    city: string
    state: string
    postalCode: string
    streetAddress: string
    isEditable: boolean
    isActive: boolean
    createdAt: Date
    properties: string
    telephoneNumber: string
    mobile:string
    faxNumber: string
    source: Source[]
    isResponsible: boolean
    // actions: UserAction[]
    managerId:string
    profileImageUri:string
    //Helper fields
    isRemoving: boolean
    isRemoved: boolean
    isRemovingOnProgress:boolean

}