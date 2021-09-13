import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./products/products.module').then(x => x.ProductsModule) },
  { path: 'brands', loadChildren: () => import('./brands/brand.module').then(x => x.BrandsModule) },
  { path: 'categories', loadChildren: () => import('./categories/category.module').then(x => x.CategoriesModule) },
  { path: 'carousel-container1', loadChildren: () => import('./carousel-container/home-carousel.module').then(x => x.HomeCarouselModule) },
  { path: 'category-desktop', loadChildren: () => import('./category-desktop/category-desktop.module').then(x => x.CategoryDesktopModule) },
  { path: 'category-express', loadChildren: () => import('./category-express/category-express.module').then(x => x.CategoryExpressModule) },
  { path: 'category-featured', loadChildren: () => import('./category-featured/category-featured.module').then(x => x.CategoryFeaturedModule) },
  { path: 'category-mobile', loadChildren: () => import('./category-mobile/category-mobile.module').then(x => x.CategoryMobileModule) },
  { path: 'product-express', loadChildren: () => import('./product-express/product-express.module').then(x => x.ProductExpressModule) },
  { path: 'product-picked', loadChildren: () => import('./product-picked/product-picked.module').then(x => x.ProductPickedModule) },
  { path: 'product-catalog', loadChildren: () => import('./product-catalog/product-catalog.module').then(x => x.ProductCatalogModule) },
  { path: 'product-classic-express', loadChildren: () => import('./product-classic-express/product-express.module').then(x => x.ProductClassicExpressModule) },
  { path: 'product-classic-picked', loadChildren: () => import('./product-classic-picked/product-picked.module').then(x => x.ProductClassicPickedModule) },
  { path: 'product-tab1-express', loadChildren: () => import('./product-tab1express/product-express.module').then(x => x.ProductExpressTabModule) },
  { path: 'product-tab1-picked', loadChildren: () => import('./product-tab1picked/product-picked.module').then(x => x.ProductTabPickedModule) },
  { path: 'prattributes', loadChildren: () => import('./product-attribute/product-attribute.module').then(x => x.ProductAttributeModule) },
  { path: 'prattributegrs', loadChildren: () => import('./product-attribute-group/product-attribute.module').then(x => x.ProductAttributeGroupModule) },
  { path: 'proptions', loadChildren: () => import('./product-option/product-option.module').then(x => x.ProductOptionModule) },
  { path: 'products', loadChildren: () => import('./products/products.module').then(x => x.ProductsModule) }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  providers: []
})
export class CatalogVRoutingModule { }

export const CatalogVRoutingComponent = []
