import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withFormik, Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const OnboardForm = ({values, touched, errors, status }) => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        status && setUsers(users => [...users, status])
    },[status])
    return(
        <div className='onboard-form'>
            <Form>
                <Field type='text' name='name' placeholder='Name'/>
                {touched.name && errors.name && (
                    <p className='error'>{errors.name}</p>
                )}
                <Field type='email' name='email' placeholder='Email'/>
                {touched.email && errors.email && (
                    <p className='error'>{errors.email}</p>
                )}
                <Field type='password' name='password' placeholder='Password' />
                {touched.password && errors.password && (
                    <p className='error'>{errors.password}</p>
                )}
                <Field component='select' className='role-select' name='role'>
                    <option>Choose your role</option>
                    <option value='frontend'>Frontend</option>
                    <option value='backend'>Backend</option>
                    <option value='fullstack'>Fullstack</option>
                    <option value='other'>Other</option>
                </Field>
                {touched.role && errors.role && (
                    <p className='error'>{errors.role}</p>
                )}
                <label className='checkbox-container'>
                    {' '}
                    Terms of Service
                    <Field type='checkbox' name='terms' checked={values.terms}/>
                </label>
                <button type='submit'>Submit</button>
            </Form>
            {users.map(user => (
                <ul key={user.id}>
                    <li>Name: {user.name}</li>
                    <li>Email: {user.email}</li>
                    <li>Password: You wish!</li>
                    <li>Role: {user.role}</li>
                </ul>
            ))}
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
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required('You must have a name, no?'),
        email: Yup.string().required('Most people these days have emails, what is yours?'),
        password: Yup.string().required('Passwords keep you safe, so please enter one'),
        role: Yup.string().oneOf(['frontend', 'backend', 'fullstack', 'other'])
        .required('Please select a role')
    }),
    handleSubmit(values, {setStatus, resetForm}) {
        resetForm();
        axios.post('https://reqres.in/api/users/', values)
        .then(response => {setStatus(response.data); })
        .catch(error => console.log(error.response));
    }
})(OnboardForm);

export default FormikForm;