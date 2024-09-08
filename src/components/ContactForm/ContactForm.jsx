import { Formik, Field, Form } from 'formik';
import { useDispatch } from 'react-redux';
import { object, string } from 'yup';
import { addContact } from '../../redux/contactsOps';
import css from './ContactForm.module.css';

const validationSchema = object({
  name: string()
    .required('Name is required')
    .min(3, 'Minimum 3 characters')
    .max(50, 'Maximum 50 characters'),
  number: string()
    .required('Number is required')
    .matches(/^\d+$/, 'Must contain only digits')
    .min(3, 'Minimum 3 digits')
    .max(50, 'Maximum 50 digits'),
});

const initialValues = {
  name: '',
  number: '',
};

const ContactForm = () => {
  const dispatch = useDispatch();
 
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        dispatch(addContact(values));
        resetForm();
      }}
    >
      {({
        errors,
        touched,
      }) => (
        <Form className={css.ContactForm}>
          <label className={css.ContactForm__field}>
            Name:
            <Field
              type="text"
              name="name"
            />
            {errors.name && touched.name && (
              <span>
                {errors.name}
              </span>
            )}
          </label>
          <label className={css.ContactForm__field}>
            Number:
            <Field
              type="text"
              name="number"
            />
            {errors.number && touched.number && (
              <span>
                {errors.number}
              </span>
            )}
          </label>
          <button type="submit">
            Submit
          </button>
        </Form>
      )}
    </Formik>
  )
};

export default ContactForm;