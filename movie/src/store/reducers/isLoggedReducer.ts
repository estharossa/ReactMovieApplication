import {toggleIsLoggedType} from "../actions/actionsTypes"

export function isLoggedReducer(state:any,action:toggleIsLoggedType) {
    switch (action.type) {
        case "toogleIsLogged":
            return action.value;
            break
        default:
            return state;
    }
}
