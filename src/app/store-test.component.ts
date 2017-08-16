import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs/Subscription";
import { Observable } from "rxjs/Observable";

import { Store } from "app/store";

@Component({
    selector: 'store-test',
    template: `
    <div>
        <h1>Store Test</h1>

        <button (click)="setProp1('hello')">Set Prop 1</button>
        <button (click)="setProp2('world')">Set Prop 1</button>

        <h2>Prop1: {{ prop1$ | async }}</h2>
        <h2>Prop2: {{ prop2$ | async }}</h2>

    </div>
    `
})

export class StoreTestComponent implements OnInit {
    public prop1$: Observable<string> = this.store.select<string>('prop1');
    public prop2$: Observable<string> = this.store.select<string>('prop2');

    constructor(private store: Store) { }

    ngOnInit() {
        this.prop1$.subscribe(next => {
            console.log('prop1 next val: ' + next);
            this.setProp2('programmatic world');
        });
    }

    public setProp1(text: string) {
        this.store.set('prop1', text);
    }

    public setProp2(text: string) {
        this.store.set('prop2', text);
    }
}
