import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Menu, NotificationType, DialogOptions } from '../../../core/core-interface';
import ComponentBase from '../../../core/componentBase';
import { EndpointMetadata } from '../../../core/endpointMeta';
import { Router } from '@angular/router';


@Component({
  selector: 'menu-list-component',
  templateUrl: './menu-list.component.html'
})
export class MenuListComponent extends ComponentBase implements AfterViewInit, OnInit {
 
  public title: string = "Menus";
  public menus: Menu[] = new Array<Menu>();

  public constructor(private router: Router, private endpoints: EndpointMetadata) {
    super('menu-list-component')
  }

  ngOnInit() {
    this.inAsyncMode = true
    this.getMenus();
  }

  ngAfterViewInit() {
    this.afterComponentInit()
  }
  private getMenus() {
    this.httpContext.read<any>(this.endpoints.menuEndpoints.list).subscribe((x) => {
      this.menus = x
      this.inAsyncMode = false
    });
  }

  public gotoSettings(id: number) {
    this.router.navigateByUrl("/module/cms/menus/settings/" + id)
  }

  public copyMenuCode(id: number) {
    let code = `@await Component.InvokeAsync("Menu", new { menuId = ${id}L })`

    const element = document.createElement('textarea');
    element.style.opacity = '0';
    element.value = code;
    document.body.appendChild(element);
    element.focus();
    element.select();
    document.execCommand('copy');
    document.body.removeChild(element);
  }

  public deleteMenu(id: string) {
    this.showModalDialog("Delete menu", "Are you sure you want to delete this menu?", NotificationType.warning, DialogOptions.YesNo)
      .then((result) => {
    this.inAsyncMode = true
        this.httpContext.delete<any>(this.endpoints.menuEndpoints.delete + id).subscribe(() => {
          this.getMenus();
        }, (fail) => {
            this.inAsyncMode = false
          this.handleError(fail)
        });
      })
  }
}
