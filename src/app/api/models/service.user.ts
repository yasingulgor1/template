import { User } from "./user";

export class ServiceUser{
    isAdmin:boolean
    exists:boolean
    user:User
    id:string
    createdAt:Date
    isActive:boolean
    properties:string
}