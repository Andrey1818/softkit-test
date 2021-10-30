import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {RegisterService} from "./register.service";
import {BehaviorSubject, Subject} from "rxjs";
import {statusEnum} from "./status.enum";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  viewProviders: [RegisterService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  @Input()enum = statusEnum
  count: number
  blueSquares$: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([])
  reset$: Subject<void> = new Subject<void>()
  blueSquares: number[] = []
  submitted: boolean
  status: Subject<string> = new Subject()

  constructor(
    public registerService: RegisterService
  ) {
  }

  ngOnInit() {
    this.genBlueSquareIndex()
  }

  generateSquare(array: number[]) {
    array.splice(0)
    for (let square = 0; square < 6; square++) {
      array.push(square)
    }
    return array
  }

  genBlueSquareIndex() {
    this.count = Math.floor(Math.random() * (4 - 1)) + 1
    for (let i = 0; i < this.count; i++) {
      const blueSquare = (Math.floor(Math.random() * (6)))
      if (this.blueSquares.includes(blueSquare)) continue;
      this.blueSquares.push(blueSquare)
    }
    this.blueSquares$.next(this.blueSquares)
  }

  isInvalid() {
    return this.registerService.selectedSquare.length
      !== this.blueSquares.length
      || !this.registerService.selectedSquare.length
      || this.submitted;
  }

  submit() {
    if (this.isInvalid()) {
      return
    }
    this.submitted = true
    for (const square of this.registerService.selectedSquare) {
      if (!this.blueSquares.includes(square)) {
        this.status.next(statusEnum[1])
        this.clear()
        return;
      }
    }
    this.status.next(statusEnum[0])
    this.clear()
    return;
  }

  clear() {
    setTimeout(() => {
      this.blueSquares = []
      this.registerService.selectedSquare = []
      this.reset$.next()
      this.genBlueSquareIndex()
      this.submitted = false
      this.status.next('')
    }, 2000)
  }
}
