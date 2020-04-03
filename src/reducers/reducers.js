// Note that I'm putting ALL my reducers into a single
// file.  Typically, you want to to separate these out
// into smaller files.
import { combineReducers } from 'redux'


function bookList(
    state = {
        inFlight: false,
        list: []
    },
    action
) {
    switch (action.type) {
        case "REQUEST_BOOK_LIST":
            return Object.assign({}, state, {
                inFlight: true
            });
        case "RECEIVE_BOOK_LIST":
            return Object.assign({}, state, {
                inFlight: false,
                list: action.bookList,
            });
        default:
            return state
    }
}

function myList(
    state = {
        inFlight: false,
        toReadList: [],
        haveReadList: []
    },
    action
) {
    switch (action.type) {
        case "REQUEST_BOOK_LIST":
            return Object.assign({}, state, {
                inFlight: true
            });
        case "RECEIVE_BOOK_LIST":
            return Object.assign({}, state, {
                inFlight: false,
                toReadList: action.toReadList,
                haveReadList: action.haveReadList
            });
        default:
            return state
    }
}

const rootReducer = combineReducers({
    books: bookList,
    myList: myList
});

export default rootReducer