import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { BacklogComponent } from "app/backlog.component";
import { StoreTestComponent } from "app/store-test.component";
import { PtBacklogService } from "app/ptbacklog.service";
import { Store } from "app/store";


@NgModule({
  declarations: [
    AppComponent,
    BacklogComponent,
    StoreTestComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    PtBacklogService,
    Store
  ],
  bootstrap: [
    AppComponent]
})
export class AppModule { }
