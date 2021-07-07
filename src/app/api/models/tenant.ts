import { HeroImage } from "./hero.image";
import { Source } from "./source";

export class Tenant{
    name:string
    heroImage:HeroImage
    sources:Source[]
    id:string
    createdAt:Date
    isActive:boolean
    properties:string
}