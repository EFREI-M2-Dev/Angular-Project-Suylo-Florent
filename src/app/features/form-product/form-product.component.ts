import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss'],
})
export class FormProductComponent implements OnInit {
  productForm!: FormGroup;
  productId: string | null = null;
  productData: any = {};

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');

    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      description: [''],
      price: ['', [Validators.required]],
    });

    if (this.productId) {
      this.getProductData();
    } else {
      console.log('Create new product');
    }
  }

  getProductData(): void {
    this.productService.getProductById(this.productId!).subscribe((data) => {
      console.log(data);
      this.productData = data;

      this.productForm.patchValue({
        name: this.productData.name,
      });
    });
  }

  onSubmit(): void {
    console.log(this.productForm.value);
  }
}
