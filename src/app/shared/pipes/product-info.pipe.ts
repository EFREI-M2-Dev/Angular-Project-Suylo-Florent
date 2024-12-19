import { Pipe, PipeTransform } from '@angular/core';
import { ProductService } from 'src/app/core/services/product.service';
import { ProductModel } from 'src/app/shared/models/product.model';
import { Observable } from 'rxjs';

@Pipe({
  name: 'productInfo'
})
export class ProductInfoPipe implements PipeTransform {
  constructor(private productService: ProductService) {
  }

  transform(productId: string): Observable<ProductModel> {
    return this.productService.getProductById(productId);
  }
}
