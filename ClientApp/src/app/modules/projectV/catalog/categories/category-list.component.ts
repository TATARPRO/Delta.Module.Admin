import { Component, AfterViewInit, OnInit } from '@angular/core';
import ComponentBase from '../../../../core/componentBase';
import { Category } from '../catalog-models';
import { CatalogEndpoints } from '../catalog-endpoints';



@Component({
  selector: 'category-list-component',
  templateUrl: './category-list.component.html'
})
export class CategoryListComponent extends ComponentBase implements AfterViewInit, OnInit {

  public title: string = "Categories";
  public categories: Category[] = new Array<Category>();

  public constructor(private endpoints: CatalogEndpoints) {
    super('category-list-component')
  }

  ngOnInit() {
    this.inAsyncMode = true
    this.getCategories();
  }

  ngAfterViewInit() {
    this.afterComponentInit()
  }
  private getCategories() {
    this.httpContext.read<any>(this.endpoints.categoryEndpoints.list).subscribe((x) => {
      this.categories = x
      this.inAsyncMode = false
    }, (fail) => { this.inAsyncMode = false; this.handleError(fail) });
  }

  public deleteCategory(id: string) {
    this.inAsyncMode = true
    this.httpContext.delete<any>(this.endpoints.categoryEndpoints.delete + id).subscribe(() => {
      this.getCategories();
    }, (fail) => {
        this.inAsyncMode = false
        this.handleError(fail)
    });
  }
}
