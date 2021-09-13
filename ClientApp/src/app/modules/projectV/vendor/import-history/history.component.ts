import { Component, OnInit } from '@angular/core';
import ComponentBase from '../../../../core/componentBase';
import { VendorEndpoints } from '../vendor-endpoints';
import { ImportHistory } from '../vendor-models';


@Component({
  selector: 'history-component',
  templateUrl: './history.component.html'
})
export class HistoryComponent extends ComponentBase implements OnInit {
  
  public title: string = "Product Import History";
  public histories: ImportHistory[] = new Array<ImportHistory>();

  public constructor(private endpoints: VendorEndpoints) {
    super('history-component')
    this.paginationFetchUrl = this.endpoints.historyEndpoints.search
  }

  ngOnInit() {
    this.inAsyncMode = true
    this.getImportHistory();
  }

  private getImportHistory() {
    this.httpContext.read<any>(this.endpoints.historyEndpoints.search).subscribe((x) => {
      this.histories = x
      this.inAsyncMode = false
    }, (fail) => { this.inAsyncMode = false; this.handleError(fail) });
  }

  public synchronize(id: number) {
    this.inAsyncMode = true
    this.httpContext.read<any>(this.endpoints.historyEndpoints.synchronize + id).subscribe((x) => {
      this.getImportHistory()
    }, (fail) => { this.inAsyncMode = false; this.handleError(fail) });
  }
}
