// import React from "react";
// import { API_ROUTES, postToBackend } from "../../Fetch/ApiFetches";

// import { Link } from 'react-router-dom'
// import { Field, reduxForm } from 'redux-form'



// const required = value => (value ? undefined : 'Required')
// const maxLength = max => value =>
//   value && value.length > max ? `Must be ${max} characters or less` : undefined
// const maxLength15 = maxLength(15)
// export const minLength = min => value =>
//   value && value.length < min ? `Must be ${min} characters or more` : undefined
// export const minLength2 = minLength(2)
// const number = value =>
//   value && isNaN(Number(value)) ? 'Must be a number' : undefined
// const minValue = min => value =>
//   value && value < min ? `Must be at least ${min}` : undefined

// export const phoneNumber = value =>
//   value && !/^(0|[1-9][0-9]{9})$/i.test(value)
//     ? 'Invalid phone number, must be 10 digits'
//     : undefined

// const renderField = ({
//   input,
//   label,
//   type,
//   meta: { touched, error, warning }
// }) => (
//   <div>
//     <label>{label}</label>
//     <div>
//       <input {...input} placeholder={label} type={type} />
//       {touched &&
//         ((error && <span>{error}</span>) ||
//           (warning && <span>{warning}</span>))}
//     </div>
//   </div>
// )





// class organizationForm extends React.Component {


//   constructor(props) {
//     super(props); // 
//     this.onChange = this.onChange.bind(this)
//     this.state = {

//       title: '',
//       subtitle: '',
//       summary: '',
//       goalAmount: '',
//       image: '',
//       detail: '',
//       solution: ''

//     };


//     handleSubmitt = (e) => {
//       e.preventDefault();
//       const { title, subtitle, detail, image, summary, solution } = this.state;
//       fetch('http://localhost:4000/api/users/register', {
//         method: "POST",
//         headers: {
//           'Content-type': 'application/json'
//         },
//         body: JSON.stringify(this.state)
//       })
//         .then((result) => result.json())
//         .then((info) => { console.log(info); })


//     }

//     onChange = (e) => {
//       const { input: { onChange } } = this.props
//       onChange(e.target.files[0]);
//     }


//     render = () => {
    
//       return (
//         <form onSubmit={handleSubmitt}>

//           <Field
//             name="title"
//             type="text"
//             component={renderField}
//             label="title"
//             validate={[required, maxLength15, minLength2]}
//           />

//           <Field
//             name="subtitle"
//             type="text"
//             component={renderField}
//             label="subtitle"
//             validate={[required, maxLength15, minLength2]}
//           />

//           <Field
//             name="summary"
//             type="text"
//             component={renderField}
//             label="summary"
//             validate={[required, maxLength15, minLength2]}
//           />

//           <Field
//             name="goalAmount"
//             type="number"
//             component={renderField}
//             label="goalAmount"
//             validate={[required]}
//             warn={aol}
//           />

//           <Field
//             name="image"
//             type="file"
//             accept=".jpg, .png, .jpeg"
//             label="image"
//             onChange={this.onChange}
//           />


//           <Field
//             name="detail"
//             type="text"
//             component={renderField}
//             label="detail"
//             validate={[minLength2]}

//           />

//           <Field
//             name="solution"
//             type="text"
//             component={renderField}
//             label="solution"
//             validate={[minLength2]}

//           />


//           <div>
//             <button type="submit" disabled={submitting}>
//               Submit
//             </button>
//             <button type="button" disabled={pristine || submitting} onClick={reset}>
//               Clear Values
//             </button>
//           </div>
//         </form>
//       );



//     }

//   }


//   // import login information?


// }

// export default OrganizationForm({
//   form: 'Form' // a unique identifier for this form
// })(organizationForm)
