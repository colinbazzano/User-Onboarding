import React from 'react';
import axios from 'axios';
import { withFormik, Form, Field, setNestedObjectValues } from 'formik';
import * as Yup from 'yup';

const Form = ({}) => {

    return(
        <div className='onboard-form'>
            <Form>
                <Field type='text' name='name' placeholder='Name'/>
                <Field type='email' name='email' placeholder='Email'/>
                <Field type='password' name='password' placeholder='Password' />
                <Field component='select' className='role-select' name='role'>
                    <option>Choose your role</option>
                    <option value='frontend'>Frontend</option>
                    <option value='backend'>Backend</option>
                    <option value='fullstack'>Fullstack</option>
                    <option value='other'>Other</option>
                </Field>
                <label className='checkbox-container'>
                    {' '}
                    Terms of Service
                    <Field type='checkbox' name='terms' checked={values.terms}/>
                </label>
                <button type='submit'>Submit</button>
            </Form>

        </div>
    );
};
const FormikForm = withFormik({
    mapPropsToValues({ name, email, password, role, terms }) {
        return {
            name: name || '',
            email: email || '',
            password: password || '',
            role: role || '',
            terms: terms || false
        };
    }
})(Form);

export default FormikForm;