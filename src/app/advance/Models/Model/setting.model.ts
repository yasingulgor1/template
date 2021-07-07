import { BaseModel } from "./base.model";
import { CurrencyModel } from "./currency.model";
import { TenantCurrencyModel } from "./tenant.currency.model";
import { InstallmentModel } from "./installment.model";

export class SettingModel extends BaseModel {

    IsInstallment: boolean
    DefaultInstallment: InstallmentModel
    Installments: InstallmentModel[]
    InstallmentLimit: number
    RequiredDateLimit: number
    MinRequestLimit: number
    MaxRequestLimit: number
    DefaultCurrency: TenantCurrencyModel
    Currencies: TenantCurrencyModel[]
}
