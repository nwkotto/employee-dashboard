import React from 'react';
import { connect } from 'react-redux';
import { Table, Tr, Td, Tfoot } from 'reactable'

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
      let { id, first_name, last_name, email, hire_date } = action;
      return state.concat([{ id, first_name, last_name, email, hire_date }]);

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
    <Tr key={`object-list-item-${val.id}`}>
        <Td column="Full Name" data={`${val.first_name} ${val.last_name}`}>{`${val.first_name} ${val.last_name}`}</Td>
        <Td column="Email" data={val.email}>{val.email}</Td>
        <Td column="Hire Date" data={val.hire_date}>{val.hire_date}</Td>
        <Td column="Delete">
          <button className="btn btn-danger" onClick={onDeleteClick.bind(null, val.id)}>Delete</button>
        </Td>
    </Tr>
  ));
  return (
    <div className="table-responsive">
      <Table className="table table-striped" id="table" sortable={[
          {
              column: 'Full Name',
              sortFunction: function(a, b){
                  // Sort by last name
                  var nameA = a.split(' ');
                  var nameB = b.split(' ');

                  return nameA[1].localeCompare(nameB[1]);
              }
          },
          'Email',
          'Hire Date'
      ]}>
        {rows}
      </Table>
      <ObjectListInlineForm />
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