import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';

const MainForm = styled(Form)`
    width: 30%;
    height: auto;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    background-color: white;
`;

const TopField = styled(Field)`
    font-size: 1rem;
    margin: 2%;
`;
const SelectField = styled(Field)`
    font-size: 1rem;
    margin: 2% auto;
`;
const TermsLabel = styled.label`
    font-size: 1rem;
    margin: 1%;
`;
const SubmitButton = styled.button`
    background-color: #007bff;
    font-size: 1.25rem;
    color: white;
    width: 40%;
    height: 30px;
    margin: 4% auto;
    border-radius: .25rem;
`;


const OnboardForm = ({values, touched, errors, status }) => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        status && setUsers(users => [...users, status])
    },[status])
    return(
        <div className='onboard-form'>
            <MainForm>
                <TopField type='text' name='name' placeholder='Name'/>
                {touched.name && errors.name && (
                    <p className='error'>{errors.name}</p>
                )}
                <TopField type='email' name='email' placeholder='Email'/>
                {touched.email && errors.email && (
                    <p className='error'>{errors.email}</p>
                )}
                <TopField type='password' name='password' placeholder='Password' />
                {touched.password && errors.password && (
                    <p className='error'>{errors.password}</p>
                )}
                <SelectField component='select' className='role-select' name='role'>
                    <option>Choose your role</option>
                    <option value='Frontend'>Frontend</option>
                    <option value='Backend'>Backend</option>
                    <option value='Fullstack'>Fullstack</option>
                    <option value='Other'>Other</option>
                </SelectField>
                {touched.role && errors.role && (
                    <p className='error'>{errors.role}</p>
                )}
                <TermsLabel className='checkbox-container'>
                    {' '}
                    Terms of Service
                    <Field type='checkbox' name='terms' checked={values.terms}/>
                </TermsLabel>
                <SubmitButton type='submit'>Submit</SubmitButton>
            </MainForm>
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
        role: Yup.string().oneOf(['Frontend', 'Backend', 'Fullstack', 'Other'])
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