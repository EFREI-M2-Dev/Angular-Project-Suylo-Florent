import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-item-cart',
  templateUrl: './item-cart.component.html',
  styleUrls: ['./item-cart.component.scss'],
})
export class ItemCartComponent {
  @Input() product: any;
  @Input() quantity?: number;
  @Input() itemId?: string;

  @Output() remove = new EventEmitter<string>(); // EventEmitter pour notifier le parent

  @Output() quantityChange = new EventEmitter<number>();

  onQuantityChange() {
    this.quantityChange.emit(this.quantity);
  }

  removeFromCart(): void {
    this.remove.emit(this.itemId);
  }
}
