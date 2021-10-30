import {Directive, ElementRef, Host, Input, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {RegisterService} from "./register.service";
import {Observable, Subscription} from "rxjs";

@Directive({
  selector: '[appSetColor]'
})
export class SetColorDirective implements OnInit, OnDestroy {
  @Input() blueSquares$: Observable<number[]>
  @Input() squareIndex: number
  subscription$: Subscription

  constructor(
    private element: ElementRef,
    private render: Renderer2,
    @Host() private registerService: RegisterService
  ) {
  }

  ngOnInit() {
    this.subscription$ = this.blueSquares$.subscribe(blueSquares => {
      if (blueSquares.includes(this.squareIndex)) {
        this.render.setStyle(this.element.nativeElement, 'background', 'blue')
        return
      }
      const rgb = []
      for (let i = 0; i < 3; i++) {
        rgb.push(Math.floor(Math.random() * (255 - 100)) + 100)
      }
      this.render.setStyle(this.element.nativeElement, 'background', `rgb(${rgb.join(',')})`)
    })
  }

  ngOnDestroy() {
    if (!this.subscription$) return
    this.subscription$.unsubscribe()
  }
}
