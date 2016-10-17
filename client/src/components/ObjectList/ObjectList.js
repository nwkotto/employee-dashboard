import React from 'react';
import { connect } from 'react-redux';

import ObjectListInlineForm from '../ObjectListInlineForm/ObjectListInlineForm';

// Constants 

export const DELETE_OBJECT = "DELETE_OBJECT";
export const CREATE_OBJECT = "CREATE_OBJECT";
export const OBJECT_DELETE_ERROR = "OBJECT_DELETE_ERROR";
export const OBJECT_CREATE_ERROR = "OBJECT_CREATION_ERROR";
export const REQUEST_STARTED = 'REQUEST_STARTED';
export const REQUEST_FINISHED = 'REQUEST_FINISHED';

// Reducer

export const reducer = (state = [], action) => {
  switch (action.type) {
    case CREATE_OBJECT:
      let { id, name, email, hire_date } = action;
      return state.concat([{ id, name, email, hire_date }]);

    case DELETE_OBJECT:
      return state.filter((val) => (val.id !== action.id));
    
    default:
      return state;
  }
}

// Action creators

const deleteObject = (id) => {
  return (dispatch) => {
    dispatch({type: REQUEST_STARTED})
    $.ajax({
        url: `/api/employees/${id}`,
        type: 'DELETE',
        success: function(result) {
          // Do something with the result
          dispatch({
            type: DELETE_OBJECT,
            id
          });
        },
        error: function(err) {
          dispatch({
            type: OBJECT_DELETE_ERROR
          })
        },
        complete: function() {
          dispatch({type: REQUEST_FINISHED})
        }
    });
  }
};

// Component

let ObjectList = ({ objs, onDeleteClick }) => {
  let rows = objs.map((val) => (
    <tr key={`object-list-item-${val.id}`}>
      <td>{val.full_name}</td>
      <td>{val.email}</td>
      <td>{val.hire_date}</td>
      <td>
        <button className="btn btn-danger" onClick={onDeleteClick.bind(null, val.id)}>Delete</button>
      </td>
    </tr>
  ));
  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Hire Date</th>
            <th>Remove?</th>
          </tr>
        </thead>
        <tbody>
          {rows}
          <ObjectListInlineForm />
        </tbody>
      </table>
    </div>
  )
}

// Connect

const mapStateToProps = (state) => ({
  objs: state.objectList
});

ObjectList = connect(
  mapStateToProps,
  { onDeleteClick: deleteObject }
)(ObjectList)

export default ObjectList;