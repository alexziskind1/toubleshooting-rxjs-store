import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { Injectable, NgZone } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Store } from "./store";
import { PtItem } from "./shared/models/domain-models";

//const localIP = '192.168.1.202:8080';
const localIP = '10.142.32.184:8080';
const apiEndpoint = '/api';

let headers = new Headers();
headers.append('Access-Control-Allow-Origin', 'http://192.168.1.202:8080');
headers.append('Access-Control-Allow-Credentials', 'true');
let options = new RequestOptions({ headers: headers });

@Injectable()
export class PtBacklogService {
    private get baseUrl() {
        return `http://${localIP}${apiEndpoint}`;
    }

    private get backlogUrl() {
        return `${this.baseUrl}/backlog`;
    }

    private get filterIndex() {
        return this.store.value.selectedViewIndex;
    }

    private get filteredBacklogUrl() {
        switch (this.filterIndex.idx) {
            case 0:
                const user = this.store.value.currentUser;
                if (user) {
                    return `${this.baseUrl}/myItems?userId=${this.store.value.currentUser.id}`;
                } else {
                    return `${this.baseUrl}/backlog`;
                }
            case 1:
                return `${this.baseUrl}/openItems`;
            case 2:
                return `${this.baseUrl}/closedItems`;
            default:
                return `${this.baseUrl}/backlog`;
        }
    }

    public getBacklog$ = this.http.get(this.filteredBacklogUrl, options)
        .map(res => res.json())
        .do((data: PtItem[]) => {
            this.store.set('backlogItems', data);
        });

    constructor(private http: Http, private store: Store, private zone: NgZone) { }

    public fetchItems() {
        this.http.get(this.filteredBacklogUrl, options)
            .map(res => res.json())
            .catch((error: any) => {
                return Observable.throw(error.json().error || 'Server error');
            })
            .subscribe((data: PtItem[]) => {
                this.store.set('backlogItems', data);
            });
        //.subscribe();
    }

}