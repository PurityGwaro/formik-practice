import { useFormik } from "formik";
import * as yup from "yup"

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 chars, 1 uppercase, 1 lowercase, 1 numeric
// the schema is equal to an onject defined with this particular shape 
const basicSchema = yup.object().shape({
  email:yup.string()
    .email("Please enter a valid email i.e example@gmail.com")
    .required("Required"),
  age:yup.number()
    .positive("No Negative Numbers")
    .integer("Must Be A Number")
    .required("Required"),
  password:yup
    .string()
    .min(5)
    .matches(passwordRules, {message:"Please create a stronger password. Minimum of 5 characters, must have 1 uppercase letter, 1 lowercase letter and 1 number!"})
    .required("Required"),
  confirmPassword:yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    // it's null when it doesn't find it 
    .required("Required")
})

const BasicForm = () => {

  const onSubmit = async (values, actions) =>{
    console.log(values);
    console.log(actions);
    console.log('submitted');
    // mimic an api call
    await new Promise((resolve) => {setTimeout(resolve,1000)})
    actions.resetForm()
  }

  // const formik = useFormik({
    // destructure the formik and remove all the things needed
  const {values, errors,touched, isSubmitting, handleBlur, handleChange,handleSubmit} = useFormik({
    // this will be our state
    initialValues:{
      email:"",
      age:"",
      password:'',
      confirmPassword:""
    },
    validationSchema: basicSchema,
    onSubmit,
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
      className={errors.email &&  touched.email ? "input-error" : ""}
      />
      {/* display the actual error message */}
      {errors.email &&  touched.email && (
        <p className="error">{errors.email}</p>
      )}
      <label htmlFor="age">Age</label>
      <input 
      id="age" 
      type="number" 
      placeholder="Enter your age" 
      value={values.age}
      onChange={handleChange}
      onBlur={handleBlur}
      className={errors.age &&  touched.age ? "input-error" : ""}
      />
      {errors.age &&  touched.age && (
        <p className="error">{errors.age}</p>
      )}
      <label htmlFor="password">Password</label>
      <input 
      id="password" 
      type="password" 
      placeholder="Enter your password" 
      value={values.password}
      onChange={handleChange}
      onBlur={handleBlur}
      className={errors.password &&  touched.password ? "input-error" : ""}
      />
      {errors.password &&  touched.password && (
        <p className="error">{errors.password}</p>
      )}
      <label htmlFor="password">Confirm Password</label>
      <input 
      id="confirmPassword" 
      type="password" 
      placeholder="Confirm password"
      value={values.confirmPassword}
      onChange={handleChange}
      onBlur={handleBlur}
      className={errors.confirmPassword &&  touched.confirmPassword ? "input-error" : ""}
       />
       {errors.confirmPassword &&  touched.confirmPassword && (
        <p className="error">{errors.confirmPassword}</p>
      )}
      {/* button disabled when isSubmitting is true */}
      <button disabled={isSubmitting} type="submit">Submit</button>
    </form>
  );
};
export default BasicForm;
