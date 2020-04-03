import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers/reducers";
import thunkMiddleware from 'redux-thunk';
import {
    BrowserRouter, Switch,
    Route, Redirect
} from "react-router-dom";
import BookView from "./containers/bookView";
import MyListView from "./containers/myListView";

const store = createStore(reducer, applyMiddleware(thunkMiddleware));


ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>

                <Route path="/book" component={BookView}/>
                <Route path="/mylist" component={MyListView}/>

                <Redirect exact from="/" to="book" />
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);