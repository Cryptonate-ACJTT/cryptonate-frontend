import React from "react";
import './RegisterPage.css'

import "./Form.css";
import { Link } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import Multiselect from 'react-widgets/lib/Multiselect'

const required = value => (value ? undefined : 'Required')
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined
const maxLength15 = maxLength(15)
export const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined
export const minLength2 = minLength(2)
const number = value =>
  value && isNaN(Number(value)) ? 'Must be a number' : undefined
const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined
const minValue18 = minValue(18)
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined

const aol = value =>
  value && /.+@aol\.com/.test(value)
    ? 'AOL alert'
    : undefined
const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? 'Only alphanumeric characters'
    : undefined

const employeeIdentificationNumber = value =>
  value && /^(0[1-6]|1[0-6]|2[0-7]|[345]\d|[68][0-8]|7[1-7]|9[0-58-9])-?\d{7}$/.test(value)
    ? 'Invalid EIN'
    :undefined
export const phoneNumber = value =>
  value && !/^(0|[1-9][0-9]{9})$/i.test(value)
    ? 'Invalid phone number, must be 10 digits'
    : undefined
    const renderField = ({
      input,
      label,
      type,
      meta: { touched, error, warning }
    }) => (
      <div>
        <label>{label}</label>
        <div>
          <input {...input} placeholder={label} type={type} />
          {touched &&
            ((error && <span>{error}</span>) ||
              (warning && <span>{warning}</span>))}
        </div>
      </div>
    )
   




class RegisterPage extends React.Component{


  constructor(props) {
    super(props); // 
    this.state = {
            
      Organization_Name: '',
      employeeID: '',
      email: '',
      Category: '',
      Location: '',
      SnsOrg: '',
  
};


  handleSubmitt = (e) => {
     e.preventDefault();
  const { OrganizationName, employeeID, email, Category, Location,SnsOrg } = this.state;
  fetch('http://localhost:4000/api/users/register' , {
  method: "POST",
  headers: {
    'Content-type': 'application/json'
  },
  body: JSON.stringify(this.state)
})
.then((result) => result.json())
.then((info) => { console.log(info); })
      

        }


        render = () =>{
          return (
            <form onSubmit={handleSubmitt}>
              <Field
                name="OrganizationName"
                type="text"
                component={renderField}
                label="OrganizationName"
                validate={[required, maxLength15, minLength2]}
                warn={alphaNumeric}
              />
              <Field
                name="employeeID"
                type="number"
                component={renderField}
                label="employeeID"
                validate={employeeIdentificationNumber}
                
              />
              <Field
        
                name="Category"
                component={Multiselect}
                defaultValue={[]}
                onBlur={() => props.onBlur()}
                data={[ 'animal', 'children', 'education','environment','women', 'international' ]}
        
        
              />
              <Field
                name="email"
                type="email"
                component={renderField}
                label="Email"
                validate={[required, email]}
                warn={aol}
        
              /> 
              
              <Field
                name="phone"
                type="number"
                component={renderField}
                label="Phone number"
        
        
        
        
                validate={[required, phoneNumber]}
              />
        
        
              <Field
                name="Location"
                type="text"
                component={renderField}
                label="location"
                validate={[ minLength2]}
                warn={alphaNumeric}
              />
        
              <Field
                name="SnsOrg"
                type="text"
                component={renderField}
                label="SnsOrg"
                validate={[ minLength2]}
                warn={alphaNumeric}
              />
        
             
        
        
        
              <div>
                <button type="submit" disabled={submitting}>
                  Submit
                </button>
                <button type="button" disabled={pristine || submitting} onClick={reset}>
                  Clear Values
                </button>
              </div>
            </form>
          );



        }

  }


// import login information?


}

export default reduxForm({
  form: 'Form' // a unique identifier for this form
})(RegisterPage)
