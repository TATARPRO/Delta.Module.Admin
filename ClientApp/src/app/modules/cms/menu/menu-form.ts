import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import ComponentBase from '../../../core/componentBase';
import { NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { EndpointMetadata } from '../../../core/endpointMeta';
import { MenuType, MenuForm } from '../../../core/core-interface';
import { CustomFormGroup, CustomFormControl } from '../../../core/formControlExtension';


export class MenuFormGroup extends CustomFormGroup {
  constructor() {
    super({
      name: new CustomFormControl("Name", "name", "", "text", "a", Validators.compose([
        Validators.required
      ])),
      isPublished: new CustomFormControl("Is Published", "isPublished", "", "checkbox"),
    })
  }
}

@Component({
  selector: 'menu-component',
  templateUrl: './menu-form.html'
})
export class MenuFormComponent extends ComponentBase implements OnInit, AfterViewInit {

  public model: MenuForm = new MenuForm();
  public menuFormGroup: MenuFormGroup = new MenuFormGroup();
  public title: string = "Create menu";
  public menuTypes: MenuType[] = new Array<MenuType>();
  public isEditMode = false;
  public isSubmitting = false;

  public constructor(activatedRoute: ActivatedRoute, private router: Router, private endpoints: EndpointMetadata) {
    super('menu-component')
    if (activatedRoute.snapshot.params["id"]) {
      this.isEditMode = true;
      this.model.id = activatedRoute.snapshot.params["id"]
    }
    this.updatePageTitle("Create menu: Delta Admin")
  }

  ngOnInit() {
    this.inAsyncMode = true
    this.getMenuTypes();

    if (this.model && this.model.id) {
      this.getMenu(this.model.id)
    }
  }

  ngAfterViewInit() {
    this.afterComponentInit();
  }

  public submit() {
    this.isSubmitting = true;
    if (this.menuFormGroup.valid) {
      this.inAsyncMode = true
      this.validationErrors = []

      let result: Observable<any>

      if (!this.isEditMode)
        result = this.createMenu()
      else 
        result = this.updateMenu()
      
      result.subscribe(() => {
        this.router.navigateByUrl("/module/cms/menus")
      }, (fail) => {
          this.handleError(fail)
          this.inAsyncMode = false
      });
    }
  }

  private createMenu() {
    return this.httpContext.create<any>(this.endpoints.menuEndpoints.create, this.model)
  }

  private updateMenu() {
    return this.httpContext.update<any>(this.endpoints.menuEndpoints.update + this.model.id, this.model)
  }

  private getMenuTypes() {
    this.httpContext.read<any>(this.endpoints.menuTypeEndpoints.list).subscribe((result) => {
      this.menuTypes = result;
      if (!this.isEditMode) {
        this.inAsyncMode = false
      }
    }, (fail) => {
      this.handleError(fail, true)
    });
  }

  private getMenu(id: number) {
    this.httpContext.read<any>(this.endpoints.menuEndpoints.read + id).subscribe((x) => {
      this.model = x
      this.inAsyncMode = false
    }, (fail) => {
        this.inAsyncMode = false
      this.handleError(fail, true)
    });
  }
}
