import { Component, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import ComponentBase from '../../core/componentBase';
import { Validators, NgForm } from '@angular/forms';
import { CustomFormControl, CustomFormGroup } from '../../core/formControlExtension';
import { Observable } from 'rxjs';
import { EndpointMetadata } from '../../core/endpointMeta';

class UserGroupForm {
  id: string;
  name: string;
  concurrencyStamp: string;
}
class UserGroupFormGroup extends CustomFormGroup  {
  constructor() {
    super({
      name: new CustomFormControl("Name", "name", "", "text", "a", Validators.compose([
        Validators.required
        ]))
    })
  }
}

@Component({
  selector: 'usergroup-form-component',
  templateUrl: './user-group-form.component.html'
})
export class UserGroupFormComponent extends ComponentBase implements AfterViewInit {
 
  public model: UserGroupForm = new UserGroupForm();
  public userGroupFormGroup: UserGroupFormGroup = new UserGroupFormGroup();
  public title: string = "User Groups";
  public isEditMode = false;
  public isSubmitting = false;

  public constructor(activatedRoute: ActivatedRoute, private router: Router, private endpoints: EndpointMetadata) {
    super('usergroup-form-component')
    if (activatedRoute.snapshot.params["id"]) {
      this.isEditMode = true;
      this.model.id = activatedRoute.snapshot.params["id"]
    }
  }

  ngOnInit() {
    if (this.model && this.model.id) {
      this.getUserGroup(this.model.id)
      this.inAsyncMode = true
    }
  }

  ngAfterViewInit() {
    this.afterComponentInit();
  }

  public submit() {
    this.isSubmitting = true;
    if (this.userGroupFormGroup.valid) {
      this.inAsyncMode = true
      this.validationErrors = []

      let result: Observable<any>

      if (!this.isEditMode)
        result = this.createUserGroup()
      else 
        result = this.updateUserGroup()
      
      result.subscribe(() => {
      this.router.navigateByUrl("/admin-area/usergroups")
      }, (fail) => {
          this.inAsyncMode = false
          this.handleError(fail)
      });
    }
  }

  private createUserGroup() {
    return this.httpContext.create<any>(this.endpoints.userGroupEndpoints.create, this.model)
  }

  private updateUserGroup() {
    return this.httpContext.update<any>(this.endpoints.userGroupEndpoints.update, this.model)
  }

  private getUserGroup(id: string) {
    this.httpContext.read<any>(this.endpoints.userGroupEndpoints.read + id).subscribe((x) => {
      this.model = x
      this.inAsyncMode = false
    }, (fail) => {
        this.inAsyncMode = false
        this.handleError(fail)
    });
  }
}
