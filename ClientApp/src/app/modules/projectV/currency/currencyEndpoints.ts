import { Injectable } from '@angular/core'

@Injectable()
export class CurrencyEndpoints {
  currency = {
    list: "/projectv/currency/list/",
    delete: "/projectv/currency/delete/",
    read: "/projectv/currency/read/",
    update: "/projectv/currency/update/",
    create: "/projectv/currency/create/",
    import: "/projectv/currency/import-currencies/",
    export: "/projectv/currency/export-currencies/"
  }

  exchangeRate = {
    read: "/projectv/exchange-rate/read/",
    update: "/projectv/exchange-rate/update/",
    create: "/projectv/exchange-rate/create/",
    list: "/projectv/exchange-rate/list/",
    delete: "/projectv/exchange-rate/delete/",
    upload: "/projectv/exchange-rate/import-exchange-rates/",
    download: "/projectv/exchange-rate/export-exchange-rates/"
  }
}
