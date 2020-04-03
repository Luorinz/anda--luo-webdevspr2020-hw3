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


function getToReadList() {
    return Axios.get('/api/book/toread');
}

function getHaveReadList() {
    return Axios.get('/api/book/haveread');
}


export function fetchMyList() {
    return function (dispatch) {

        dispatch(requestMyList());

        return Axios.all([getToReadList(), getHaveReadList()])
            .then(Axios.spread((toReadResponse, haveReadResponse) => {
                    console.log(toReadResponse.data, haveReadResponse.data);
                    dispatch(receiveMyList(toReadResponse.data, haveReadResponse.data));

                }), error => console.log('An error occurred.', error)
            );
    }
}