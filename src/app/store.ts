import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/pluck';
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

import { State, INITIAL_STATE } from "./shared/models/state";

export class Store {

    private subj = new BehaviorSubject<State>(INITIAL_STATE);
    public store = this.subj.asObservable().distinctUntilChanged();

    get value() {
        return this.subj.value;
    }

    public select<T>(name: string): Observable<T> {
        return this.store.pluck(name);
    }

    public set<T>(name: string, state: T) {
        this.subj.next({
            ...this.value, [name]: state
        });
    }
}