import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/debounceTime';

import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

import { State, INITIAL_STATE } from "./shared/models/state";

export class Store {

    private subj = new BehaviorSubject<State>(INITIAL_STATE);
    //private store = this.subj.asObservable().distinctUntilChanged();
    //public prop1Store = this.subj.asObservable().distinctUntilChanged((x: State, y: State) => x.prop1 === y.prop1);

    //private uiState2 = this.subj.pluck<State, string>('prop1').distinctUntilChanged<string>((x) => { return x.value; });

    constructor() {
        /*
        this.store
            .subscribe(newState => {
                console.log('new state received');
            });
            */
    }

    get value() {
        return this.subj.value;
    }

    public select<T>(name: string): Observable<T> {
        //return this.store.pluck<State, T>(name).distinctUntilChanged<T>((x: T, y: T) => x[name] === y[name]);
        //return this.store.pluck<State, T>(name);
        return this.subj.pluck<State, T>(name).distinctUntilChanged<T>();
    }

    public set<T>(name: string, state: T) {
        this.subj.next({
            ...this.value, [name]: state
        });
    }
}