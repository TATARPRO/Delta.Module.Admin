import { NgModule } from "@angular/core";
import { DeltaPaginationComponent } from './paginationDirective';
import { VarDirective } from './var';
import {
  LinearProgressBar, CircularProgressBar, Loading1, Loading2, Loading3, Loading4,
  Loading5, Loading6, Loading7, Loading8
} from './upload-progress';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SlugifyDirective, ToolTipDirective } from "./slugify";
import { DeltaCheckboxComponent, DeltaFileUploadComponent } from "./checkbox";
import { DateTimePickerComponent, DateTimePickerDirective } from "./datetime-picker";

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [DeltaPaginationComponent, VarDirective, LinearProgressBar, CircularProgressBar,
    Loading1, Loading2, Loading3, Loading4, Loading5, Loading6, Loading7, Loading8, SlugifyDirective,
    DeltaCheckboxComponent, DeltaFileUploadComponent, ToolTipDirective, DateTimePickerComponent, DateTimePickerDirective
  ],
  exports: [DeltaPaginationComponent, VarDirective, LinearProgressBar, CircularProgressBar,
    Loading1, Loading2, Loading3, Loading4, Loading5, Loading6, Loading7, Loading8, SlugifyDirective,
    DeltaCheckboxComponent, DeltaFileUploadComponent, ToolTipDirective, DateTimePickerComponent, DateTimePickerDirective
  ],
  providers: []
})
export class DeltaCommonsModule { }
