import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LicenceService } from 'src/app/core/services/licence.service';
import { ProductService } from 'src/app/core/services/product.service';
import { LicenceModel } from 'src/app/shared/models/licence.model';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss'],
})
export class FormProductComponent implements OnInit {
  productForm!: FormGroup;
  productId: string | null = null;
  productData: any = {};
  licences: LicenceModel[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private productService: ProductService,
    private licenceService: LicenceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchLicences();
    this.initForm();
  }

  initForm(): void {
    this.productId = this.route.snapshot.paramMap.get('id');

    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      subtitle: [''],
      description: [''],
      price: ['', [Validators.required]],
      licence: ['', Validators.required],
      imgCover: [''],
      sex: ['', Validators.required],
      isFeatured: [false],
      releaseDate: [''],
    });

    if (this.productId) {
      this.productService
        .getProductById(this.productId!)
        .subscribe((product) => {
          console.log(product);
          this.productData = product;
          this.productForm.patchValue({
            ...product,
            licence: product.licence.id,
          });
        });
    }
  }

  fetchLicences(): void {
    this.licenceService.getLicences().subscribe((licences) => {
      this.licences = licences;
    });
  }

  onLicenceChange(event: Event): void {
    const selectedLicence = (event.target as HTMLSelectElement).value;
    this.productForm.patchValue({ licence: selectedLicence });
  }

  onCreateLicence(): void {
    const newLicenceName = prompt('Entrez le nom de la nouvelle licence :');
    if (newLicenceName) {
      this.licenceService.createLicence({ name: newLicenceName }).subscribe({
        next: (licence) => {
          this.licences.push(licence);
          this.productForm.patchValue({ licence: licence.id });
        },
        error: (err) =>
          console.error('Erreur lors de la création de la licence', err),
      });
    }
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.productForm.patchValue({ imgCover: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const productData = this.productForm.value;
      if (this.productId) {
        console.log(productData);
        this.productService
          .updateProduct(this.productId, productData)
          .subscribe(() => {
            this.router.navigate(['/shop']);
          });
      } else {
        this.productService.createProduct(productData).subscribe(() => {
          this.router.navigate(['/shop']);
        });
      }
    }
  }
}
