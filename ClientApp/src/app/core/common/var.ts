import { Directive, Input, ViewContainerRef, TemplateRef } from "@angular/core";

// [ngVar]
// https://stackoverflow.com/questions/38582293/how-to-declare-a-variable-in-a-template-in-angular
@Directive({ selector: '[ngVar]' })
export class VarDirective {
  @Input()
  set ngVar(context: any) {
    this.context.$implicit = this.context.ngVar = context;
    this.updateView();
  }

  context: any = {}

  constructor(private vcRef: ViewContainerRef, private templateRef: TemplateRef<any>) {

  }

  updateView() {
    this.vcRef.clear();
    this.vcRef.createEmbeddedView(this.templateRef, this.context)
  }
}
