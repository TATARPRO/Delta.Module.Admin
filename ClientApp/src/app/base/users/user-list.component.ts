import { Component, AfterViewInit } from '@angular/core';
import { User, SearchOption, NotificationType } from '../../core/core-interface';
import ComponentBase from '../../core/componentBase';
import { EndpointMetadata } from '../../core/endpointMeta';

@Component({
  selector: 'user-list-component',
  templateUrl: './user-list.component.html'
})
export class UserListComponent extends ComponentBase implements AfterViewInit {
  
  public title: string = "Users";
  public searchOptions: SearchOption[] = new Array<SearchOption>();
  
  public constructor(private endpoints: EndpointMetadata) {
    super('user-list-component')
    this.smartTableResult.items = new Array<User>();
    this.paginationFetchUrl = endpoints.userEndpoints.list;
  }

  ngOnInit() {
    this.inAsyncMode = true
    this.getUserSearchOptions();
    this.getUsers();
  }

  ngAfterViewInit() {
    this.afterComponentInit()
  }

  private getUsers() {
    this.httpContext.search<any>(this.endpoints.userEndpoints.list, this.smartTableParam).subscribe((x) => {
      this.smartTableResult = x

      this.smartTableParam.pagination.pageSize = this.smartTableResult.pageSize;
      this.smartTableParam.pagination.requestedPage = this.smartTableResult.currentPage;
      
      this.inAsyncMode = false
    }, x => { this.inAsyncMode = false; this.handleError(x) });
  }

  private getUserSearchOptions() {
    this.httpContext.read<SearchOption[]>(this.endpoints.userEndpoints.searchOptions).subscribe((x) => {
      this.searchOptions = x
    }, () => { });
  }

  public deleteUser(id: string) {
    this.inAsyncMode = true
    this.httpContext.delete<any>(this.endpoints.userEndpoints.delete + id).subscribe(() => {
      this.toastNotification("User Deleted", `user ${this.smartTableResult.items.find(x => x.id == id).userName} has been deleted.`, NotificationType.success)
      this.getUsers();
    },
      (fail) => {
        this.inAsyncMode = false
        this.handleError(fail, true);
      });
  }
}
