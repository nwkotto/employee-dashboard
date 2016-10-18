import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Redirect, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { reducer as form } from 'redux-form'

import Main from './components/Main/Main'
import { reducer as objectList, OBJECT_DELETE_ERROR, OBJECT_CREATE_ERROR, REQUEST_STARTED, REQUEST_FINISHED } from './components/ObjectList/ObjectList';

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
var csrftoken = getCookie('csrftoken');

// Setup
$.ajaxSetup({
    headers: { "X-CSRFToken": csrftoken }
});

const err = (state = '', action) => {
    switch (action.type) {
        case OBJECT_DELETE_ERROR:
            return 'Error deleting object';
        
        case OBJECT_CREATE_ERROR:
            return 'Error creating object';

        default:
            return '';
    }
}

const updating = (state = false, action) => {
  switch (action.type) {
    case REQUEST_STARTED:
      return true;
    
    case REQUEST_FINISHED:
      return false;

    default:
      return state;
  }
}

const employer = (state = {id:-1, name:'N/A'}, action) => {
  switch (action.type) {
    default:
      return state;
  }
}

const reducers = {
  objectList,
  form,
  err,
  updating,
  employer
}
const reducer = combineReducers(reducers)

// Fetch initial state
let employerQuery = $.get('/api/employers'),
  employeeQuery = $.get('/api/employees');

$.when(employerQuery, employeeQuery)
  .then((employers, employees) => {
    employers = employers[0],
    employees = employees[0];
    const store = createStore(
      reducer,
      {
        objectList: employees,
        employer: employers[0]
      },
      applyMiddleware(thunk));

    var App = () => (
        <Provider store={store}>
          <Router history={browserHistory}>
            <Route path="/employees" component={Main}/>
            <Redirect from="/:anything" to="/employees"/>
            <Redirect from="/" to="/employees"/>
          </Router>
        </Provider>
    )

    ReactDOM.render(<App />, document.getElementById('container'))
  });