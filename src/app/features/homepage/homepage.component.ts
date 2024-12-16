import {
  AfterViewInit,
  Component,
  ElementRef, OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { gsap } from 'gsap';
import {ProductModel} from "../../shared/models/product.model";
import {ProductService} from "../../core/services/product.service";
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements AfterViewInit, OnInit {
  @ViewChildren('floatingText1, floatingText2, floatingText3, floatingText4')
  floatingTexts!: QueryList<ElementRef>;
  products: ProductModel[] = [];

  constructor(private productService: ProductService) { }

  ngAfterViewInit() {
    const hero = document.querySelector('.athena') as HTMLElement;

    this.floatingTexts.forEach((text, index) => {
      this.galaxyFloatEffect(text.nativeElement, index);
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  private galaxyFloatEffect(element: HTMLElement, index: number) {
    const randomAmplitude = () => Math.random() * 15 + 8;
    const randomDuration = () => Math.random() * 4 + 3;

    const timeline = gsap.timeline({ repeat: -1, yoyo: true });
    timeline
      .to(element, {
        duration: randomDuration(),
        x: randomAmplitude() * Math.cos(index * 2 * Math.PI),
        y: randomAmplitude() * Math.sin(index * 2 * Math.PI),
        ease: 'power1.inOut',
      })
      .to(element, {
        duration: randomDuration(),
        x: randomAmplitude() * Math.sin(index * Math.PI),
        y: randomAmplitude() * Math.cos(index * Math.PI),
        ease: 'power1.inOut',
      });
  }

  loadProducts() {
    this.productService.getProductsHome().subscribe(
      data => {
        this.products = data;
      }
    )
  }
}
