import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FlexTemplate } from '../../../core/core-interface';
import { EndpointMetadata } from '../../../core/endpointMeta';
import HttpContext from '../../../core/httpContext';
import ArialTranslate from '../../../core/translateService';


@Component({
  selector: 'flex-templates',
  templateUrl: './flex-template.component.html'
})
export class FlexTemplateComponent implements OnInit {
 
  public flexTemplates: FlexTemplate[] = new Array<FlexTemplate>();

  @Output("flexContent")
  flexContent = new EventEmitter<any>();

  public constructor(private endpoints: EndpointMetadata, private httpContext: HttpContext, private arialTranslate: ArialTranslate) {
    
  }

  ngOnInit() {
    this.getTemplates()
  }

  public getFlex(name: string) {
    this.httpContext.read<any>(this.endpoints.flexEndpoints.flex + name).subscribe((x) => {
      this.flexContent.emit({ content: x.content });
    });
  }

  public translate(key: string) {
    return this.arialTranslate.translate(key);
  }

  private getTemplates() {
    this.httpContext.read<FlexTemplate[]>(this.endpoints.flexEndpoints.flexTemplates).subscribe((x) => {
      this.flexTemplates = x
    });
  }
}
