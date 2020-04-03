import React from "react";
import {connect} from 'react-redux';
import {fetchMyList} from "../actions/myListActions";
import Axios from "axios";

class MyListView extends React.Component {

    // componentDidMount executes AFTER the constructor
    // but before the component renders for the first time
    // and it is only called once in the lifespan of the object
    // so API calls are often made here
    componentDidMount() {
        this.props.onMount();
    }

    render() {
        // Some simple loading code.  If we were working with a button
        // or other logic, we might want to disable it
        if (this.props.loading) {
            return <h3>Loading...</h3>
        }

        return (<div>
            <h1>These are my books!</h1>
            <div>{this._renderMyList()}</div>
        </div>);
    }

    _renderMyList() {


        const toReadRow = this.props.toReadList.map(book => (
            <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.subtitle}</td>
                <td>{book.authors}</td>
                <td><button type="submit" onClick={() => {
                    Axios.post("/api/book/addhaveread", {
                        id: book.id,
                        title: book.title,
                        subtitle: book.subtitle,
                        authors: book.authors,
                        publisher: book.publisher,
                        publishedDate: book.publishedDate,
                        description: book.description
                    });
                }}>Add to Have-read</button>
                <button type="submit" onClick={() => {
                    Axios.delete("/api/book/deletetoread/" + book.id);
                }}>Delete</button></td>
            </tr>));

        const haveReadRow = this.props.haveReadList.map(book => (
            <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.subtitle}</td>
                <td>{book.authors}</td>
                <td><button type="submit" onClick={() => {
                    Axios.post("/api/book/addtoread", {
                        id: book.id,
                        title: book.title,
                        subtitle: book.subtitle,
                        authors: book.authors,
                        publisher: book.publisher,
                        publishedDate: book.publishedDate,
                        description: book.description
                    });
                }
                }>Add to To-read</button>
                <button type="submit" onClick={() => {
                    Axios.delete("/api/book/deletehaveread/" + book.id);
                }}>Delete</button></td>
            </tr>));

        return (
            <div>
                <h2>My To-Read List</h2>
                <table>
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Subtitle</th>
                        <th>Authors</th>
                    </tr>
                    </thead>
                    <tbody>
                    {toReadRow}
                    </tbody>
                </table>
                <h2>My Have-Read List</h2>

                <table>
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Subtitle</th>
                        <th>Authors</th>
                    </tr>
                    </thead>
                    <tbody>
                    {haveReadRow}
                    </tbody>
                </table>


            </div>)


    }
}


function mapDispatchToProps(dispatch, props) {
    return {
        onMount: () => {
            // thunk middleware simplifies a lot of the logic
            // but the idea is to treat thunk action creators
            // like normal action creators (thanks to the help
            // of the thunk middleware)
            dispatch(fetchMyList());
        }
    }
};


// Accept the state and parse out whatever data we need
function mapStateToProps(state, props) {
    return {
        toReadList: state.myList.toReadList,
        haveReadList: state.myList.haveReadList,
        loading: state.myList.inFlight,
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyListView)