import {Component, inject} from '@angular/core';
import {ProductModel} from "../../shared/models/product.model";
import {ProductService} from "../../core/services/product.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  product: ProductModel = {} as ProductModel;
  paramId: string = '0';
  private route = inject(ActivatedRoute);

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    const paramId = this.route.snapshot.paramMap.get('id');
    if (paramId) {
      this.paramId = paramId;
      this.loadProductView();
    }
  }

  loadProductView(){
    this.productService.getProductById(this.paramId).subscribe(product => {
      this.product = product;
    });
  }
}
