import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Role } from '../../core/core-interface';
import ComponentBase from '../../core/componentBase';
import { EndpointMetadata } from '../../core/endpointMeta';


@Component({
  selector: 'role-list-component',
  templateUrl: './role-list.component.html'
})
export class RoleListComponent extends ComponentBase implements AfterViewInit, OnInit {
 
  public title: string = "Roles";
  public roles: Role[] = new Array<Role>();

  public constructor(private endpoints: EndpointMetadata) {
    super('role-list-component')
  }

  ngOnInit() {
    this.inAsyncMode = true
    this.getRoles();
  }

  ngAfterViewInit() {
    this.afterComponentInit()
  }
  private getRoles() {
    this.httpContext.read<any>(this.endpoints.roleEndpoints.list).subscribe((x) => {
      this.roles = x
      this.inAsyncMode = false
    }, (fail) => {
      this.inAsyncMode = false
      this.handleError(fail)
    });
  }

  public deleteRole(id: string) {
    this.inAsyncMode = true
    this.httpContext.delete<any>(this.endpoints.roleEndpoints.delete + id).subscribe(() => {
      this.getRoles();
    }, (fail) => {
        this.inAsyncMode = false
        this.handleError(fail)
    });
  }
}
