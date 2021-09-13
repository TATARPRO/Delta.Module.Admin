import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthorizationLevel, AuthorizationScopeVm } from '../../core/core-interface';
import { EndpointMetadata } from '../../core/endpointMeta';
import HttpContext from '../../core/httpContext';
import ArialTranslate from '../../core/translateService';

@Component({
  selector: 'authorization-scope',
  templateUrl: './authorization-scope.component.html'
})
export class AuthorizationSopeComponent implements OnInit {
 
  public scopes: AuthorizationScopeVm[] = new Array<AuthorizationScopeVm>();
  public levels: AuthorizationLevel[] = new Array<AuthorizationLevel>();

  @Input("userId")
  userId: string;

  @Output("toggleAuthorizationScopes")
  toggleAuthorizationScopes = new EventEmitter<any>();

  @Output("getAuthorizationScopes")
  getAuthorizationScopes = new EventEmitter<any>();

  public constructor(private endpoints: EndpointMetadata, private httpContext: HttpContext, private arialTranslate: ArialTranslate) {
    
  }

  ngOnInit() {
    this.getLevels();
    this.getScopes()
  }

  public toggleScopes(resourceId: number, roleId: string, levelId: number) {
    this.toggleAuthorizationScopes.emit({ resourceId: resourceId, roleId: roleId, levelId: levelId })
  }

  public validateChecked(resourceId: number, roleId: string, levelId: number) {
    let resource = this.scopes.find(x => x.resourceId == resourceId && x.roleId == roleId)
    if (resource) {
      let index = resource.levelIds.indexOf(levelId)
      if (index > -1) {
        return true;
      } else {
        return false;
      }
    }
  }

  public translate(key: string) {
    return this.arialTranslate.translate(key);
  }

  private getScopes() {
    this.httpContext.read<AuthorizationScopeVm[]>(this.endpoints.userEndpoints.scopes + this.userId).subscribe((x) => {
      this.scopes = x
      this.getAuthorizationScopes.emit(x)
    });
  }

  private getLevels() {
    this.httpContext.read<AuthorizationLevel[]>(this.endpoints.authorizationLevelEndpoints.list).subscribe((x) => {
      this.levels = x
    });
  }
}
