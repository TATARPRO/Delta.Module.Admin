import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Role, SmartTableResult } from '../../../../core/core-interface';
import ComponentBase from '../../../../core/componentBase';
import { EndpointMetadata } from '../../../../core/endpointMeta';
import { StoreListVm } from '../inventory.models';


@Component({
  selector: 'store-list-component',
  templateUrl: './store-list.component.html'
})
export class StoreListComponent extends ComponentBase implements AfterViewInit, OnInit {
 
  public title: string = "Stores";
  public result: SmartTableResult = new SmartTableResult() ;
  private apiEndpoints = {
    list: "/projectv/stores/list/",
    search: "/projectv/stores/search",
    delete: "/projectv/stores/delete/"
  }
  public constructor() {
    super('store-list-component')
    this.result.items = new Array<StoreListVm>();
  }

  ngOnInit() {
    this.getStores();
    this.inAsyncMode = true
  }

  ngAfterViewInit() {
    this.afterComponentInit()
  }
  private getStores() {
    this.httpContext.search<any>(this.apiEndpoints.search, this.smartTableParam).subscribe((x) => {
      this.result = x
      this.inAsyncMode = false
    }, (fail) => { this.inAsyncMode = false; this.handleError(fail) });
  }

  public deleteStore(id: string) {
    this.inAsyncMode = true
    this.httpContext.delete<any>(this.apiEndpoints.delete + id).subscribe(() => {
      this.getStores();
    }, (fail) => {
        this.handleError(fail)
        this.inAsyncMode = false
    });
  }
}
