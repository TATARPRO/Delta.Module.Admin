import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import ComponentBase from '../../core/componentBase';
import { Validators, NgForm } from '@angular/forms';
import { CustomFormControl, CustomFormGroup } from '../../core/formControlExtension';
import { Observable } from 'rxjs';
import { EndpointMetadata } from '../../core/endpointMeta';


class RoleForm {
  id: string;
  name: string;
  isAdminRole: boolean;
}
class RoleFormGroup extends CustomFormGroup  {
  constructor() {
    super({
      name: new CustomFormControl("Name", "name", "", "text", "a", Validators.compose([
        Validators.required
      ])),
      isAdminRole: new CustomFormControl("Is Admin Role", "isAdminRole", "", "checkbox")
    })
  }
}

@Component({
  selector: 'role-form-component',
  templateUrl: './role-form.component.html'
})
export class RoleFormComponent extends ComponentBase implements AfterViewInit, OnInit {

  public model: RoleForm = new RoleForm();
  public roleFormGroup: RoleFormGroup = new RoleFormGroup();
  public title: string = "Roles";
  public isEditMode = false;
  public isSubmitting = false;

  public constructor(activatedRoute: ActivatedRoute, private router: Router, private endpoints: EndpointMetadata) {
    super('role-form-component')
    if (activatedRoute.snapshot.params["id"]) {
      this.isEditMode = true;
      this.model.id = activatedRoute.snapshot.params["id"]
    }
  }

  ngOnInit() {
    if (this.model && this.model.id) {
      this.getRole(this.model.id)
      this.inAsyncMode = true
    }
  }

  ngAfterViewInit() {
    this.afterComponentInit();
  }

  public submit() {
    this.isSubmitting = true;
    if (this.roleFormGroup.valid) {
      this.inAsyncMode = true
      this.validationErrors = []

      let result: Observable<any>

      if (!this.isEditMode)
        result = this.createRole()
      else 
        result = this.updateRole()
      
      result.subscribe(() => {
      this.router.navigateByUrl("/admin-area/roles")
      }, (fail) => {
          this.handleError(fail)
          this.inAsyncMode = false
      });
    }
  }

  private createRole() {
    return this.httpContext.create<any>(this.endpoints.roleEndpoints.create, this.model)
  }

  private updateRole() {
    return this.httpContext.update<any>(this.endpoints.roleEndpoints.update, this.model)
  }

  private getRole(id: string) {
    this.httpContext.read<any>(this.endpoints.roleEndpoints.read + id).subscribe((x) => {
      this.model = x
      this.inAsyncMode = false
      }, (fail) => {
        this.inAsyncMode = false
       this.handleError(fail)
    });
  }
}
