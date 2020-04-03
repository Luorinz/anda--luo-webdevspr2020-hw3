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

export function selectBook(bookId) {
    return {
        type: "SELECT_BOOK",
        bookId
    }
}


export function fetchBookList(title = "a", author = "") {
    return function (dispatch) {
        dispatch(requestBookList());
        return Axios.get("https://www.googleapis.com/books/v1/volumes?q=" + title + "&inauthor=" + author + `&key=${process.env.REACT_APP_GOOGLE_BOOKS_KEY}`) // We used Axios last week!
            .then(response => {
                    dispatch(receiveBookList(response.data.items));
                },
                error => console.log('An error occurred.', error) // Note that errors should be handled in the
            );
    }
}