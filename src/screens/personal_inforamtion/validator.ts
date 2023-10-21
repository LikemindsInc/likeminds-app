import * as yup from 'yup';

export const initialPersonalInformationValue = {
  firstName: '',
  lastName: '',
  city: '',
  bio: '',
  country: '',
  countryOfOrigin: '',
};

export const personalInformationValidationSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  city: yup.string().required('City is required'),
  bio: yup.string().required('Bio is required'),
  country: yup.string().optional(),
  countryOfOrigin: yup.string().optional(),
});
