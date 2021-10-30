import {Directive, ElementRef, Host, HostListener, Input, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {RegisterService} from "./register.service";
import {Observable, Subscription} from "rxjs";

@Directive({
  selector: '[appSelect]'
})
export class OrangeBorderDirective implements OnInit, OnDestroy {
  @Input() squareIndex: number;
  @Input() reset$: Observable<void>
  subscription$: Subscription

  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    @Host() private registerService: RegisterService
  ) {
  }

  ngOnInit(): void {
    this.subscription$ = this.reset$.subscribe(() => {
      this.renderer.setStyle(this.element.nativeElement, 'border', null)
    })
  }

  @HostListener('click')
  onClick() {
    if (!this.registerService.selectedSquare.includes(this.squareIndex)) {
      this.registerService.selectedSquare.push(this.squareIndex)
      return this.renderer.setStyle(this.element.nativeElement, 'border', '2px solid #FF4500')
    }
    const index = this.registerService.selectedSquare.indexOf(this.squareIndex)
    this.registerService.selectedSquare.splice(index, 1)
    this.renderer.setStyle(this.element.nativeElement, 'border', null)
    return
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe()
  }
}
