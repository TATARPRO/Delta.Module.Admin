import { Component, AfterViewInit } from '@angular/core';
import { UserGroup } from '../../core/core-interface';
import ComponentBase from '../../core/componentBase';
import { EndpointMetadata } from '../../core/endpointMeta';


@Component({
  selector: 'usergroup-list-component',
  templateUrl: './user-group-list.component.html'
})
export class UserGroupListComponent extends ComponentBase implements AfterViewInit {
 
  public title: string = "User Groups";
  public userGroups: UserGroup[] = new Array<UserGroup>();

  public constructor(private endpoints: EndpointMetadata) {
    super('usergroup-list-component')
  }

  ngOnInit() {
    this.inAsyncMode = true
    this.getUserGroups();
  }

  ngAfterViewInit() {
    this.afterComponentInit()
  }
  private getUserGroups() {
    this.httpContext.read<any>(this.endpoints.userGroupEndpoints.list).subscribe((x) => {
      this.userGroups = x
      this.inAsyncMode = false
    }, (fail) => {
      this.inAsyncMode = false
      this.handleError(fail, true)
    });
  }

  public deleteUserGroup(id: string) {
    this.inAsyncMode = true
    this.httpContext.delete<any>(this.endpoints.userGroupEndpoints.delete + id).subscribe(() => {
      this.getUserGroups();
    }, (fail) => {
        this.inAsyncMode = false
        this.handleError(fail, true)
    });
  }
}
