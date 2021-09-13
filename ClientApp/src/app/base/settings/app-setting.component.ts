import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import ComponentBase from '../../core/componentBase';
import { EndpointMetadata } from '../../core/endpointMeta';

class GroupSetting {
  groupId: number;
  groupName: string;
  settings: AppSetting[];
}

class AppSetting   {
  key: string;
  value: string;
  inputType: string;
}

@Component({
  selector: 'app-setting-component',
  templateUrl: './app-setting.component.html'
})
export class AppSettingComponent extends ComponentBase implements OnInit, AfterViewInit {
  
  public model: GroupSetting = new GroupSetting();
  public title: string = "";
  public isSubmitting = false;

  public constructor(activatedRoute: ActivatedRoute, private router: Router, private endpoints: EndpointMetadata) {
    super('app-setting-component')
    if (activatedRoute.snapshot.params["id"]) {
      this.model.groupId = activatedRoute.snapshot.params["id"]
    }
  }

  ngOnInit() {
    this.inAsyncMode = true
    if (this.model && this.model.groupId) {
      this.getSettings(this.model.groupId)
    }
  }

  ngAfterViewInit() {
    this.afterComponentInit();
  }

  public submit() {
    this.inAsyncMode = true;

    this.updateSettings();
  }

  private updateSettings() {
    return this.httpContext.update<any>(this.endpoints.appSettingEndpoints.update, this.model).subscribe((x) => {
      this.router.navigateByUrl("/settings")
    }, (fail) => {
        this.inAsyncMode = false;
      this.handleError(fail, true)
    });
  }

  private getSettings(id: number) {
    this.httpContext.read<any>(this.endpoints.appSettingEndpoints.read + id).subscribe((x) => {
      this.model = x
      this.inAsyncMode = false
      this.title = this.model.groupName
      this.updatePageTitle(this.title)
    }, (fail) => {
        this.inAsyncMode = false
      this.handleError(fail, true)
    });
  }
}
