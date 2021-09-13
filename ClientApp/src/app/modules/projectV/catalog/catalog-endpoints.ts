import { Injectable } from '@angular/core'

@Injectable()
export class CatalogEndpoints {
  brandEndpoints = {
    list: "/projectv/brands/list",
    delete: "/projectv/brands/delete/",
    read: "/projectv/brands/read/",
    create: "/projectv/brands/create",
    update: "/projectv/brands/update/"
  }

  categoryEndpoints = {
    parentOnly: "/projectv/categories/parent-only",
    list: "/projectv/categories/list",
    delete: "/projectv/categories/delete/",
    read: "/projectv/categories/read/",
    create: "/projectv/categories/create",
    update: "/projectv/categories/update/"
  }

  productEndpoints = {
    basicSearch: "/projectv/products/basic-search/",
    list: "/projectv/products/search/",
    delete: "/projectv/products/delete/",
    suspend: "/projectv/products/suspend/",
    create: "/projectv/products/create/",
    read: "/projectv/products/read/",
    update: "/projectv/products/update/",
    searchOptions: "/projectv/products/search-options/"
  }

  productAttributeEndpoints = {
    list: "/projectv/product-attributes/list/",
    delete: "/projectv/product-attributes/delete/",
    create: "/projectv/product-attributes/create/",
    read: "/projectv/product-attributes/read/",
    update: "/projectv/product-attributes/update/"
  }

  productAttributeGroupEndpoints = {
    list: "/projectv/prattribute-groups/list/",
    delete: "/projectv/prattribute-groups/delete/",
    create: "/projectv/prattribute-groups/create/",
    read: "/projectv/prattribute-groups/read/",
    update: "/projectv/prattribute-groups/update/"
  }

  productOptionEndpoints = {
    list: "/projectv/product-options/list/",
    delete: "/projectv/product-options/delete/",
    create: "/projectv/product-options/create/",
    read: "/projectv/product-options/read/",
    update: "/projectv/product-options/update/"
  }

  productsOrderBy = "/projectv/product-express/available-orderby";
  priceHistory = {
    search: "/projectv/product-prices/search/",
    update: "/projectv/product-prices/update/",
    searchOptions: ""
  }
}
