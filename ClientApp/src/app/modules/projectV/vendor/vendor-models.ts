export class Vendor {
  id: number;
  name: string;
  contactEmail: string;
  slug: string;
  dateCreated: Date;
  isActive: boolean;
  isVerified: boolean;
}

export class VendorForm {
  id: number;
  name: string;
  description: string;
  deltaUserId: string;
  isActive: boolean;
  isVerified: boolean;
  vendorData: VendorData = new VendorData();
}

export class VendorData {
  companyName: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  passportImage: string;
  verificationImage: string;
  verificationMethod: string
  passportPhotograph: File
  verificationData: File
}

export class ProductImportForm {
  pageNumber: number = 1;
  pageSize: number = 10;
}

export class PartisanVendorList {
  id: string;
  name: string;
  country: string;
  setupUrl: string;
}

export class PartisanVendorForm {
  id: string;
  apiUserId: string;
  authorizationKey: string;
  vendorId: number;
}

export class ImportHistory {
  id: number;
  user: string;
  name: string;
  pageSize: number;
  vendor: string;
  lastSyncDate: Date;
  importDate: Date
}
