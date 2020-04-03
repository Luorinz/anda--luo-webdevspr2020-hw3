import React from "react";
import {connect} from 'react-redux';
import {fetchBookList} from "../actions/bookActions";
import Axios from 'axios'

class BookView extends React.Component {

    // componentDidMount executes AFTER the constructor
    // but before the component renders for the first time
    // and it is only called once in the lifespan of the object
    // so API calls are often made here
    // componentDidMount() {
    //     this.props.onMount();
    // }

    render() {
        // Some simple loading code.  If we were working with a button
        // or other logic, we might want to disable it
        if (this.props.loading) {
            return <h3>Loading...</h3>
        }


        const request = {};


        return (
            <div>
                <h1>Book Search</h1>
                <label>Title</label>
                <div>
                    <input onChange={(e) => request.title = e.target.value} name="title" component="input" type="text"
                           placeholder="Book title here..."/>
                </div>
                <label>Author</label>
                <div>
                    <input onChange={(e) => request.author = e.target.value} name="author" component="input" type="text"
                           placeholder="Author here..."/>
                </div>

                <div>
                    <button type="submit" disabled={this.props.inFlight}
                            onClick={() => this.props.handleSearch(request)}>Submit
                    </button>
                </div>
                <div>{this._renderBookList()}</div>
            </div>);
    }

    _renderBookList() {
        if (!this.props.bookList || this.props.bookList.length === 0) {
            return null;
        }

        const foodRows = this.props.bookList.map(food => (
            <tr key={food.id}>
                <td>{food.volumeInfo.title}</td>
                <td>{food.volumeInfo.subtitle}</td>
                <td>{food.volumeInfo.authors}</td>
                <td>{food.volumeInfo.publisher}</td>
                <td>{food.volumeInfo.publishedDate}</td>
                <td>{food.volumeInfo.description}</td>
                <td><button type="submit" onClick={() => {
                    Axios.post("/api/book/addtoread", {
                        id: food.id,
                        title: food.volumeInfo.title,
                        subtitle: food.volumeInfo.subtitle,
                        authors: food.volumeInfo.authors,
                        publisher: food.volumeInfo.publisher,
                        publishedDate: food.volumeInfo.publishedDate,
                        description: food.volumeInfo.description
                    });
                }
                }>Add to To-Read</button></td>
                <td><button type="submit" onClick={() => {
                    Axios.post("/api/book/addhaveread", {
                        id: food.id,
                        title: food.volumeInfo.title,
                        subtitle: food.volumeInfo.subtitle,
                        authors: food.volumeInfo.authors,
                        publisher: food.volumeInfo.publisher,
                        publishedDate: food.volumeInfo.publishedDate,
                        description: food.volumeInfo.description
                    });
                }
                }>Add to Have-Read</button></td>

            </tr>));
        return (<table>
            <thead>
            <tr>
                <th>Title</th>
                <th>Subtitle</th>
                <th>Authors</th>
                <th>Publisher</th>
                <th>Published Date</th>
                <th>Description</th>
            </tr>
            </thead>
            <tbody>
            {foodRows}
            </tbody>
        </table>)

    }
}


function mapDispatchToProps(dispatch, props) {
    return {
        handleSearch: (request) => {
            // thunk middleware simplifies a lot of the logic
            // but the idea is to treat thunk action creators
            // like normal action creators (thanks to the help
            // of the thunk middleware)
            dispatch(fetchBookList(request.title, request.author));
        },
    }
};


// Accept the state and parse out whatever data we need
function mapStateToProps(state, props) {
    return {
        bookList: state.books.list,
        loading: state.books.inFlight,
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BookView)