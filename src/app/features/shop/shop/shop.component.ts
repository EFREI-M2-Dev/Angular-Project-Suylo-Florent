import { Component } from '@angular/core';
import { ProductModel } from '../../../shared/models/product.model';
import { ProductService } from '../../../core/services/product.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent {
  products: ProductModel[] = [];
  isUserAdmin: boolean = false;

  constructor(
    private productService: ProductService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.isLoggedUserAdmin();
  }

  isLoggedUserAdmin() {
    const userId = this.userService.getSavedUserId();
    if (userId) {
      this.userService.getUserInfo(userId).subscribe((user: any) => {
        this.isUserAdmin = user[0].role === 2;
      });
    }
  }

  loadProducts() {
    this.productService.getProducts().subscribe((data: ProductModel[]) => {
      this.products = data;
    });
  }

  goToFormProduct(productId?: number): void {
    if (productId) {
      this.router.navigate(['/form-product', productId]);
    } else {
      this.router.navigate(['/form-product']);
    }
  }
}
