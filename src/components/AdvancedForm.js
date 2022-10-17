import { Form, Formik, Field } from "formik"
const AdvancedForm = () => {
  return (
    <Formik
       initialValues={{ name: 'jared' }}
     >
       {props => (
        // render a formik Form instead of a html form
         <Form>
          {/* this will know to run the formik handleSubmit method which will then call the onSubmit method  */}
          {/* the Field component hooks up the inputs to the Formik parent. It uses the name attribute to match with the Formik state. <Field/> will default to an HTML <input/> element.
          To make it a <select> we do this: <Field as="select">
           */}
           <Field type="text" name="name" placeholder="Name"/>
           {/* it automatically uses the onChanger, onBlur and the other helper methods. We don't have to define them as we did for the input element */}
           {/* <input
             type="text"
             onChange={props.handleChange}
             onBlur={props.handleBlur}
             value={props.values.name}
             name="name"
           /> */}
           <button type="submit">Submit</button>
         </Form>
       )}
     </Formik>
  );
};
export default AdvancedForm;
