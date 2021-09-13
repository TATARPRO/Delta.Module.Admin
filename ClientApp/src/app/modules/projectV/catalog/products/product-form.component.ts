import { Component, AfterViewInit } from '@angular/core';
import { NotificationType, DialogOptions } from '../../../../core/core-interface';
import { CustomFormControl, CustomFormGroup } from '../../../../core/formControlExtension';
import { Validators } from "@angular/forms";
import ComponentBase from '../../../../core/componentBase';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductForm, ProductOption, Category, ProductVm, Brand,
  ProductAttributeGroupFormVm, ProductAttributeVm} from '../catalog-models';
import { CatalogEndpoints } from '../catalog-endpoints';
import { CoreVEndpoints } from '../../core/corev-endpoints';
import { Country } from '../../core/corev-models';
import { TaxEndpoints } from '../../tax/taxEndpoints';
import { TaxClassListVm } from '../../tax/tax.models';


class ProductFormGroup extends CustomFormGroup {
  constructor() {
      super({
        name: new CustomFormControl("Product Name", "name", "", "text", "a", Validators.compose([
              Validators.required])),
        slug: new CustomFormControl("Slug", "slug", "", "text", "a", Validators.compose([
              Validators.required])),
        price: new CustomFormControl("Price", "price", "", "number", "an", null),
        oldPrice: new CustomFormControl("Old Price", "oldPrice", "", "number", "a", null),
        specialPrice: new CustomFormControl("Special Price", "specialPrice", "", "number", "a", null),
        specialPriceStart: new CustomFormControl("Special PriceStart", "specialPriceStart", "", "number", "a", null),
        specialPriceEnd: new CustomFormControl("Special PriceEnd", "specialPriceEnd", "", "number", "a", null),

        countryId: new CustomFormControl("Location", "countryId", "countries", "select", "a", Validators.compose([
          Validators.required])),
        brandId: new CustomFormControl("Brand", "brandId", "brands", "select", "a", null),
        taxClassId: new CustomFormControl("Tax Class", "taxClassId", "tax Class", "select", "a", Validators.compose([
          Validators.required])),
        
        metaTitle: new CustomFormControl("Meta Title", "metaTitle", "", "text", "a", null),
        metaKeywords: new CustomFormControl("Meta Keywords", "metaKeywords", "", "text", "a", null),
        metaDescription: new CustomFormControl("Meta Description", "metaDescription", "", "text", "a", null),
        sku: new CustomFormControl("SKU", "sku", "", "text", "an", null),
        gtin: new CustomFormControl("GTIN", "gtin", "", "gtin", "a", null),
        hsCode: new CustomFormControl("HS-Code", "hsCode", "", "HS-CODE", "a", null),
        shortDescription: new CustomFormControl("Short Description", "shortDescription", "", "textarea", "an", null),
        description: new CustomFormControl("Description", "description", "", "textarea", "a", null),
        specification: new CustomFormControl("Specification", "specification", "", "textarea", "a", null),
        isPublished: new CustomFormControl("Is Published", "isPublished", "", "checkbox", "an", null),
        isFeatured: new CustomFormControl("Is Featured", "isFeatured", "", "checkbox", "an", null),
        isAllowToOrder: new CustomFormControl("Is Allowed To Order", "isAllowToOrder", "", "checkbox", "an", null),
        isCallForPricing: new CustomFormControl("Is Call For Pricing", "isCallForPricing", "", "checkbox", "an", null),
        stockTrackingIsEnabled: new CustomFormControl("Is Stock Tracking Enabled", "stockTrackingIsEnabled", "", "checkbox", "an", null),
      });
  }
}

