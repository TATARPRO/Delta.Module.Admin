import { Component } from '@angular/core';

@Component({
  selector: 'nav-left',
  templateUrl: './nav-left.component.html'
})
export class NavLeftComponent {
  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
