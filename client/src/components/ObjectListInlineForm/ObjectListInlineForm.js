import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, reset } from 'redux-form';
import { CREATE_OBJECT, OBJECT_CREATE_ERROR, REQUEST_STARTED, REQUEST_FINISHED } from '../ObjectList/ObjectList';

const FORM_NAME = 'createEmployee';

let ObjectListInlineForm = ({ onSubmit, handleSubmit }) => (
  <form onSubmit={handleSubmit(onSubmit)}>
    <h2>Create a New Employee</h2>
    <div className="form-group">
      <label htmlFor="employee-first">First Name *</label>
      <Field name="first_name" component="input" type="text" placeholder="Jon" className="form-control" id="employee-first" required="required"/>
    </div>
    <div className="form-group">
      <label htmlFor="employee-last">Last Name *</label>
      <Field name="last_name" component="input" type="text" placeholder="Snow" className="form-control" id="employee-last" required="required"/>
    </div>
    <div className="form-group">
      <label htmlFor="employee-email">Email *</label>
      <Field name="email" component="input" type="email" placeholder="jon.snow@winterfell.com" className="form-control" id="employee-email" required="required"/>
    </div>
    <div className="form-group">
      <label htmlFor="employee-hire">Hire Date</label>
      <Field name="hire_date" component="input" type="date" className="form-control" id="employee-hire"/>
    </div>
    <button className="btn btn-default" type="submit">Submit</button>
  </form>
)

// Actions

export const createUserWithForm = (form) => {
  return (values) => {
    return (dispatch) => {
      dispatch({type: REQUEST_STARTED})
      $.ajax({
          url: `/api/employees/`,
          type: 'POST',
          data: values,
          success: function(result) {
            dispatch(reset(form));
            dispatch({
              type: CREATE_OBJECT,
              ...values
            });
          },
          error: function(err) {
            dispatch({
              type: OBJECT_CREATE_ERROR
            })
          },
          complete: function() {
            dispatch({type: REQUEST_FINISHED})
          }
      });
    }
  };
}

// Connect

const mapStateToProps = (state) => ({
  initialValues: {employer: state.employer.id}
})

ObjectListInlineForm = connect(
  mapStateToProps,
  { onSubmit: createUserWithForm(FORM_NAME) }
)(reduxForm({
  form: FORM_NAME
})(ObjectListInlineForm));

export default ObjectListInlineForm;