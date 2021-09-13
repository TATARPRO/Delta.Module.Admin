export class CurrencyVm {
  id: number;
  name: string;
  country: string;
  currencyCode: string;
  currencyCulture: string;
  exchangeRateToDollar: number
}

export class CurrencyForm extends CurrencyVm {
  decimalPlaces: number;
  countryId: string;
}

export class ExchangeRateListVm {
  id: number;
  countryA: string;
  countryB: string;
  countryAValue: number;
  countryBValue: number;
}

export class ExchangeRateForm {
  id: number;
  countryAId: string;
  currencyAValue: number;
  countryBId: string;
  currencyBValue: number;
}
