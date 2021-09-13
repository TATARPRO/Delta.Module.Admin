import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import ComponentBase from '../../../../core/componentBase';
import { Validators } from '@angular/forms';
import { CustomFormControl, CustomFormGroup } from '../../../../core/formControlExtension';
import { Observable } from 'rxjs';
import { TaxClassForm } from '../tax.models';
import { TaxEndpoints } from '../taxEndpoints';



class TaxClassFormGroup extends CustomFormGroup  {
  constructor() {
    super({
      name: new CustomFormControl("Name", "name", "", "text", "a", Validators.compose([
        Validators.required])),
      isActive: new CustomFormControl("Is Active", "isActive", "", "checkbox", "a", null)
    })
  }
}

@Component({
  selector: 'taxclass-form-component',
  templateUrl: './tax-class-form.component.html'
})
export class TaxClassFormComponent extends ComponentBase implements AfterViewInit, OnInit {

  public model: TaxClassForm = new TaxClassForm();
  public taxClassFormGroup: TaxClassFormGroup = new TaxClassFormGroup();
  public title: string = "Tax Class";
  public isEditMode = false;
  public isSubmitting = false;
  private apiEndpoints = {
   
  }
  
  public constructor(activatedRoute: ActivatedRoute, private router: Router, private taxEndpoints: TaxEndpoints) {
    super('taxclass-form-component')
    if (activatedRoute.snapshot.params["id"]) {
      this.isEditMode = true;
      this.model.id = activatedRoute.snapshot.params["id"]
    }
  }

  ngOnInit() {
    if (this.model && this.model.id) {
      this.getTaxClass(this.model.id)
      this.inAsyncMode = true
    }
  }

  ngAfterViewInit() {
    this.afterComponentInit();
  }

  public submit() {
    this.isSubmitting = true;
    if (this.taxClassFormGroup.valid) {
      this.inAsyncMode = true
      this.validationErrors = []

      let result: Observable<any>
      
      if (!this.isEditMode)
        result = this.createTaxClass()
      else 
        result = this.updateTaxClass()
      
      result.subscribe(() => {
      this.router.navigateByUrl("/module/projectv/tax/tax-class")
      }, (fail) => {
          this.inAsyncMode = false
          this.handleError(fail)
      });
    }
  }

  private createTaxClass() {
    return this.httpContext.create<any>(this.taxEndpoints.taxClass.create, this.model)
  }

  private updateTaxClass() {
    return this.httpContext.update<any>(this.taxEndpoints.taxClass.update + this.model.id, this.model)
  }

  private getTaxClass(id: number) {
    this.httpContext.read<any>(this.taxEndpoints.taxClass.read + id).subscribe((x) => {
      this.model = x
      this.inAsyncMode = false
      }, (fail) => {
        this.inAsyncMode = false
       this.handleError(fail)
    });
  }
}
