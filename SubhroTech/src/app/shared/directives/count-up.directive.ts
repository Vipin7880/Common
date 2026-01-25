import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { animationFrameScheduler, BehaviorSubject, combineLatest, distinctUntilChanged, endWith, interval, map, switchMap, takeWhile } from 'rxjs';

@Directive({
  selector: '[appCountUp]'
})
export class CountUpDirective implements OnInit {
  @Input('appCountUp') countTo: number = 0;
  @Input() duration: number = 2000;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.animate();
  }

  animate() {
    const start = 0;
    const end = this.countTo;
    const totalFrames = (this.duration / 1000) * 60;

    interval(1000 / 60).pipe(
      map(i => i + 1),
      takeWhile(i => i <= totalFrames),
      map(i => Math.round(this.easeOutQuad(i, start, end - start, totalFrames)))
    ).subscribe(current => {
      this.renderer.setProperty(this.el.nativeElement, 'innerHTML', current + '+'); // Append + here or handle via input
    });
  }

  // Easing function for smooth animation
  easeOutQuad(t: number, b: number, c: number, d: number): number {
    t /= d;
    return -c * t * (t - 2) + b;
  }
}
