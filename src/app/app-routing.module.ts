import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './features/homepage/homepage.component';
import { AuthComponent } from './features/auth/auth.component';
import { authGuard } from './core/guards/auth.guard';
import {ShopComponent} from "./features/shop/shop/shop.component";
import {ProductComponent} from "./features/product/product.component";

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
  },
  {
    path: 'auth/:mode',
    component: AuthComponent,
    canActivate: [authGuard],
  },
  {
    path: 'shop',
    component: ShopComponent,
  },
  {
    path: 'products/:id',
    component: ProductComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
