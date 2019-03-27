import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';

const MakerLogSchema = Yup.object().shape( {
  theStatus: Yup
    .string().matches( /(done|doing|to-do)/ ),
  content: Yup
    .string()
    .min( 1, 'Can\'t be no characters' )
    .required( 'Required' )
});

const MakerLogSubmitForm = ( { action, token, submitting } ) => {
  return (
    <div>
      <h1>Submit To-do</h1>
      <Formik
        initialValues={ { 
          theStatus: 'done', 
          content: '' 
        } }
        validationSchema={ MakerLogSchema }
        onSubmit={ ( values, { setSubmitting } ) => {
          // setSubmitting( true );
          action( token, values );
          setSubmitting( false );
        } }
        render={({ errors, status, touched, isSubmitting }) => (
          <Form>
            <Field 
              name="theStatus" 
              component="select"
              // placeholder="Done"                            
            >
              <option value="done">Done</option>
              <option value="doing">Doing</option>
              <option value="to-do">To-do</option>
            </Field>
            <ErrorMessage name="theStatus" component="div" />
            <Field type="text" name="content" />
            <ErrorMessage name="content" component="div" />
            { status && status.msg && <div>{ status.msg }</div> }
            {/* <Button type="submit" disabled={ submitting }> */}
            <Button type="submit" disabled={ isSubmitting }>
              Submit
            </Button>
          </Form>
        )}
      />
    </div>
  );
};

export default MakerLogSubmitForm;
