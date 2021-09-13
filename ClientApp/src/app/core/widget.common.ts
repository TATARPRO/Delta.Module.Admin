import { CustomFormGroup, CustomFormControl } from "./formControlExtension";
import { Validators } from "@angular/forms";
import { WidgetFormBase } from "./core-interface";

export class ContainerWidgetId {
  displayOrder: number;
  widgetInstanceId: number;
}

export class WidgetFormGroup extends CustomFormGroup {
  constructor();
  constructor(controls: { [key: string]: CustomFormControl; });
  constructor(controls?: { [key: string]: CustomFormControl; }) {
    super({
      ...controls,
      name: new CustomFormControl("Name", "name", "", "text", "a", Validators.compose([
        Validators.required
      ])),
      publishStart: new CustomFormControl("Publish Start", "publishStart", "", "datetime"),
      publishEnd: new CustomFormControl("Publish End", "publishEnd", "", "datetime"),
      displayOrder: new CustomFormControl("Display Order", "displayOrder", "", "number"),
    })
  }
}

export class Container10Settings {
  column10: ContainerWidgetId[] = new Array<ContainerWidgetId>();
  column2: ContainerWidgetId[] = new Array<ContainerWidgetId>();
}

export class Container10Form extends WidgetFormBase {
  settings: Container10Settings = new Container10Settings();
}

export class Container363Settings {
  leftColumn: ContainerWidgetId[] = new Array<ContainerWidgetId>();
  middleColumn: ContainerWidgetId[] = new Array<ContainerWidgetId>();
  rightColumn: ContainerWidgetId[] = new Array<ContainerWidgetId>();
}

export class Container363Form extends WidgetFormBase {
  settings: Container363Settings = new Container363Settings();
}

export class Container9Settings {
  column9: ContainerWidgetId[] = new Array<ContainerWidgetId>();
  column3: ContainerWidgetId[] = new Array<ContainerWidgetId>();
}

export class Container9Form extends WidgetFormBase {
  settings: Container9Settings = new Container9Settings();
}

export class Container8Settings {
  column4: ContainerWidgetId[] = new Array<ContainerWidgetId>();
  column8: ContainerWidgetId[] = new Array<ContainerWidgetId>();
}

export class Container8Form extends WidgetFormBase {
  settings: Container8Settings = new Container8Settings();
}

export class ContainerX12Settings {
  children: ContainerWidgetId[] = new Array<ContainerWidgetId>();
}

export class ContainerX12Form extends WidgetFormBase {
  settings: ContainerX12Settings = new ContainerX12Settings();
}

export class ContainerX2Settings {
  column1: ContainerWidgetId[] = new Array<ContainerWidgetId>();
  column2: ContainerWidgetId[] = new Array<ContainerWidgetId>();
  column3: ContainerWidgetId[] = new Array<ContainerWidgetId>();
  column4: ContainerWidgetId[] = new Array<ContainerWidgetId>();
  column5: ContainerWidgetId[] = new Array<ContainerWidgetId>();
  column6: ContainerWidgetId[] = new Array<ContainerWidgetId>();
}

export class ContainerX2Form extends WidgetFormBase {
  settings: ContainerX2Settings = new ContainerX2Settings();
}

export class ContainerX3Settings {
  column1: ContainerWidgetId[] = new Array<ContainerWidgetId>();
  column2: ContainerWidgetId[] = new Array<ContainerWidgetId>();
  column3: ContainerWidgetId[] = new Array<ContainerWidgetId>();
  column4: ContainerWidgetId[] = new Array<ContainerWidgetId>();
}

export class ContainerX3Form extends WidgetFormBase {
  settings: ContainerX3Settings = new ContainerX3Settings();
}

export class ContainerX4Settings {
  column1: ContainerWidgetId[] = new Array<ContainerWidgetId>();
  column2: ContainerWidgetId[] = new Array<ContainerWidgetId>();
  column3: ContainerWidgetId[] = new Array<ContainerWidgetId>();
}

export class ContainerX4Form extends WidgetFormBase {
  settings: ContainerX4Settings = new ContainerX4Settings();
}

export class ContainerX6Settings {
  leftColumn: ContainerWidgetId[] = new Array<ContainerWidgetId>();
  rightColumn: ContainerWidgetId[] = new Array<ContainerWidgetId>();
}

export class ContainerX6Form extends WidgetFormBase {
  settings: ContainerX6Settings = new ContainerX6Settings();
}
