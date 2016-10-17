import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

import Main from './components/Main/Main'
import { reducer as objectList, OBJECT_DELETE_ERROR, OBJECT_CREATE_ERROR } from './components/ObjectList/ObjectList';

const err = (state = "", action) => {
    switch (action.type) {
        case OBJECT_DELETE_ERROR:
            return "Error deleting object";
        
        case OBJECT_CREATE_ERROR:
            return "Error creating object";

        default:
            return "";
    }
}

const reducers = {
  objectList,
  form,
  err
}
const reducer = combineReducers(reducers)
const store = createStore(reducer)

var Hello = () => (
    <Provider store={store}>
        <Main />
    </Provider>
)

ReactDOM.render(<Hello />, document.getElementById('container'))