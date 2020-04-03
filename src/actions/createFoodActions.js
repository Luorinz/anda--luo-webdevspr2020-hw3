import Axios from 'axios'

function requestNewFood() {
    return {
        type: "REQUEST_NEW_FOOD"
    }
}

function receiveNewFoodSuccess(foodId) {
    return {
        type: "RESPONSE_NEW_FOOD_SUCCESS",
        foodId
    }
}

function receiveNewFoodError() {
    return {
        type: "RESPONSE_NEW_FOOD_ERROR"
    }
}

export function createNewFood(newFood) {
    return function(dispatch) {
        dispatch(requestNewFood());
        return Axios.post(`https://www.googleapis.com/books/v1/volumes?q=banana&inauthor=dan&key=${process.env.REACT_APP_GOOGLE_BOOKS_KEY}
`, newFood)
            .then(
                response => dispatch(receiveNewFoodSuccess(response.data)),
                receiveNewFoodError
            );
    }
}