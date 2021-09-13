import { Component, AfterViewInit, OnInit } from '@angular/core';
import ComponentBase from '../../core/componentBase';
import { EndpointMetadata } from '../../core/endpointMeta';

class SettingGroup {
  id: number;
  name: string;
  iconClass: string;
  description: string;
}

@Component({
  selector: 'setting-group-component',
  templateUrl: './setting-group.component.html'
})
export class SettingGroupComponent extends ComponentBase implements OnInit, AfterViewInit {
  
  public title: string = "Setting Groups";
  public settingGroups: SettingGroup[] = new Array<SettingGroup>();

  public constructor(private endpoints: EndpointMetadata) {
    super('setting-group-component')
  }

  ngOnInit() {
    this.inAsyncMode = true
    this.getGroups();
  }

  ngAfterViewInit() {
    this.afterComponentInit();
  }
  private getGroups() {
    this.httpContext.read<any>(this.endpoints.appSettingGroupEndpoints.list).subscribe(x => {
      this.settingGroups = x
      this.inAsyncMode = false
    }, fail => { this.inAsyncMode = false; this.handleError(fail, true) });
  }
}
