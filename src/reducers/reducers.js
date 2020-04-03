// Note that I'm putting ALL my reducers into a single
// file.  Typically, you want to to separate these out
// into smaller files.
import { combineReducers } from 'redux'
import createFood from "./createFoodReducer";


function selectedFood(state = '', action) {
    switch (action.type) {
        case "SELECT_FOOD":
            return action.foodId
        default:
            return state
    }
}

function foodList(
    state = {
        inFlight: false,
        list: []
    },
    action
) {
    switch (action.type) {
        case "REQUEST_FOOD_LIST":
            return Object.assign({}, state, {
                inFlight: true
            });
        case "RECEIVE_FOOD_LIST":
            return Object.assign({}, state, {
                inFlight: false,
                list: action.foodList,
            });
        default:
            return state
    }
}

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
    selectedFood,
    createFood,
    foods: foodList,
    books: bookList,
    myList: myList
});

export default rootReducer