import { Component, AfterViewInit, OnInit } from '@angular/core';
import { ResourceRole, Role } from '../../core/core-interface';
import ComponentBase from '../../core/componentBase';
import { EndpointMetadata } from '../../core/endpointMeta';


@Component({
  selector: 'resource-roles',
  templateUrl: './resource-roles.component.html'
})
export class ResourceRolesComponent extends ComponentBase implements AfterViewInit, OnInit {
 
  public title: string = "Resource Roles";
  public resources: ResourceRole[] = new Array<ResourceRole>();
  public roles: Role[] = new Array<Role>();

  public constructor(private endpoints: EndpointMetadata) {
    super('resource-roles')
  }

  ngOnInit() {
    this.inAsyncMode = true
    this.getRoles()
    this.getResourceRoles();
  }

  ngAfterViewInit() {
    this.afterComponentInit()
  }

  private getResourceRoles() {
    this.httpContext.read<any>(this.endpoints.resourceRoleEndpoints.read).subscribe((x) => {
      this.resources = x
      this.inAsyncMode = false
    }, x => { this.inAsyncMode = false; this.handleError(x) });
  }

  private getRoles() {
    this.httpContext.read<Role[]>(this.endpoints.roleEndpoints.list).subscribe((x) => {
      this.roles = x
    });
  }

  public toggleRoles(resourceId: number, roleId: string) {
    let resource = this.resources.find(x => x.id == resourceId);
    if (resource) {
      let index = resource.roleIds.indexOf(roleId)
      if (index > -1) {
        this.resources.find(x => x.id == resourceId).roleIds.splice(index, 1)
      } else {
        this.resources.find(x => x.id == resourceId).roleIds.push(roleId)
      }
    }
  }

  public updateResources() {
    this.inAsyncMode = true
    this.httpContext.update<any>(this.endpoints.resourceRoleEndpoints.update, this.resources).subscribe(() => {
      this.getResourceRoles();
    }, (fail) => {
        this.inAsyncMode = false
        this.handleError(fail)
    });
  }
}
