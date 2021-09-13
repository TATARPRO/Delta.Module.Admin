import { Injectable } from '@angular/core'

@Injectable()
export class TaxEndpoints {
  taxClass = {
    list: "/projectv/tax-classes/list/",
    active: "/projectv/tax-classes/active/",
    delete: "/projectv/tax-classes/delete/",
    read: "/projectv/tax-classes/read/",
    update: "/projectv/tax-classes/update/",
    create: "/projectv/tax-classes/create/",
    upload: "/projectv/tax-classes/import-tax-classes/",
    download: "/projectv/tax-classes/export-tax-classes/"
  }

  taxRates = {
    read: "/projectv/tax-rates/read/",
    update: "/projectv/tax-rates/update/",
    create: "/projectv/tax-rates/create/",
    list: "/projectv/tax-rates/list/",
    delete: "/projectv/tax-rates/delete/",
    download: "/projectv/tax-rates/export/",
    upload: "/projectv/tax-rates/import/"
  }
}
