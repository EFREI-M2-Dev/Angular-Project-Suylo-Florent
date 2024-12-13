import { Component } from '@angular/core';
import {ProductModel} from "../../../shared/models/product.model";
import {ProductService} from "../../../services/product.service";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent {
  products: ProductModel[] = [];

  constructor(private productService: ProductService) { }


  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe(
      data => {
        this.products = data;
      }
    )
  }
}
