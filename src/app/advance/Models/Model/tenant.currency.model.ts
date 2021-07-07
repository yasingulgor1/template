import { BaseModel } from "./base.model";
import { CurrencyModel } from "./currency.model";

export class TenantCurrencyModel extends BaseModel {
    Currency: CurrencyModel
}
