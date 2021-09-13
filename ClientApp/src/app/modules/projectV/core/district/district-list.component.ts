import { Component, AfterViewInit, OnInit } from '@angular/core';
import ComponentBase from '../../../../core/componentBase';
import { CoreVEndpoints } from '../corev-endpoints';
import { District } from '../corev-models';


@Component({
  selector: 'district-list-component',
  templateUrl: './district-list.component.html'
})
export class DistrictListComponent extends ComponentBase implements AfterViewInit, OnInit {
  
  public title: string = "Districts";
  public districts: District[] = new Array<District>();

  public constructor(private enpoints: CoreVEndpoints) {
    super('district-list-component')
  }

  ngOnInit() {
    this.getDistricts();
    this.inAsyncMode = true
  }

  ngAfterViewInit() {
    this.afterComponentInit()
  }
  private getDistricts() {
    this.httpContext.read<any>(this.enpoints.districtEndpoints.read).subscribe((x) => {
      this.districts = x
      this.inAsyncMode = false
    }, (fail) => { this.inAsyncMode = false; this.handleError(fail) });
  }
}
