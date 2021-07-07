import { IconType } from "../enums/icon.type";
import { RouteType } from "../enums/route.type";
import { SafeUrl } from "@angular/platform-browser";

export class MenuItem {

    title: string
    iconType: IconType
    icon?: string
    iconUrl?:SafeUrl
    routeType: RouteType
    routeUrl?: string
    routeComponent?: any


}