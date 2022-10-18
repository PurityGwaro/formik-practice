import { useField } from "formik"

export default function CustomSelect({label, ...props}) {
// useField helps you hook up inputs to Formik
// field - info about the input field
// meta- whether it's been touched or if there's an error
// helpers - Formik functions
const [field, meta, helpers] = useField(props)
console.log(field);
console.log(meta);
  return (
    <>
     <label>{label}</label>
        <select
        {...field} 
        {...props}
        className={meta.touched && meta.error ? "input-error" : ""}
        />
         {/*{...field} spreads the formik functions to the imput field to enable it to be hooked to formik, it also has the name prop too  */}
         {meta.touched && meta.error && (
            <div className="error">{meta.error}</div>
         )}
    </>
  )
}
 
