import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs/Subscription";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/distinctUntilChanged';

import { Store } from "app/store";

@Component({
    selector: 'store-test',
    template: `
    <div>
        <h1>Store Test (last selection: {{ lastSelection$ | async }} )</h1>
        

        <button (click)="setProp1('hello')">Set Prop 1</button>
        <button (click)="setProp2('world')">Set Prop 2</button>

        <h2>Prop1: {{ prop1$ | async }}</h2>
        <h2>Prop2: {{ prop2$ | async }}</h2>

    </div>
    `
})

export class StoreTestComponent implements OnInit {

    public prop1 = '';
    public prop2 = '';
    public lastSelection: number = 0;
    public prop1$: Observable<string>;
    public prop2$: Observable<string>;
    public lastSelection$: Observable<number>;


    constructor(private store: Store) { }

    ngOnInit() {
        this.prop1$ = this.store.select<string>('prop1');
        this.prop2$ = this.store.select<string>('prop2');
        this.lastSelection$ = this.store.select<number>('lastSelection');

        this.lastSelection$.subscribe(next => {
            console.log('last sel: ' + next);
            this.setProp2Programmatically('prog world');
        });

        /*
        this.store.prop1Store.subscribe(next => {
            if (next) {
                console.log('prop1 next val: ' + next);
                this.setProp2('programmatic world');
            }
        });
        */

        /*
        this.prop1$.subscribe(next => {
            if (next) {
                console.log('prop1 next val: ' + next);
                this.setProp2('programmatic world');
            }
        });
*/
    }

    public setProp1(text: string) {
        //this.prop1 = text;
        this.store.set<string>('prop1', text);
        this.store.set<number>('lastSelection', 1);
    }

    public setProp2(text: string) {
        this.store.set<string>('prop2', text);
        this.store.set<number>('lastSelection', 2);
    }


    public setProp2Programmatically(text: string) {
        this.store.set<string>('prop2', text);
    }
}
