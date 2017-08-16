import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Store } from "app/store";
import { PtBacklogService } from "app/ptbacklog.service";
import { PtItem } from "app/shared/models/domain-models";
import { Subscription } from "rxjs/Subscription";

@Component({
    selector: 'backlog',
    template: `
    <div>
        <h1>Backlog</h1>

        <button (click)="changeView(1)">Set View 1</button>

        <ul>
            <li *ngFor="let item of items; let i = index">
                {{ item.title }}
            </li>
        </ul>
    </div>
    `
})

export class BacklogComponent implements OnInit, OnDestroy {

    public items: PtItem[] = [];
    public items$: Observable<PtItem[]>;
    public blSub: Subscription;

    public selectedViewIndex$: Observable<number> = this.store.select<number>('selectedViewIndex');

    constructor(
        private store: Store,
        private ptBacklogService: PtBacklogService
    ) { }



    ngOnInit() {
        this.items$ = this.store.select<PtItem[]>('backlogItems');
        this.items$.subscribe(next => {
            console.log('selectedIndex: ' + next);
        });
        this.selectedViewIndex$.subscribe(next => {
            console.log('selectedIndex: ' + next);
            this.ptBacklogService.fetchItems();
        });
        //this.blSub = this.ptBacklogService.getBacklog$.subscribe();
    }

    ngOnDestroy() {
        this.blSub.unsubscribe();
    }

    public changeView(viewIndex) {
        this.store.set('selectedViewIndex', { idx: viewIndex });
    }
}