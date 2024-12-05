import {
  Component,
  ElementRef,
  AfterViewInit,
  ViewChild,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-infinite-scroll',
  templateUrl: './infinite-scroll.component.html',
  styleUrls: ['./infinite-scroll.component.scss'],
})
export class InfiniteScrollComponent implements AfterViewInit {
  @Input() positionClass: string = '';
  @ViewChild('scrollContent', { static: true }) scrollContent!: ElementRef;

  items: string[] = ['ATHENA', 'ATHENA', 'ATHENA', 'ATHENA', 'ATHENA'];

  private maxDuplicationCount = 3;
  private currentDuplicationCount = 0;

  ngAfterViewInit() {
    this.duplicateContent();
    this.animateScroll();
  }

  duplicateContent() {
    if (this.currentDuplicationCount >= this.maxDuplicationCount) {
      return;
    }

    const containerWidth =
      (this.scrollContent.nativeElement as HTMLElement).parentElement
        ?.offsetWidth || 0;
    let contentWidth = this.calculateContentWidth();

    while (
      contentWidth < containerWidth * 2 &&
      this.currentDuplicationCount < this.maxDuplicationCount
    ) {
      this.items = [...this.items, ...this.items];
      this.currentDuplicationCount++;
      contentWidth = this.calculateContentWidth();
    }
  }

  calculateContentWidth(): number {
    const items = Array.from(
      (this.scrollContent.nativeElement as HTMLElement).children
    );
    return items.reduce((totalWidth, item) => {
      return totalWidth + (item as HTMLElement).offsetWidth + 20;
    }, 0);
  }

  animateScroll() {
    const firstChild = (this.scrollContent.nativeElement as HTMLElement)
      .firstElementChild as HTMLElement;
    const firstChildWidth = firstChild.offsetWidth + 20;

    this.scrollContent.nativeElement.style.transform = `translateX(-${firstChildWidth}px)`;
    this.scrollContent.nativeElement.style.transition = `transform 5s linear`;

    this.scrollContent.nativeElement.addEventListener(
      'transitionend',
      () => {
        this.scrollContent.nativeElement.style.transition = 'none';
        this.scrollContent.nativeElement.style.transform = 'translateX(0)';
        this.scrollContent.nativeElement.appendChild(firstChild);
        requestAnimationFrame(() => this.animateScroll());
      },
      { once: true }
    );
  }
}
