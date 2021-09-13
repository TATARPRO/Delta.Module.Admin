export class StoreVm {
  id: number;
  name: string;
  slug: string;
  contactName: string;
  phone: string;
  description: string;
  addressId: number;
  addressLine1: string;
  addressLine2: string;
  city: string;
  zipCode: number;
  districtId: number;
  stateOrProvinceId: number;
  countryId: number;
  thumbnailImage: File;
  thumbnailImageUrl: string;
}

export class StockVm {
  productId: number;
  adjustedQuantity: number;
  note: string;
}

export class ManageStoreProductItemVm {
  id: number;
  name: string;
  quantity: number;
  sku: string;
  existInStore: boolean;
}

export class StoreListVm {
  id: number;
  vendorName: string;
  phone: string;
  name: string;
}
