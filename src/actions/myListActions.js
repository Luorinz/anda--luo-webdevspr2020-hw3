import Axios from 'axios'

function requestMyList() {
    return {
        type: "REQUEST_BOOK_LIST"
    }
}

function receiveMyList(toReadList, haveReadList) {
    return {
        type: "RECEIVE_BOOK_LIST",
        toReadList,
        haveReadList
    }
}

// export function selectBook(foodId) {
//     return {
//         type: "SELECT_BOOK",
//         foodId
//     }
// }


function getToReadList() {
    return Axios.get('/api/book/toread');
}

function getHaveReadList() {
    return Axios.get('/api/book/haveread');
}


export function fetchMyList() {
    return function (dispatch) {
        // Before we do anything, we let the state know
        // that we're requesting the food list but that it hasn't loaded yet
        // This lets us do any load animation or disable important functionality
        dispatch(requestMyList());
        // Axios is a just an easy way to make an API call
        // Remember how we set the proxy in package.json?
        // This prefills that so it communicates with the server
        return Axios.all([getToReadList(), getHaveReadList()])
            .then(Axios.spread((toReadResponse, haveReadResponse) => {
                    console.log(toReadResponse.data, haveReadResponse.data);
                    dispatch(receiveMyList(toReadResponse.data, haveReadResponse.data));

                }), error => console.log('An error occurred.', error)
            );
    }
}