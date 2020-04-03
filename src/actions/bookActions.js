import Axios from 'axios'

function requestBookList() {
    return {
        type: "REQUEST_BOOK_LIST"
    }
}

function receiveBookList(bookList) {
    return {
        type: "RECEIVE_BOOK_LIST",
        bookList
    }
}

export function selectBook(foodId) {
    return {
        type: "SELECT_BOOK",
        foodId
    }
}


export function fetchBookList(title="a", author="") {
    return function(dispatch) {
        // Before we do anything, we let the state know
        // that we're requesting the food list but that it hasn't loaded yet
        // This lets us do any load animation or disable important functionality
        dispatch(requestBookList());
        // Axios is a just an easy way to make an API call
        // Remember how we set the proxy in package.json?
        // This prefills that so it communicates with the server
        return Axios.get("https://www.googleapis.com/books/v1/volumes?q=" + title + "&inauthor=" + author + `&key=${process.env.REACT_APP_GOOGLE_BOOKS_KEY}`) // We used Axios last week!
            // Once Axios is done GETTING the request, we can pass the data to another
            // action creator and dispatch that
            .then(response => {
                dispatch(receiveBookList(response.data.items));
                },
                // A better option might be to emit an  action with type 'error' to let users
                // know that something went wrong.
                error => console.log('An error occurred.', error) // Note that errors should be handled in the
                // second argument, not via catch, when using
                // thunk
            );
    }
}