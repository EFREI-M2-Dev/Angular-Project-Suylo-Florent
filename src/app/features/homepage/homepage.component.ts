import {
  AfterViewInit,
  Component,
  ElementRef,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { gsap } from 'gsap';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements AfterViewInit {
  @ViewChildren('floatingText1, floatingText2, floatingText3, floatingText4')
  floatingTexts!: QueryList<ElementRef>;

  ngAfterViewInit() {
    this.floatingTexts.forEach((text) => {
      this.galaxyFloatEffect(text.nativeElement);
    });
  }

  private galaxyFloatEffect(element: HTMLElement) {
    const randomAmplitude = () => Math.random() * 8 + 8;
    const randomDuration = () => Math.random() * 4 + 3;

    const animate = () => {
      gsap.to(element, {
        duration: randomDuration(),
        x: `+=${randomAmplitude() * (Math.random() < 0.5 ? -1 : 1)}`,
        y: `+=${randomAmplitude() * (Math.random() < 0.5 ? -1 : 1)}`,
        ease: 'power1.inOut',
        onComplete: animate,
      });
    };

    animate();
  }
}
