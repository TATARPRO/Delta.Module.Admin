export class TaxClassListVm {
  id: number;
  name: string;
  isActive: boolean;
}

export class TaxClassForm {
  id: number;
  name: string;
  isActive: boolean;
}

export class TaxRateListVm {
  id: number;
  taxClassName: string;
  countryName: string;
  stateOrProvinceName: string;
  zipCode: string;
  rate: number;
}

export class TaxRateForm {
  id: number;
  taxClassId: number;
  countryId: string;
  stateOrProvinceId: number;
  zipCode: number;
  rate: number;
}

export class TaxRateImportForm {
  IncludeHeader: boolean;
  CsvDelimiter: string
  CsvFile: File
}
