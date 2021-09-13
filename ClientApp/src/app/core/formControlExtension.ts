import { FormControl, FormGroup } from "@angular/forms";

export class CustomFormControl extends FormControl {
  public label: string;
  public modelProperty: string;
  public type: string;
  public article: string;

  /**
   *
   * @param label The label attached to the control. This label is displayed to the user in error messages
   * @param property The model property to associate this control with
   * @param value The default value for the control
   * @param type The type of html control e.g text, email, password
   * @param article The article parameter is used to designate the proper to be used when displaying eror messages
   * for instance in the case of an email, the article 'an' will be used instead of a E.g An email is required
   * @param validator an array of Validators
   */
  constructor(label: string, property: string, value: any, type: string, article: string = "a", validator: any = null) {
    super(value, validator);
    this.label = label;
    this.modelProperty = property;
    this.type = type;
    this.article = article;
  }

  getValidationMessages() {
    let messages: string[] = [];
    if (this.errors) {
      for (let errorName in this.errors) {
        switch (errorName) {
          case "required":
            messages.push(`Please enter ${this.article} ${this.label}`);
            break;
          case "min":
            messages.push(`${this.article} ${this.label} must be at least ${this.errors['minlength'].requiredLength} characters long`);
            break;
          case "minlength":
            messages.push(`${this.article} ${this.label} must be at least ${this.errors['minlength'].requiredLength} characters long`);
            break;
          case "max":
            messages.push(`${this.article} ${this.label} must be not more than ${this.errors['maxlength'].requiredLength} characters long`);
            break;
          case "maxlength":
            messages.push(`${this.article} ${this.label} must be not more than ${this.errors['maxlength'].requiredLength} characters long`);
            break;
          case "pattern":
            messages.push(`The ${this.label} contains unwanted characters`);
            break;
          case "comparison":
            messages.push(`The ${this.label} comparison does not match`);
            break;
        }
      }
    }
    return messages;
  }
}

export class CustomFormGroup extends FormGroup {
  constructor(controls: { [key: string]: CustomFormControl; }) {
    super(controls)
  }

  get formControls(): CustomFormControl[] {
    return Object.keys(this.controls)
      .map(k => this.controls[k] as CustomFormControl);
  }

  public formControl(name: string): CustomFormControl {
    return this.controls[name] as CustomFormControl
  }

  getFormValidationMessages(form: any): string[] {
    let messages: string[] = [];
    this.formControls.forEach(c => c.getValidationMessages()
      .forEach(m => messages.push(m)));
    return messages;
  }
}
