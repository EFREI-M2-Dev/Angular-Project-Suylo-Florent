import { Component } from '@angular/core';
import {ProductModel} from "../../shared/models/product.model";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  product: ProductModel = {} as ProductModel;
  paramId: string = '0';

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }

  loadProductView(){
  }
}
