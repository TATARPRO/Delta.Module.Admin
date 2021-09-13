import { Component, AfterViewInit, OnInit } from '@angular/core';
import { NotificationType, DialogOptions } from '../../../core/core-interface';
import ComponentBase from '../../../core/componentBase';
import { EndpointMetadata } from '../../../core/endpointMeta';


export class PageList {
  id: number;
  name: string;
  slug: string;
  publishedOn: string;
  isPublished: boolean;
  dateCreated: string;
  userName: string;
}

@Component({
  selector: 'page-list-component',
  templateUrl: './page-list.component.html'
})
export class PageListComponent extends ComponentBase implements AfterViewInit, OnInit {
 
  public title: string = "Pages";
  public pages: PageList[] = new Array<PageList>();

  public constructor(private endpoints: EndpointMetadata) {
    super('page-list-component')
  }

  ngOnInit() {
    this.getPages();
    this.inAsyncMode = true
  }

  ngAfterViewInit() {
    this.afterComponentInit()
  }
  private getPages() {
    this.httpContext.read<PageList[]>(this.endpoints.webPagEndpoints.list).subscribe((x) => {
      this.pages = x
      this.inAsyncMode = false
    });
  }

  public previewPage(id: number) {
    window.open(`/page-preview/${id}`)
  }

  public makeHomepage(id: number) {

  }

  public deletePage(id: string) {
    this.showModalDialog("Delete Page", "Are you sure you want to delete this page?", NotificationType.warning, DialogOptions.YesCancel)
      .then((result) => {
    this.inAsyncMode = true
        this.httpContext.delete<any>(this.endpoints.webPagEndpoints.delete + id).subscribe(() => {
          this.getPages();
        }, (fail) => {
            this.inAsyncMode = false
          this.handleError(fail, true)
        });
      })
      .catch(() => { })
  }
}
