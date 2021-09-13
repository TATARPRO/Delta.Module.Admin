import { Injectable } from '@angular/core';

@Injectable()
export class VendorEndpoints  {
  vendorEndpoints = {
    list: "/projectv/vendors/search/",
    delete: "/projectv/vendors/delete/",
    read: "/projectv/vendors/read/",
    update: "/projectv/vendors/update",
    create: "/projectv/vendors/create/",
    verification: "/projectv/vendors/verification-methods/"
  }

  partisanEndpoints = {
    list: "/projectv/partisan-vendors/list/",
    update: "/projectv/partisan-vendors/update/",
    read: "/projectv/partisan-vendors/read/"
  }

  historyEndpoints = {
    read: "/projectv/product-import/read/",
    search: "/projectv/product-import/search/",
    delete: "/projectv/product-import/delete/",
    synchronize: "/projectv/product-import/synchronize/"
  }
}
