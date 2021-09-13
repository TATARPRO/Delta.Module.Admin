import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Search, SmartTableResult } from '../../../../core/core-interface';
import { ProductVm, ProductLinkVm } from '../catalog-models';
import { CatalogEndpoints } from '../catalog-endpoints';
import ComponentBase from '../../../../core/componentBase';


@Component({
  selector: 'product-selection',
  templateUrl: './product-selection.component.html'
})
export class ProductSelectionComponent extends ComponentBase implements OnInit {
 
  public isLoading;

  @Input("modalLabel")
  modalLabel

  @Input("targetId")
  targetId

  @Input("selectedProducts")
  selectedProducts: ProductLinkVm[];

  @Input("isVisibleIndividually")
  isVisibleIndividually: boolean

  @Output("sendSelectedProduct")
  sendSelectedProduct = new EventEmitter<any>();

  @Output("sendRemovedProduct")
  sendRemovedProduct = new EventEmitter<any>();

  public constructor(private endpoints: CatalogEndpoints) {
    super("product-selection")
    this.smartTableResult.items = new Array<ProductVm>();
    this.paginationFetchUrl = this.endpoints.productEndpoints.list;
  }

  ngOnInit() {
    this.getProducts()
  }

  private getProducts() {
    
    this.smartTableParam.search = this.smartTableParam.search || new Search();
    this.smartTableParam.search.predicateObject = this.smartTableParam.search.predicateObject || {};
    this.smartTableParam.search.predicateObject.IsVisibleIndividually = this.isVisibleIndividually;
    this.smartTableParam.search.predicateObject.IsPublished = "true";
    this.isLoading = true;

    this.httpContext.search<SmartTableResult>(this.endpoints.productEndpoints.list, this.smartTableParam).subscribe((x) => {
      this.smartTableResult = x

      this.smartTableParam.pagination.pageSize = this.smartTableResult.pageSize;
      this.smartTableParam.pagination.requestedPage = this.smartTableResult.currentPage;
      this.isLoading = false;

    });
  };

  public toggleSelectedProducts(id) {
    let selectedProduct = this.smartTableResult.items.find(x => x.id == id);
    
    if (this.selectedProducts) {
      let index = this.selectedProducts.findIndex(x => x.id == id);
      if (index > -1) {
        this.selectedProducts.splice(index, 1);
        this.sendRemovedProduct.emit({ productId: id })
      } else {
        let prod = new ProductLinkVm();
        prod.id = selectedProduct.id
        prod.name = selectedProduct.name
        prod.isPublished = selectedProduct.isPublished;

        this.selectedProducts.push(prod);
        this.sendSelectedProduct.emit({ product: prod })
      }
    }else {
      this.selectedProducts = new Array<ProductLinkVm>()
      let prod = new ProductLinkVm();
      prod.id = selectedProduct.id
      prod.name = selectedProduct.name
      prod.isPublished = selectedProduct.isPublished;

      this.selectedProducts.push(prod);
      this.sendSelectedProduct.emit({ product: prod })
    }
  };

  public checkSelected(product) {
    if (this.selectedProducts) {
      var selected = this.selectedProducts.find(x => x.id === product.id);
      return selected ? true : false;
    } else {
      this.selectedProducts = new Array<ProductLinkVm>()
      return false;
    }
  };
}
