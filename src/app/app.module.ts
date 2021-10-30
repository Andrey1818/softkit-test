import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SetColorDirective } from './set-color.directive';
import {OrangeBorderDirective} from "./select.directive";

@NgModule({
  declarations: [
    AppComponent,
    OrangeBorderDirective,
    SetColorDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
