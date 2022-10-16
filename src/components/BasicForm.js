import { useFormik } from "formik";
import * as yup from "yup"

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 chars, 1 uppercase, 1 lowercase, 1 numeric
// the schema is equal to an onject defined with this particular shape 
const basicSchema = yup.object().shape({
  email:yup.string()
    .email("Please enter a valid email")
    .required(),
  age:yup.number()
    .positive()
    .integer()
    .required("Required"),
  password:yup
    .string()
    .min(5)
    .matches(passwordRules, {message:"Please create a stronger password"})
    .required("Required"),
  confirmPassword:yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    // it's null when it doesn't find it 
    .required("Required")
})

const BasicForm = () => {

  const onsubmit = () =>{
    console.log('submitted');
  }

  // const formik = useFormik({
    // destructure the formik and remove all the things needed
  const {values, errors,handleBlur, handleChange,handleSubmit} = useFormik({
    // this will be our state
    initialValues:{
      email:"",
      age:"",
      password:'',
      confirmPassword:""
    },
    validationSchema: basicSchema,
    onsubmit,
  })
  console.log(errors);
  return (
    <form
    onSubmit={handleSubmit} 
    autoComplete="off">
      <label htmlFor="email">Email</label>
      <input 
      id="email" 
      type="email" 
      placeholder="Enter your email" 
      // value={formik.values.email}
      // with the destructured formik we don't need to call formik all the time
      value={values.email}
      // onChange={formik.handleChange}
      onChange={handleChange}
      onBlur={handleBlur}
      />
      <label htmlFor="age">Age</label>
      <input 
      id="age" 
      type="number" 
      placeholder="Enter your age" 
      value={values.age}
      onChange={handleChange}
      onBlur={handleBlur}
      />
      <label htmlFor="password">Password</label>
      <input 
      id="password" 
      type="password" 
      placeholder="Enter your password" 
      value={values.password}
      onChange={handleChange}
      onBlur={handleBlur}
      />
      <label htmlFor="password">Confirm Password</label>
      <input 
      id="confirmPassword" 
      type="password" 
      placeholder="Confirm password"
      value={values.confirmPassword}
      onChange={handleChange}
      onBlur={handleBlur}
       />
      <button type="submit">Submit</button>
    </form>
  );
};
export default BasicForm;
