import { Injectable } from '@angular/core'

@Injectable()
export class CoreVEndpoints {
  districtEndpoints = {
    read: "/projectv/districts/read/"
  }

  statesEndpoints = {
    byCountry: "/projectv/statesndpr/by-country/",
    search: "/projectv/statesndpr/search/",
    list: "/projectv/statesndpr/list",
    delete: "/projectv/statesndpr/delete/",
    read: "/projectv/statesndpr/read/",
    create: "/projectv/statesndpr/create",
    update: "/projectv/statesndpr/update/",
    download: "/projectv/statesndpr/export-states/",
    upload: "/projectv/statesndpr/import-states/"
  }

  countryEndpoints = {
    list: "/projectv/countries/list/",
    search: "/projectv/countries/search/",
    shippingEnabled: "/projectv/countries/shipping-enabled/",
    create: "/projectv/countries/create/",
    read: "/projectv/countries/read/",
    update: "/projectv/countries/update/",
    delete: "/projectv/countries/delete/",
    upload: "/projectv/countries/import-countries/",
    download: "/projectv/countries/export-countries/"
  }
}
