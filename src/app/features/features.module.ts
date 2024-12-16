import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomepageComponent } from './homepage/homepage.component';
import { SharedModule } from '../shared/shared.module';
import { InfiniteScrollComponent } from './homepage/infinite-scroll/infinite-scroll.component';
import { AuthComponent } from './auth/auth.component';
import { InputFieldComponent } from './auth/input-field/input-field.component';
import {LicenceCardComponent} from "../components/licence-card/licence-card.component";
import {ProductCardComponent} from "../components/product-card/product-card.component";
import { ShopComponent } from './shop/shop/shop.component';
import { ProductComponent } from './product/product.component';

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
