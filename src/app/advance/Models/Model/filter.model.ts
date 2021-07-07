import { StatusModel } from "./status.model";

export class FilterModel {
    status: StatusModel
    startAmount: number
    endAmount: number
    dateStart: Date
    dateEnd: Date
    user: string
}
