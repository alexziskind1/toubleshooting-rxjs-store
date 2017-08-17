//import { PtItem, PtCurrentUser } from "./domain-models";

/*
export interface ViewIndex {
    idx: number;
}
*/

export interface State {
    //backlogItems: PtItem[],
    //currentUser: PtCurrentUser,
    //selectedViewIndex: ViewIndex,
    prop1: string;
    prop2: string;
    lastSelection: number;
    [key: string]: any;
}

export const INITIAL_STATE: State = {
    //backlogItems: [],
    //currentUser: undefined,
    //selectedViewIndex: { idx: 1 }
    prop1: undefined,
    prop2: undefined,
    lastSelection: 1
};
