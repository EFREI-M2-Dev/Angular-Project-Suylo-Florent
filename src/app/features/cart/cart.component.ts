import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CartService } from 'src/app/core/services/cart.service';
import { PayementService } from 'src/app/core/services/payement.service';
import { ProductService } from 'src/app/core/services/product.service';
import { UserService } from 'src/app/core/services/user.service';
import { PayementModel } from 'src/app/shared/models/payement.model';
import { ProductModel } from 'src/app/shared/models/product.model';
import {lettersValidator, streetValidator, zipCodeValidator} from "./cart-validators";


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  currentStep: number = 1;

  cartItems: any[] = [];
  userId?: string;
  totalWithoutVAT: number = 0;
  vat: number = 0;
  total: number = 0;

  recommandationsRecent: ProductModel[] = [];
  recommandationsLicence: ProductModel[] = [];

  deliveryForm!: FormGroup;

  constructor(
    private cartService: CartService,
    private userService: UserService,
    private productService: ProductService,
    private payementService: PayementService
  ) {}

  ngOnInit(): void {
    this.userId = this.userService.getSavedUserId() || undefined;
    if (this.userId) {
      this.loadCart();
    } else {
      alert('Veuillez vous connecter pour accéder à votre panier.');
    }

    this.initForm();
  }

  loadCart(): void {
    this.cartService.getCartByUser(this.userId!).subscribe((items) => {
      const productIds = items.map((item) => item.productId);

      this.cartService.getProductDetails(productIds).subscribe((products) => {
        this.cartItems = items.map((item) => ({
          ...item,
          product: products.find((product) => product.id === item.productId),
        }));
        this.calculateTotal();
        this.loadRecommandations();
      });
    });
  }

  initForm() {
    this.deliveryForm = new FormGroup({
      street: new FormControl('', [Validators.required, streetValidator()]),
      city: new FormControl('', [Validators.required, lettersValidator()]),
      zip: new FormControl('', [Validators.required, zipCodeValidator()]),
      lastName: new FormControl('', [Validators.required, lettersValidator()]),
      firstName: new FormControl('', [Validators.required, lettersValidator()]),
    });
  }

  updateQuantity(itemId: string, newQuantity: number): void {
    const item = this.cartItems.find((i) => i.id === itemId);
    if (item) {
      item.quantity = newQuantity;
      this.cartService
        .updateCartItem(itemId, newQuantity, item.productId, this.userId!)
        .subscribe(() => {
          this.calculateTotal();
          this.loadCart();
        });
    }
    document.dispatchEvent(new Event('addToCart'));
  }

  removeFromCart(id: string): void {
    this.cartService.removeFromCart(id).subscribe(() => {
      this.loadCart();
    });
    document.dispatchEvent(new Event('addToCart'));
  }

  calculateTotal() {
    const totalWithoutVAT = this.cartItems.reduce((sum, item) => {
      const priceString = item.product?.price;
      const quantity = parseInt(item.quantity);

      if (typeof priceString === 'string' && priceString) {
        const price = parseFloat(priceString);

        if (!isNaN(price) && typeof quantity === 'number' && !isNaN(quantity)) {
          return sum + price * quantity;
        } else {
          console.warn('Prix ou quantité invalides:', price, quantity);
          return sum;
        }
      }

      return sum;
    }, 0);

    const vat = totalWithoutVAT * 0.2;
    const total = totalWithoutVAT + vat;

    const roundedTotalWithoutVAT = parseFloat(totalWithoutVAT.toFixed(2));
    const roundedVat = parseFloat(vat.toFixed(2));
    const roundedTotal = parseFloat(total.toFixed(2));

    this.totalWithoutVAT = roundedTotalWithoutVAT;
    this.vat = roundedVat;
    this.total = roundedTotal;
  }

  loadRecommandations() {
    this.productService.getRecentProducts().subscribe((data) => {
      const cartProductIds = this.cartItems.map((item) => item.product.id);
      this.recommandationsRecent = data.filter(
        (product) => !cartProductIds.includes(product.id)
      );
    });

    const allLicensesInCart = this.cartItems.map(
      (item) => item.product.licence
    );

    this.productService
      .getProductsByLicenses(allLicensesInCart)
      .subscribe((data) => {
        const cartProductIds = this.cartItems.map((item) => item.product.id);
        this.recommandationsLicence = data.filter(
          (product) => !cartProductIds.includes(product.id)
        );
      });
  }

  onConfirm(): void {
    this.currentStep = 2;
  }

  onSubmitAdress(): void {
    if (this.deliveryForm.valid) {
      this.currentStep = 3;

      setTimeout(() => {
        const newPayement: PayementModel = {
          firstName: this.deliveryForm.value.firstName,
          lastName: this.deliveryForm.value.lastName,
          city: this.deliveryForm.value.city,
          street: this.deliveryForm.value.street,
          zip: this.deliveryForm.value.zip,
          date: new Date().toISOString(),
          userId: this.userId!,
          products: this.cartItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
          amount: this.total,
        };

        this.payementService.addPayement(newPayement).subscribe(() => {
          this.cartService.resetCart().subscribe(() => {
            this.loadCart();
            document.dispatchEvent(new Event('addToCart'));
            this.currentStep = 4;
          });
        });
      }, 2000);
    } else {
      console.warn('Formulaire invalide');
    }
  }

  onReset(): void {
    this.currentStep = 1;
  }
}
