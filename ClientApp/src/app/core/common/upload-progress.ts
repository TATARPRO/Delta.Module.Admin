import { Component, Input } from '@angular/core';

@Component({
  selector: 'linear-progress-bar',
  template: `<div *ngIf="showLabel" class="d-flex justify-content-between mt-2">
     <small>{{label}}</small>
     <small>{{percent}}%</small>
     </div>
     <div class="progress progress-md mt-2">
     <div class="progress-bar bg-{{color}}" role="progressbar" style="width: {{percent}}%" aria-valuemin="0" aria-valuemax="100">{{percent}}%</div>
     </div>`
})
export class LinearProgressBar {
  @Input() color: string;
  @Input() percent: number
  @Input() label: number
  @Input() showLabel: boolean

}


@Component({
  selector: 'circular-progress-bar',
  template: `<div id="circleProgress1" class="progressbar-js-circle border rounded p-3"></div>`
})
export class CircularProgressBar {
  @Input() color: string;
  @Input() percent: number

}


@Component({
  selector: 'loading1',
  styleUrls: ['../../../assets/css/loaders.css'],
  template: `<div class="loader1">Loading...</div>`
})
export class Loading1 { }

@Component({
  selector: 'loading2',
  styleUrls: ['../../../assets/css/loaders.css'],
  template: `<div class="loader2">Loading...</div>`
})
export class Loading2 { }

@Component({
  selector: 'loading3',
  styleUrls: ['../../../assets/css/loaders.css'],
  template: `<div class="loader3">Loading...</div>`
})
export class Loading3 { }

@Component({
  selector: 'loading4',
  styleUrls: ['../../../assets/css/loaders.css'],
  template: `<div class="loader4">Loading...</div>`
})
export class Loading4 {}

@Component({
  selector: 'loading5',
  styleUrls: ['../../../assets/css/loaders.css'],
  template: `<div class="loader5">Loading...</div>`
})
export class Loading5 {}

@Component({
  selector: 'loading6',
  styleUrls: ['../../../assets/css/loaders.css'],
  template: `<div class="loader6">Loading...</div>`
})
export class Loading6 {}

@Component({
  selector: 'loading7',
  styleUrls: ['../../../assets/css/loaders.css'],
  template: `<div class="loader7">Loading...</div>`
})
export class Loading7 {}

@Component({
  selector: 'loading8',
  styleUrls: ['../../../assets/css/loaders.css'],
  template: `<div class="loader8">Loading...</div>`
})
export class Loading8 {}
