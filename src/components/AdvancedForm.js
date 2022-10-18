import { Form, Formik, Field } from "formik"
import CustomInput from "./CustomInput";
import * as yup from "yup"
import CustomSelect from "./CustomSelect";
import CustomCheckbox from "./CustomCheckbox";

// validation schema
const advancedSchema =  yup.object().shape({
  userName: yup.string()
    .min(3,"Username must be atleast 3 characters long")
    .required("Required"),
  jobType:yup.string()
    .oneOf(['web','ML',"AI","DataAnalysis","other"],"Please select job type")
    .required("Required"),
  acceptedTerms:yup.boolean()
    .oneOf([true],"Please Accept the terms of Service")
})


const AdvancedForm = () => {

  const onSubmit = async (values, actions) =>{
    console.log('submitted');
    // mimic an api call
    await new Promise((resolve) => {setTimeout(resolve,1000)})
    actions.resetForm()
  }

  return (
    <Formik
       initialValues={{ userName: '',jobType:"", acceptedTerms:false}}
       validationSchema={advancedSchema}
       onSubmit={onSubmit}
     >
       {/* {(props) => ( */}
       {({isSubmitting}) =>(
        // render a formik Form instead of a html form
         <Form>
          {/* this will know to run the formik handleSubmit method which will then call the onSubmit method  */}
          <CustomInput
          label="Username"
          // name has to be the same as the key in the initial values
          name="userName"
          type="text"
          placeholder="Enter Your Username"
          />
          <CustomSelect
          label="Job Type"
          name="jobType"
          placeholder="Please Select a Job Type"
          >
            <option value="">Please Select a job type</option>
            <option value="ML">ML</option>
            <option value="AI">AI</option>
            <option value="DataAnalysis">Data Analysis</option>
            <option value="web">web</option>
            <option value="other">Other</option>
          </CustomSelect>
          <CustomCheckbox 
          type="checkbox" 
          name="acceptedTerms"
          />
          {/* the Field component hooks up the inputs to the Formik parent. It uses the name attribute to match with the Formik state. <Field/> will default to an HTML <input/> element.
          To make it a <select> we do this: <Field as="select">
           */}

           {/* <Field type="text" name="name" placeholder="Name"/> */}

           {/* it automatically uses the onChange, onBlur and the other helper methods. We don't have to define them as we did for the input element */}
           {/* <input
             type="text"
             onChange={props.handleChange}
             onBlur={props.handleBlur}
             value={props.values.name}
             name="name"
           /> */}
           <button disabled={isSubmitting} type="submit">Submit</button>
         </Form>
       )}
     </Formik>
  );
};
export default AdvancedForm;
