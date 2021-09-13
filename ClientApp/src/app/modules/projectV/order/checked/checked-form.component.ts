import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import ComponentBase from '../../../../core/componentBase';
import { Validators } from '@angular/forms';
import { CustomFormControl, CustomFormGroup } from '../../../../core/formControlExtension';
import { Observable } from 'rxjs';
import { AddressFormVm, OrderCreatedResult, CheckoutOrderDetail, CheckoutProduct } from '../order.models';
import { CoreVEndpoints } from '../../core/corev-endpoints';
import { Country } from '../../core/corev-models';
import { OrderEndpoints } from '../orderEndpoints';
import { NotificationType, SmartTableResult, User } from '../../../../core/core-interface';
import { EndpointMetadata } from '../../../../core/endpointMeta';
import { CatalogEndpoints } from '../../catalog/catalog-endpoints';


class AddressFormGroup extends CustomFormGroup {
  constructor() {
    super({
      contactName: new CustomFormControl("Contact Name", "contactName", "", "text", "a", Validators.compose([
        Validators.required])),
      phone: new CustomFormControl("Phone", "phone", "", "text", "a", Validators.compose([
        Validators.required])),
      stateOrProvinceId: new CustomFormControl("State Or Province", "stateOrProvinceId", "", "select", "a", Validators.compose([
        Validators.required])),
      addressLine1: new CustomFormControl("Address Line 1", "addressLine1", "", "text", "a", Validators.compose([
        Validators.required])),
      countryId: new CustomFormControl("Country", "countryId", "", "number", "", Validators.compose([
        Validators.required])),
      districtId: new CustomFormControl("District", "districtId", "", "number", "", null),
      city: new CustomFormControl("City", "city", "", "text", "a", null),
      zipCode: new CustomFormControl("Zip Code", "zipCode", "", "text", "a", null),
    })
  }
}

class UserInfoSnapshot {
  id: string
  email: string
  fullName: string
  phoneNumber: string
  userName: string
}

@Component({
  selector: 'checked-form-component',
  templateUrl: './checked-form.component.html'
})
export class CheckedFormComponent extends ComponentBase implements AfterViewInit, OnInit {
  public userInfo = new UserInfoSnapshot();
  public users: User[];
  public model: CheckoutOrderDetail = new CheckoutOrderDetail();
  public shippingFormGroup: AddressFormGroup = new AddressFormGroup();
  public billingFormGroup: AddressFormGroup = new AddressFormGroup();
  public newShippingAddress: AddressFormVm = new AddressFormVm();
  public newBillingAddress: AddressFormVm = new AddressFormVm();
  public title: string = "Orders";
  public countries: Country[] = new Array<Country>();
  public states: [];
  public isEditMode = false;
  public isSubmitting = false;
  public isSearchingCustomers = false;
  public isSearchingProducts = false;
  public products: [];
  private cart: any = {}
  

  public constructor(activatedRoute: ActivatedRoute, private router: Router,
    private catalogEndpoints: CatalogEndpoints, private orderEndpoints: OrderEndpoints, private endpointMeta: EndpointMetadata) {
    super('checked-form-component')
    if (activatedRoute.snapshot.params["id"]) {
      this.isEditMode = true;
      this.model.orderId = activatedRoute.snapshot.params["id"]
      this.model.customerId = activatedRoute.snapshot.params["customerId"]
    }
  }

  ngOnInit() {
    if (this.model && this.model.orderId) {
      this.inAsyncMode = true
      this.getCountries()
      this.getCheckoutDetail(this.model.orderId, this.model.customerId)
    }
  }

  ngAfterViewInit() {
    this.afterComponentInit();
  }

  public submit() {
    this.isSubmitting = true;
    if (this.model.checkoutProducts && this.model.checkoutProducts.length > 0 && this.model.customerId != undefined) {
      if (this.model.selectedShippingAddressId == 0 && !this.newShippingAddress && !this.shippingFormGroup.valid) {
        return
      }

      this.inAsyncMode = true
      this.validationErrors = []

      if (!this.isEditMode)
        this.addProductsToCart()
      else 
        this.router.navigateByUrl("/module/projectv/order/checked")
    }
  }

  public searchUser($event) {
    let q = $event.target.value
    if (q.length > 3) {
      this.isSearchingCustomers = true
      this.httpContext.read<any>(this.endpointMeta.userEndpoints.quickSearch + q).subscribe((x) => {
        this.users = x
        this.isSearchingCustomers = false
      }, (x) => {
        this.validationErrors = []
        this.handleError(x)
      })
    }
  }

