import { BaseModel } from "./base.model";
import { CurrencyModel } from "./currency.model";
import { StepModel } from "./step.model";
import { UserModel } from "./user.model";
import { InstallmentModel } from "./installment.model";


export class AdvanceModel extends BaseModel {
    RequiredDate: Date
    Amount: number
    Description: string
    Installment : InstallmentModel
    IsPrint: boolean
    Currency: CurrencyModel
    User: UserModel
    CurrentStep: StepModel
    Steps: StepModel[]
}
