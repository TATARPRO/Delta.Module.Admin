import { FormControl } from "@angular/forms";

/**
 * A validator for comparing two input controls
 */
export class ComparisonValidator {

  /**
   * Compares the value of the control to a control which has the same parent with the current control.
   * @param comparer The control name to be validated against
   * @returns An object with a single key ```{ comparison : {comaparison: value of the comparing elemtnt }}```
   */
  static Compare(comparer: string) {
    return (control: FormControl): { [key: string]: any } => {
      let val = control.value;
      if (control.parent != undefined && val != control.parent.controls[comparer].value || val == undefined || val == null || val == "") {
        return { "comparison": { "comparison": val, } };
      } else {
        return null;
      }
    }
  }
}
