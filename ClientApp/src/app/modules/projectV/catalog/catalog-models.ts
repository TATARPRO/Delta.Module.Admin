import { WidgetFormBase } from '../../../core/core-interface';
import { WidgetFormGroup } from '../../../core/widget.common';
import { CustomFormControl } from '../../../core/formControlExtension';

export class ProductListItem {
  id: number;
  name: string;
  hasOptions: boolean;
  isFeatured: boolean;
  isVisibleIndividually: boolean;
  isCallForPricing: boolean;
  stockQuantity: boolean;
  dateCreated: Date;
  isPublished: boolean;
}

export class ProductHistoryItem {
  id: number;
  name: string;
  slug: NonNullable<string>;
  sku: NonNullable<string>;
  gtin: NonNullable<string>;
  hsCode: NonNullable<string>;
  oldPrice: NonNullable<number>;
  specialPrice: NonNullable<number>;
  specialPriceStart: Date;
  specialPriceEnd: Date;
}

export class ProductVm {
  id: number;
  name: NonNullable<string>;
  slug: NonNullable<string>;
  price: NonNullable<number>;
  oldPrice: NonNullable<number>;
  specialPrice: NonNullable<number>;
  specialPriceStart: Date;
  specialPriceEnd: Date;
  countryId: NonNullable<number>;
  brandId: NonNullable<number>;
  taxClassId: NonNullable<number>;
  currencyId: NonNullable<number>;
  metaTitle: NonNullable<string>;
  metaKeywords: NonNullable<string>;
  metaDescription: NonNullable<string>;
  sku: NonNullable<string>;
  gtin: NonNullable<string>;
  hsCode: NonNullable<string>;
  shortDescription: NonNullable<string>;
  description: NonNullable<string>;
  specification: NonNullable<string>;
  isPublished: NonNullable<boolean> = true;
  isAllowToOrder: NonNullable<boolean> = true;
  isFeatured: NonNullable<boolean>;
  isCallForPricing: NonNullable<boolean>;
  stockTrackingIsEnabled: NonNullable<boolean>;
  thumbnailImageUrl: NonNullable<string>;
  categoryIds: number[] = new Array<number>();
  deletedMediaIds: number[] = new Array<number>();
  attributes: ProductAttributeVm[] = new Array<ProductAttributeVm>();
  options: ProductOption[] = new Array<ProductOption>();
  variations: ProductVariationVm[] = new Array<ProductVariationVm>();
  productImages: ProductMediaVm[] = new Array<ProductMediaVm>();
  productDocuments: ProductMediaVm[] = new Array<ProductMediaVm>();
  relatedProducts: ProductLinkVm[] = new Array<ProductLinkVm>();
  crossSellProducts: ProductLinkVm[] = new Array<ProductLinkVm>();
}

export type PropType<TObj, TProp extends keyof TObj> = TObj[TProp];

export class ProductForm {
  product: ProductVm = new ProductVm();
  thumbnailImage: File;
  productImages: File[] = new Array<File>();;
  productDocuments: File[] = new Array<File>();
}

export class ProductAttributeVm {
  id: number;
  attributeValueId: number;
  name: string;
  value: string;
  groupName: string;
  groupId: number;
}

export class ProductAttributeFormVm{
  groupId: number;
  id: number;
  name: string;
}

export class ProductAttributeGroupFormVm {
  id: number;
  name: string;
}

export class ProductOption {
  id: number;
  name: string;
  displayType: string;
  values: ProductOptionValueVm[] = new Array<ProductOptionValueVm>();
}

export class ProductOptionValueVm {
  key: string;
  display: string;
}

export class ProductOptionFormVm {
  id: number;
  name: string;
}

export class ProductTemplateForm {
  id: number;
  name: string;
}

export class ProductVariationVm {
  id: number;
  name: string;
  normalizedName: string;
  sku: string;
  gtin: string;
  price: number;
  oldPrice: number;
  thumbnailImage: File
  thumbnailImageUrl: string;
  newImages: File[] = new Array<File>();
  imageUrls: string[] = new Array<string>();
  optionCombinations: ProductOptionCombinationVm[] = new Array<ProductOptionCombinationVm>()
}

export class ProductOptionCombinationVm {
  optionId: number;
  optionName: string;
  value: string;
  sortIndex: number;
}