  public selectUser(id: string) {
    this.inAsyncMode = true
    this.httpContext.read<any>(this.endpointMeta.userEndpoints.read + id).subscribe((x) => {
      this.userInfo = x
      this.isSearchingCustomers = true
      this.model.customerId = this.userInfo.id
      if (this.isEditMode) {
        this.inAsyncMode = false
      } else {
        this.getShippingAddressess(this.model.customerId)
        this.getCountries();
      }
    }, (x) => { this.inAsyncMode = false; this.handleError(x) })
  }


  public searchProduct($event) {
    let q = $event.target.value
    if (q.length > 3) {
      this.isSearchingProducts = true
      this.httpContext.read<any>(this.catalogEndpoints.productEndpoints.basicSearch + q).subscribe((x) => {
        this.products = x
        this.isSearchingProducts = false 
      }, (x) => { this.inAsyncMode = false; this.handleError(x) })
    }
  }

  public updateQuantity(id, productId) {
    if (this.isEditMode) {
      let index = this.model.checkoutProducts.findIndex(x => x.id == id)
      if (index > -1) {
        this.inAsyncMode = true
        this.httpContext.update<any>(`/projectv/checkout/${ this.model.customerId }/update-quantity/${ this.model.orderId }`, { cartItemId: id, quantity: this.model.checkoutProducts[index].quantity }).subscribe(x => {
          this.model = x
          this.inAsyncMode = false
        }, fail => {
          this.inAsyncMode = false
          this.handleError(fail)
        })
      }
    } else {
      let index = this.model.checkoutProducts.findIndex(x => x.productId == productId)
      if (index > -1) {
        this.model.checkoutProducts.splice(index, 1)
      }
    }
  }

  public removeProduct(itemId: number, productId: number) {
    if (this.isEditMode) {
      let index = this.model.checkoutProducts.findIndex(x => x.id == itemId)
      if (index > -1) {
        this.inAsyncMode = true
        this.httpContext.delete<any>(`/projectv/checkout/${this.model.customerId}/remove-item/${this.model.orderId}/${itemId}/`).subscribe(x => {
          this.model = x
          this.inAsyncMode = false
        }, fail => {
          this.inAsyncMode = false
          this.handleError(fail)
        })
      }
    } else {
      let index = this.model.checkoutProducts.findIndex(x => x.productId == productId)
      if (index > -1) {
        this.model.checkoutProducts.splice(index, 1)
      }
    }
  }

  public addProduct(product: any) {
    let c: CheckoutProduct = new CheckoutProduct()
    this.isSearchingProducts = true
    if (this.isEditMode) {
      this.inAsyncMode = true
      this.httpContext.create<any>(`/projectv/checkout/${this.model.customerId}/add-item/${this.model.orderId}`, { productId: product.id, quantity: 1 }).subscribe(x => {
        c.productId = product.id
        c.name = product.name
        c.isAvailableToOrder = product.isAvailableToOrder
        this.model = x
        this.inAsyncMode = false
      }, fail => {
        this.inAsyncMode = false
        this.handleError(fail)
      })
    } else {
      if (this.model.checkoutProducts.findIndex(x => x.productId == product.id) != -1) {
        c.productId = product.id
        c.name = product.name
        c.isAvailableToOrder = product.isAvailableToOrder
        c.priceString = product.priceString
        this.model.checkoutProducts.push(c)
      } else {
        let i = this.model.checkoutProducts.findIndex(x => x.productId == product.id)
        this.model.checkoutProducts[i].quantity += 1
      }
    }
  }

  public applyCoupon() {
    if (this.model.orderId && this.model.orderId != ' ') {
      this.inAsyncMode = true
      this.httpContext.create<any>(this.orderEndpoints.checkout.applyCoupon + `${this.model.orderId}/?customerId=${this.model.customerId}`, { couponCode: this.model.couponCode }).subscribe(x => {
        if (x.succeeded) {
          this.getCheckoutDetail(this.model.orderId, this.model.customerId)
        } else {
          this.inAsyncMode = false
          this.toastNotification("", x.errorMessage, NotificationType.warning)
        }
      }, fail => {
        this.inAsyncMode = false
        this.handleError(fail)
      })
    } else {
      this.toastNotification("", "You have to create your order before applying a coupon", NotificationType.warning)
    }
  }

  public saveOrderNote() {
    if (this.model.orderId && this.model.orderId != ' ') {
      this.inAsyncMode = true
      this.httpContext.create<any>(this.orderEndpoints.checkout.saveNote + `${this.model.orderId}/?customerId=${this.model.customerId}`, { orderNote: this.model.orderNote}).subscribe(x => {
        this.inAsyncMode = false
        this.toastNotification("", "Order note saved", NotificationType.success)
      }, fail => {
          this.inAsyncMode = false
          this.handleError(fail)
      })
    } else {
      this.toastNotification("", "You have to create your order before saving a note", NotificationType.warning)
    }
  }

