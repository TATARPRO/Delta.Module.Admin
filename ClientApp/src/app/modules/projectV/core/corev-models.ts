export class Country {
  id: string;
  name: string;
  code3: string;
  isShippingEnabled: boolean;
  isBillingEnabled: boolean;
  isCityEnabled: boolean;
  isZipCodeEnabled: boolean;
  isDistrictEnabled: boolean;
  currencyCulture: string;
  conversionRateToDollar: number;
}

export class District {
  id: number;
  name: string;
}

export class StateProvince {
  id: number;
  name: string;
  code: string;
  country: string
  countryId: string;
}

export class StateOrProvinceForm {
  id: number;
  name: string;
  code: string;
  countryId: string;
  countryCode: string;
  type: string;
}

export class Currency {
  id: string;
  name: string;
  conversionRateToDollar: number;
  lastUpdated: Date
}

