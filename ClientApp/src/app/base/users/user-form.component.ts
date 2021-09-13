import { Component, AfterViewInit } from '@angular/core';
import { Role, UserGroup } from '../../core/core-interface';
import { CustomFormControl, CustomFormGroup } from '../../core/formControlExtension';
import { Validators, NgForm } from "@angular/forms";
import { ComparisonValidator } from '../../core/comparisonValidator';
import ComponentBase from '../../core/componentBase';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { EndpointMetadata } from '../../core/endpointMeta';

class userForm {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
  email: string;
  userName: string;
  roleIds: string[] = new Array<string>();
  userGroupIds: number[] = new Array<number>();
  profilePicture: File;
  concurrencyStamp: string;
  authorizationScopes: any[] = [];
}

class UserFormGroup extends CustomFormGroup {
  constructor() {
      super({
          userName: new CustomFormControl("Username", "userName", "", "text", "a", Validators.compose([
              Validators.required,
              Validators.minLength(4)
          ])),
        fullName: new CustomFormControl("FullName", "fullName", "", "text", "a", Validators.compose([
              Validators.required,
              Validators.minLength(4)
          ])),
        email: new CustomFormControl("Email", "email", "", "email", "an", Validators.compose([
              Validators.required,
              Validators.minLength(5),
              Validators.pattern("")
          ])),
        phoneNumber: new CustomFormControl("Phone Number", "phoneNumber", "", "tel", "a", Validators.compose([
              Validators.minLength(10)
          ])),
        password: new CustomFormControl("Password", "password", "", "password", "a", Validators.compose([
              Validators.required,
              Validators.minLength(8)
          ])),
        confirmPassword: new CustomFormControl("Confirm Password", "confirmPassword", "", "password", "a", Validators.compose([
            ComparisonValidator.Compare("password")
          ]))
      });
  }

}

@Component({
  selector: 'user-form-component',
  templateUrl: './user-form.component.html'
})
export class UserFormComponent extends ComponentBase implements AfterViewInit {
  public model: userForm = new userForm();
  public userFormGroup: UserFormGroup = new UserFormGroup();
  public title: string = "Users";
  public acceptTerms: boolean = false;
  public confirmPassword: string;
  public roles: Role[] = new Array<Role>();
  public userGroups: UserGroup[] = new Array<UserGroup>();

  public isEditMode: boolean = false;
  public isSubmitting: boolean = false;

  public constructor(activatedRoute: ActivatedRoute, private router: Router, private endpoints: EndpointMetadata) {
    super('user-form-component')
    if (activatedRoute.snapshot.params["id"]) {
      this.model.id = activatedRoute.snapshot.params["id"]
      this.isEditMode = true;
    }
  }

  ngOnInit() {
    this.inAsyncMode = true
    this.getUserGroups();
    this.getRoles();

    if (this.model && this.model.id) {
      this.getUser(this.model.id)
    }
  }

  ngAfterViewInit() {
    this.afterComponentInit();
  }

  public toggleRoles(id: string) {
    let index = this.model.roleIds.indexOf(id);
    if (index > -1) {
      this.model.roleIds.splice(index, 1)
    } else {
      this.model.roleIds.push(id)
    }
  }

  public toggleUserGroups(id: number) {
    let index = this.model.userGroupIds.indexOf(id);
    if (index > -1) {
      this.model.userGroupIds.splice(index, 1)
    } else {
      this.model.userGroupIds.push(id)
    }
  }

  public toggleAuthorizationScopes(data: any) {
    let resource = this.model.authorizationScopes.find(x => x.resourceId == data.resourceId && x.roleId == data.roleId);
    
    if (resource) {
      let index = resource.levelIds.indexOf(data.levelId)
      if (index > -1) {
        this.model.authorizationScopes.find(x => x.resourceId == data.resourceId && x.roleId == data.roleId).levelIds.splice(index, 1)
      } else {
        this.model.authorizationScopes.find(x => x.resourceId == data.resourceId && x.roleId == data.roleId).levelIds.push(data.levelId)
      }
    }
  }

  // authorization scopes will come from the child component since the request to get user data may not have been ready
  // and the authorization-scope component must have been initialized.
  // The scopes are only set in the child on componentInit 
  public getAuthorizationScopes(scopes: any) {
    this.model.authorizationScopes = scopes;
  }

  public submit() {
    this.isSubmitting = true;
    if (this.userFormGroup.valid) {
      this.validationErrors = []
      if (!this.acceptTerms) {
        this.validationErrors.push("You have to accept to our terms and conditions in order to proceed")
        return;
      }

      this.inAsyncMode = true
      var result: Observable<any>

      if (!this.isEditMode) {
        result = this.createUser()
      } else {
        result = this.updateUser()
      }

      result.subscribe(() => {
        this.router.navigateByUrl("/admin-area/users")
      },
        (fail) => {
          this.handleError(fail)
          this.inAsyncMode = false
        });
    }
  }

  private createUser() {
    return this.httpContext.create<any>(this.endpoints.userEndpoints.create, this.model)
  }

  private updateUser() {
    return this.httpContext.update<any>(this.endpoints.userEndpoints.update, this.model)
  }

  private getUser(id: string) {
    this.httpContext.read<userForm>(this.endpoints.userEndpoints.read + id).subscribe((x) => {
      this.model = x
      this.inAsyncMode = false
    });
  }

  private getUserGroups() {
    this.httpContext.read<UserGroup[]>(this.endpoints.userGroupEndpoints.list).subscribe(x => this.userGroups = x);
  }

  private getRoles() {
    this.httpContext.read<Role[]>(this.endpoints.roleEndpoints.list).subscribe(x => {
      this.roles = x
      if (!this.isEditMode) {
        this.inAsyncMode = false
      }
    });
  }
}