  private addProductsToCart() {
    this.httpContext.create<any>(this.orderEndpoints.cart.addItems + `${this.model.customerId}/add-cart-items`, this.model.checkoutProducts).subscribe(x => {
      this.getCart()
    }, fail => {
      this.inAsyncMode = false
      this.handleError(fail)
    })
  }

  private getCart() {
    this.httpContext.read<any>(this.orderEndpoints.cart.read + this.model.customerId).subscribe(x => {
      this.cart = x
      if (this.isEditMode) {
        this.inAsyncMode = false
      } else {
        this.createCheckout()
      }
    }, fail => {
        this.inAsyncMode = false
        this.handleError(fail)
    })
  }

  private createCheckout() {
    this.httpContext.create<OrderCreatedResult>(this.orderEndpoints.checkout.create + `?customerId=${this.model.customerId}`, this.cart.items).subscribe(x => {
      if (x.succeeded) {
        this.model.orderId = x.oid
        this.model.orderStatus = x.sta
        if (this.model.selectedShippingAddressId == 0 && this.newShippingAddress) {
          this.createUserAddress()
        }
      } else {
        this.updateShippingAddress(this.model.selectedShippingAddressId)
      }
    }, fail => {
        this.inAsyncMode = false
        this.handleError(fail)
    })
  }

  private createUserAddress() {
    this.httpContext.create<CheckoutOrderDetail>(this.orderEndpoints.checkout.newShipping + `${this.model.orderId}/?customerId=${this.model.customerId}`, this.newShippingAddress).subscribe(x => {
      this.model = x
      this.inAsyncMode = false
      if (!this.isEditMode) {
        this.toastNotification("Order created", "Order created successfully", NotificationType.success)
      }
    }, fail => {
      this.inAsyncMode = false
      this.handleError(fail)
    })
  }

  // creates a new shipping address during order update and sets as shipping address
  public updateNewAddress() {
    this.isSubmitting = true
    if (this.shippingFormGroup.valid) {
      this.inAsyncMode = true
      this.createUserAddress()
    }
  }

  public updateShippingAddress(addressId: number) {
    this.inAsyncMode = true
    this.httpContext.update<any>(`/projectv/checkout/${addressId}/update-shipping-address/${this.model.orderId}/?customerId=${this.model.customerId}`, {}).subscribe(x => {
      this.model = x
      this.inAsyncMode = false
    }, fail => {
      this.inAsyncMode = false
      this.handleError(fail)
    })
  }

  public updateShippingProvider(providerId: number) {
    this.inAsyncMode = true
    this.httpContext.update<any>(`/projectv/checkout/${providerId}/update-shipping-provider/${this.model.orderId}/?customerId=${this.model.customerId}`, {}).subscribe(x => {
      this.model = x
      this.inAsyncMode = false
    }, fail => {
      this.inAsyncMode = false
      this.handleError(fail)
    })
  }

  private getCountries() {
    this.httpContext.read<any>(this.orderEndpoints.checkout.shippingCountries).subscribe((x) => {
      this.countries = x
      this.inAsyncMode = false
    }, (fail) => {
      this.inAsyncMode = false
      this.handleError(fail)
    });
  }

  public getStates($event) {
    this.inAsyncMode = true
    let countryId: string = $event.target.value
    this.newShippingAddress.countryId = countryId

    this.httpContext.read<any>(this.orderEndpoints.checkout.shippingStates + `${countryId}`).subscribe((x) => {
      this.states = x
      this.inAsyncMode = false
    }, (fail) => {
        this.states = []
        this.inAsyncMode = false
        this.handleError(fail)
    });
  }

  private getCheckoutDetail(id: string, customerId: string) {
    this.httpContext.read<any>(this.orderEndpoints.checkout.checkoutDetails + `?customerId=${customerId}&oid=${id}`).subscribe((x) => {
      this.model = x
      this.selectUser(this.model.customerId)
      }, (fail) => {
        this.inAsyncMode = false
       this.handleError(fail)
    });
  }

  private getShippingAddressess(userId: string) {
    this.httpContext.read<any>(this.orderEndpoints.checkout.shippingAddresses + `${userId}`).subscribe((x) => {
      this.model.existingShippingAddresses = x
      this.inAsyncMode = false
    }, (fail) => {
      this.inAsyncMode = false
      this.handleError(fail)
    });
  }
}
