import { Component, AfterViewInit } from '@angular/core';
import ComponentBase from '../../core/componentBase';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent extends ComponentBase implements AfterViewInit {
 
  constructor() {
    super('admin-dashboard')
  }

  ngAfterViewInit() {
    this.afterComponentInit()
  }
}
