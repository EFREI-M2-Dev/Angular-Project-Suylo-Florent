import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomepageComponent } from './homepage/homepage.component';
import { SharedModule } from '../shared/shared.module';
import { InfiniteScrollComponent } from './homepage/infinite-scroll/infinite-scroll.component';
import { AuthComponent } from './auth/auth.component';
import { InputFieldComponent } from '../shared/input-field/input-field.component';
import { ShopComponent } from './shop/shop/shop.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { BreadcrumbComponent } from './cart/breadcrumb/breadcrumb.component';
import { LicenceCardComponent } from '../shared/licence-card/licence-card.component';
import { ProductCardComponent } from '../shared/product-card/product-card.component';
import { AccountComponent } from './account/account.component';
import { ItemCartComponent } from './cart/item-cart/item-cart.component';
import { FormProductComponent } from './form-product/form-product.component';

@NgModule({
  declarations: [
    HomepageComponent,
    InfiniteScrollComponent,
    AuthComponent,
    InputFieldComponent,
    LicenceCardComponent,
    ProductCardComponent,
    ShopComponent,
    ProductComponent,
    CartComponent,
    BreadcrumbComponent,
    AccountComponent,
    ItemCartComponent,
    FormProductComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    FormsModule,
    NgOptimizedImage,
    ReactiveFormsModule,
  ],
  exports: [HomepageComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FeaturesModule {}
