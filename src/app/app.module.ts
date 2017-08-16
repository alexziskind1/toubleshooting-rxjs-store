import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { StoreTestComponent } from "app/store-test.component";
import { Store } from "app/store";


@NgModule({
  declarations: [
    AppComponent,
    StoreTestComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    Store
  ],
  bootstrap: [
    AppComponent]
})
export class AppModule { }