export class ProductMediaVm {
  id: number
  caption: string;
  mediaUrl: string;
}

export class ProductLinkVm {
  id: number;
  name: string;
  isPublished: boolean;
}

export class Brand {
  id: number;
  name: string;
  slug: string;
  isPublished: boolean;
  description: string;
  metaTitle: string;
  metaKeywords: string;
  metaDescription: string;
  iconClass: string;
}

export class BrandForm extends Brand {
  thumbnailImageUrl: string;
  thumbnailPreviewUrl: any;
  thumbnailImage: File;
}

export class Category {
  id: number;
  slug: string;
  name: string;
  isPublished: boolean = true
  includeInSearch: boolean;
  displayOrder: number;
  parentId: number;
}

export class CategoryForm extends Category {
  description: string;
  metaTitle: string;
  metaKeywords: string;
  metaDescription: string;
  iconClass: string;
  thumbnailImageUrl: string;
  thumbnailImage: File;
  thumbnailPreviewUrl: any;
}

export class CategoryWidgetFormGroup extends WidgetFormGroup {
  constructor() {
    super({
      categories: new CustomFormControl("Categories", "categories", "", "select", "a", null)
    })
  }
}

export class CategoryWidgetForm extends WidgetFormBase {
  public settings: CategoryWidgetSettings = new CategoryWidgetSettings();
  
}

export class CategoryWidgetSettings {
  public categories: number[] = new Array<number>();
}

export class ProductWidgetForm extends WidgetFormBase {
  public setting: ProductWidgetSettings = new ProductWidgetSettings();
}

export class ProductWidgetSettings {
  categoryId: number;
  iconUrl: string;
  countryId: string;
  numberOfProducts: number
  orderBy: number
  featuredOnly: boolean
}

export class ProductWidgetFormGroup extends WidgetFormGroup {
  constructor() {
    super({
      categoryId: new CustomFormControl("Category", "categoryId", "", "select", "a", null),
      numberOfProducts: new CustomFormControl("Number Of Products", "numberOfProducts", "", "number", "a", null),
      orderBy: new CustomFormControl("OrderBy", "order By", "", "select", "a", null),
      featuredOnly: new CustomFormControl("Featured Only", "featuredOnly", "", "checkbox", "a", null)
    })
  }
}

export class TabbedWidgetForm extends WidgetFormBase {
  public items: TabbedWidgetSettings[] = new Array<TabbedWidgetSettings>();
  public iconUrl: string;
}

export class TabbedWidgetSettings {
  tabName: string;
  leftImage: any;
  rightImage: any;
  categoryId: number;
  countryId: number;
  numberOfProducts: number
  orderBy: number
  featuredOnly: boolean
}

export class ProductPickedTabSetting {
  tabName: string;
  leftImage: any;
  rightImage: any;
  orderBy: number;
  selectedProducts: ProductLinkVm[] = new Array<ProductLinkVm>()
}

export class ProductPickedTabForm extends WidgetFormBase {
  public items: ProductPickedTabSetting[] = new Array<ProductPickedTabSetting>();
  public iconUrl: string
}

export class ProductClassicExpressForm extends WidgetFormBase {
  setting: ProductClassicExpressSetting = new ProductClassicExpressSetting();
}

export class ProductClassicExpressSetting {
  promotedSettings: ProductExpressPromoted = new ProductExpressPromoted();
  saleSettings: ProductExpressSale = new ProductExpressSale();
}

export class ProductClassicPickedForm extends WidgetFormBase {
  setting: ProductClassicPickedSetting = new ProductClassicPickedSetting();
}

export class ProductClassicPickedSetting {
  promotedSettings: ProductPickedPromoted = new ProductPickedPromoted();
  saleSettings: ProductExpressSale = new ProductExpressSale();
}

export class ProductPickedPromoted {
  name: string
  iconUrl: string;
  selectedProducts: ProductLinkVm[] = new Array<ProductLinkVm>();
}

export class ProductExpressPromoted extends ProductWidgetSettings {
  name: string
}

export class ProductExpressSale {
  name: string;
  productId: number;
  iconUrl: string
}

export class ProductPickedForm extends WidgetFormBase {
  public setting: ProductPickedSetting = new ProductPickedSetting();
}

export class ProductPickedSetting {
  iconUrl: string;
  products: ProductLinkVm[] = new Array<ProductLinkVm>();
}