@Component({
  selector: 'product-form-component',
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent extends ComponentBase implements AfterViewInit {
  public model: ProductForm = new ProductForm();
  public productFormGroup: ProductFormGroup = new ProductFormGroup();
  public title: string = "Products";
  public isEditMode: boolean = false;
  public isSubmitting: boolean = false;
  
  public addingAttribute = null;
  public addingOption: ProductOption = null;
  public addingVariation: ProductVm = new ProductVm();
  public options: ProductOption[] = new Array<ProductOption>();
  public attributes: ProductAttributeVm[] = new Array<ProductAttributeVm>();
  public attributeGroups: ProductAttributeGroupFormVm[] = new Array<ProductAttributeGroupFormVm>();
  public categories: Category[] = new Array<Category>();
  public countries: Country[] = new Array<Country>();
  public taxClasses: TaxClassListVm[] = new Array<TaxClassListVm>();
  public brands: Brand[] = new Array<Brand>();
  private form = new FormData();
  public productTemplates = [];
  public thumbnailPreviewUrl: any
  public productImagePreviewUrl: any[]
  public productImages: File[] = new Array<File>();

  public constructor(activatedRoute: ActivatedRoute, private router: Router,
    private endpoints: CatalogEndpoints, private coreEndpoints: CoreVEndpoints,
    private taxEndpoints: TaxEndpoints) {
    super('product-form-component')
    this.addingVariation.price = 0;
    if (activatedRoute.snapshot.params["id"]) {
      this.model.product.id = activatedRoute.snapshot.params["id"]
      this.isEditMode = true;
    }
  }

  ngOnInit() {
    this.inAsyncMode = true
    //this.getOptions();
    this.getBrands();
    this.getCountries();
    this.getCategories();
    this.getAttributes();
    this.getAttributeGroups();
    this.getTaxClasses();

    if (this.model && this.model.product.id) {
      this.getProduct(this.model.product.id)
    }
  }

  ngAfterViewInit() {
    this.afterComponentInit();
  }

  public submit() {
    this.isSubmitting = true;
    if (this.productFormGroup.valid) {
      this.validationErrors = []
      
      this.inAsyncMode = true
      this.createFormData();
      var result: Observable<any>

      if (!this.isEditMode) {
         result = this.createProduct() 
      } else {
        result = this.updateProduct()
      }

      result.subscribe(() => {
        this.router.navigateByUrl("/module/projectv/catalog/products")
      },
        (fail) => {
          this.handleError(fail)
          this.inAsyncMode = false
        });

    }
  }

  private createFormData() {
    this.form = new FormData()
    for (let key in this.model) {
      if (key == "product") {
        for (let secondKey in this.model[key]) {
          if (this.model[key][secondKey] instanceof Array) {
            this.model[key][secondKey].forEach((item, index) => {
              if (item) {
                let obj = this.model[key][secondKey][index]
                if (obj instanceof Array) {
                  this.model[key][secondKey][index].forEach((x, xIndex) => {
                    if (x instanceof Array) {
                      x.forEach((y, i) => {
                        if (y != undefined) {
                          this.form.append(`${key}[${secondKey}][${index}][${i}]`, y);
                        }
                      })
                    } else {
                      for (let objK in x) {
                        if (x[objK] != undefined) {
                          this.form.append(`${key}[${secondKey}][${index}][${objK}]`, x[objK]);
                        }
                      }
                    }
                  })
                  // second level working
                } else {
                  if (obj instanceof Object) {
                      for (let third in obj) {
                      if (obj[third] instanceof Array) {
                        obj[third].forEach((itemx, indexI) => {
                          this.form.append(`${key}[${secondKey}][${index}][${third}][${indexI}]`, itemx);
                        })
                      } else {
                        if (this.model[key][secondKey][index][third] != undefined) {
                          this.form.append(`${key}[${secondKey}][${index}][${third}]`, this.model[key][secondKey][index][third]);
                        }
                      }
                    }
                  } else {
                    this.form.append(`${key}[${secondKey}][${index}]`, obj);
                  }
                }
              }
            })
          } else {
            if (this.model[key][secondKey] != undefined) {
              this.form.append(`${key}[${secondKey}]`, this.model[key][secondKey]);
            }
          }
        }
      } else if (key == "productImages" || key == "productDocuments") {
        for (let i = 0; i < this.model[key].length; i++) {
          let file: File = this.model[key][i]
          this.form.append(key, file)
        }
      } else {
        this.form.append(key, this.model[key])
      }
    }
  }

  private createProduct() {
    return this.httpContext.create<any>(this.endpoints.productEndpoints.create, this.form)
  }

  private updateProduct() {
    return this.httpContext.update<any>(this.endpoints.productEndpoints.update + this.model.product.id, this.form)
  }

  private getProduct(id: number) {
    this.httpContext.read<ProductVm>(this.endpoints.productEndpoints.read + id).subscribe((result) => {
      let i, index, optionIds, attributeIds;
      this.model.product = result;
      optionIds = this.options.map((item) => { return item.id; });
      for (i = 0; i < this.model.product.options.length; i = i + 1) {
        index = optionIds.indexOf(this.model.product.options[i].id);
        optionIds.splice(index, 1);
        this.options.splice(index, 1);
      }

      attributeIds = this.attributes.map((item) => { return item.id; });
      for (i = 0; i < this.model.product.attributes.length; i = i + 1) {
        index = attributeIds.indexOf(this.model.product.attributes[i].id);
        attributeIds.splice(index, 1);
        this.attributes.splice(index, 1);
      }

      //if (this.model.product.specialPriceStart) {
      //  this.model.product.specialPriceStart = new Date(this.model.product.specialPriceStart);
      //}
      //if (this.model.product.specialPriceEnd) {
      //  this.model.product.specialPriceEnd = new Date(this.model.product.specialPriceEnd);
      //}
      this.inAsyncMode = false
    }, (fail) => { this.inAsyncMode = false, this.handleError(fail)});
  }
  
  private getCategories() {
    this.httpContext.read<Category[]>(this.endpoints.categoryEndpoints.list).subscribe(x => this.categories = x);
  }

  private getBrands() {
    this.httpContext.read<Brand[]>(this.endpoints.brandEndpoints.list).subscribe(x => this.brands = x);
  }

  private getCountries() {
    this.httpContext.read<any>(this.coreEndpoints.countryEndpoints.list).subscribe(x => this.countries = x);
  }

  private getAttributes() {
    this.httpContext.read<ProductAttributeVm[]>(this.endpoints.productAttributeEndpoints.list).subscribe(x => this.attributes = x);
  }

  private getTaxClasses() {
    this.httpContext.read<any>(this.taxEndpoints.taxClass.list).subscribe((x) => {
      this.taxClasses = x
      if (!this.isEditMode) {
        this.inAsyncMode = false
      }
    });
  }

  private getAttributeGroups() {
    this.httpContext.read<ProductAttributeGroupFormVm[]>(this.endpoints.productAttributeGroupEndpoints.list).subscribe(x => this.attributeGroups = x);
  }

  public attribByGroup(id: number) {
    return this.attributes.filter((item) => {
      return item.groupId == id
    })
  }

  public setCrossSellProducts(data: any) {
    let index = this.model.product.crossSellProducts.findIndex(x => x.id == data.product.id)
    if (index < 0) {
      this.model.product.crossSellProducts.push(data.product)
    }
  }

  public removeCrossSellProducts(data: any) {
    let index = this.model.product.crossSellProducts.findIndex(x => x.id == data.productId)
    if (index > -1) {
      this.model.product.crossSellProducts.splice(index, 1)
    }
  }

  public setRelatedProducts(data: any) {
    let index = this.model.product.relatedProducts.findIndex(x => x.id == data.product.id)
    if (index < 0) {
      this.model.product.relatedProducts.push(data.product)
    }
  }

  public removeRelatedProducts(data: any) {
    let index = this.model.product.relatedProducts.findIndex(x => x.id == data.productId)
    if (index > -1) {
      this.model.product.relatedProducts.splice(index, 1)
    }
  }

  public addOption() {
    this.onModifyOption(()=> {
      this.addingOption.values = [];
      this.addingOption.displayType = "text";
      let index = this.options.indexOf(this.addingOption);
      this.model.product.options.push(this.addingOption);
      this.options.splice(index, 1);
      this.addingOption = null;
    });
  };

  public deleteOption(option) {
    this.onModifyOption(()=> {
      let index = this.model.product.options.indexOf(option);
      this.model.product.options.splice(index, 1);
      this.options.push(option);
    });
  };

  public onModifyOption(callback) {
    if (this.model.product.variations.length === 0) {
      callback();
      return;
    }

    this.showModalDialog("Add/Remove variation", "Add or remove option will clear all existing" +
      "variations.Are you sure you want to proceed ? ", NotificationType.warning, DialogOptions.OkCancel)
      .then(() => {
        setTimeout(()=> {
          this.model.product.variations = [];
          callback();
        }, 1)
      }).catch(() => {})
  }

  public newOptionValue(chip) {
    return {
      key: chip,
      value: ''
    };
  };

  public generateOptionCombination() {
    let maxIndexOption = this.model.product.options.length - 1;
    this.model.product.variations = [];

    let getItemValue = (item)=> {
      return item.value;
    }

    let helper = (arr, optionIndex)=> {
      let j, l, variation, optionCombinations, optionValue;

      for (j = 0, l = this.model.product.options[optionIndex].values.length; j < l; j = j + 1) {
        optionCombinations = arr.slice(0);
        optionValue = {
          optionName: this.model.product.options[optionIndex].name,
          optionId: this.model.product.options[optionIndex].id,
          value: this.model.product.options[optionIndex].values[j].key,
          sortIndex: optionIndex
        };
        optionCombinations.push(optionValue);

        if (optionIndex === maxIndexOption) {
          variation = {
            name: this.model.product.name + ' ' + optionCombinations.map(getItemValue).join(' '),
            normalizedName: optionCombinations.map(getItemValue).join('-'),
            optionCombinations: optionCombinations,
            price: this.model.product.price,
            oldPrice: this.model.product.oldPrice
          };
          this.model.product.variations.push(variation);
        } else {
          helper(optionCombinations, optionIndex + 1);
        }
      }
    }

    helper([], 0);
  };

  public deleteVariation(variation) {
    let index = this.model.product.variations.indexOf(variation);
    this.model.product.variations.splice(index, 1);
  };

  public setThumbnail(fileList: FileList) {
    if (fileList.length > 0) {
      let file: File = fileList[0];
      this.model.thumbnailImage = file
      this.getThumbnailPreview(file)
    }
  }

  public getThumbnailPreview(file: File) {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (event) => { this.thumbnailPreviewUrl = reader.result }
  }

  public setImages(fileList: FileList) {
    this.productImages = new Array<File>();
    this.productImagePreviewUrl = []
    if (fileList.length > 0) {
      for (let i = 0; i < fileList.length; i++) {
        let file: File = fileList[i];
        this.productImages.push(file)
        this.getImagesPreview(file)
      }
      this.model.productImages = this.productImages;
    }
  }

  public getImagesPreview(file: File) {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (event) => { this.productImagePreviewUrl.push(reader.result) }
  }

  public removeImage(media) {
    let index = this.model.product.productImages.indexOf(media);
    this.model.product.productImages.splice(index, 1);
    this.model.product.deletedMediaIds.push(media.id);
  };

  public removeDocument(media) {
    let index = this.model.product.productDocuments.indexOf(media);
    this.model.product.productDocuments.splice(index, 1);
    this.model.product.deletedMediaIds.push(media.id);
  };

  public isAddVariationFormValid() {
    let i;
    if (isNaN(this.addingVariation.price) || this.addingVariation.price === 0) {
      return false;
    }

    for (i = 0; i < this.model.product.options.length; i = i + 1) {
      if (!this.addingVariation[this.model.product.options[i].name]) {
        return false;
      }
    }

    return true;
  };

  public addVariation() {
    let variation, optionCombinations = [];

    this.model.product.options.forEach((option, index) => {
      let optionValue = {
        optionName: option.name,
        optionId: option.id,
        value: this.addingVariation[option.name],
        sortIndex: index
      };
      optionCombinations.push(optionValue);
    });

    variation = {
      name: this.model.product.name + ' ' + optionCombinations.map((item) => {
        return item.value;
      }).join(' '),

      normalizedName: optionCombinations.map((item) => {
        return item.value;
      }).join('-'),

      optionCombinations: optionCombinations,
      price: this.addingVariation.price || this.model.product.price,
      oldPrice: this.addingVariation.oldPrice || this.model.product.oldPrice,
      sku: this.addingVariation.sku,
      gtin: this.addingVariation.gtin
    };

    if (!this.model.product.variations.find((item) => { return item.name === variation.name; })) {
      this.model.product.variations.push(variation);
      let variant = new ProductVm()
      variant.price = this.model.product.price
      variant.oldPrice = this.model.product.oldPrice
    
      this.addingVariation = variant;
    } else {
      this.showDialog("", 'The ' + variation.name + ' already exists')
    }
  };

   //TODO look for a more concise way
  public applyTemplate() {
    let template, i, index, workingAttr, nonTemplateAttrs = [];

    //get product template
    this.httpContext.read<ProductVm>(this.endpoints.productEndpoints.read ).subscribe((response)=> {
      template = response;

      for (i = 0; i < template.attributes.length; i = i + 1) {
        workingAttr = this.model.product.attributes.find((item) => { return item && item.id === template.attributes[i].id; });
        if (workingAttr) {
          continue;
        }
        workingAttr = this.attributes.find((item) => { return item && item.id === template.attributes[i].id; });
        index = this.attributes.indexOf(workingAttr);
        this.attributes.splice(index, 1);
        this.model.product.attributes.push(workingAttr);
      }

      for (i = 0; i < this.model.product.attributes.length; i = i + 1) {
        workingAttr = template.attributes.find((item) => { return item && item.id === this.model.product.attributes[i].id; });
        if (!workingAttr) {
          nonTemplateAttrs.push(this.model.product.attributes[i]);
        }
      }

      for (i = 0; i < nonTemplateAttrs.length; i = i + 1) {
        workingAttr = this.model.product.attributes.find((item) => { return item && item.id === nonTemplateAttrs[i].id; });
        index = this.model.product.attributes.indexOf(workingAttr);
        this.model.product.attributes.splice(index, 1);
        this.attributes.push(workingAttr);
      }
    });
  };

  public addAttribute() {
    let index = this.attributes.findIndex(x => x.id == this.addingAttribute);
    let attribToBeAdded = this.attributes[index]
    this.model.product.attributes.push(attribToBeAdded);
    this.attributes.splice(index, 1);
    this.addingAttribute = null;
  };

  public deleteAttribute(id) {
    let index = this.model.product.attributes.findIndex(x => x.id == id);
    let attribToBeRemoved = this.model.product.attributes[index]
    this.model.product.attributes.splice(index, 1);
    this.attributes.push(attribToBeRemoved);
  };

  public toggleCategories(categoryId: number) {
    let index = this.model.product.categoryIds.indexOf(categoryId);
    if (index > -1) {
      this.model.product.categoryIds.splice(index, 1);
      let childCategoryIds = this.getChildCategoryIds(categoryId);
      childCategoryIds.forEach((childCategoryId)=> {
        index = this.model.product.categoryIds.indexOf(childCategoryId);
        if (index > -1) {
          this.model.product.categoryIds.splice(index, 1);
        }
      });
    } else {
      this.model.product.categoryIds.push(categoryId);
      let category = this.categories.find((item)=> { return item.id === categoryId; });
      if (category) {
        let parentCategoryIds = this.getParentCategoryIds(category.parentId);
        parentCategoryIds.forEach((parentCategoryId)=> {
          if (this.model.product.categoryIds.indexOf(parentCategoryId) < 0) {
            this.model.product.categoryIds.push(parentCategoryId);
          }
        });
      }
    }
  };

  public filterAddedOptionValue(item) {
    if (this.model.product.options.length > 1) {
      return true;
    }
    let optionValueAdded = false;
    this.model.product.variations.forEach((variation)=> {
      let optionValues = variation.optionCombinations.map(function (item) {
        return item.value;
      });
      if (optionValues.indexOf(item) > -1) {
        optionValueAdded = true;
      }
    });

    return !optionValueAdded;
  };
  
  public getParentCategoryIds(categoryId) {
    if (!categoryId) {
      return [];
    }
    let category = this.categories.find((item)=> { return item.id === categoryId; });

    return category ? [category.id].concat(this.getParentCategoryIds(category.parentId)) : [];
  }

  public getChildCategoryIds(categoryId) {
    if (!categoryId) {
      return [];
    }
    let result = [];
    let queue = [];
    queue.push(categoryId);
    while (queue.length > 0) {
      let current = queue.shift();
      result.push(current);
      let childCategories = this.categories.filter((item)=> { return item.parentId === current; });
      childCategories.forEach((childCategory)=> {
        queue.push(childCategory.id);
      });
    }

    return result;
  }

}
