import * as yup from 'yup';
import { EMAIL_REGEX, PASSWORD_REGEX } from '../../constants';

export const signupValidator = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required')
    .matches(EMAIL_REGEX, 'Please enter a valid email'),
  password: yup
    .string()
    .min(8, ({}) => 'Password must be at least 8 characters')
    .required('Password is required')
    .matches(
      PASSWORD_REGEX,
      'Must Contain at least 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character',
    ),
  confirmPassword: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  phone: yup
    .string()
    .required('Phone is a required field')
    .test(
      'len',
      'Phone must be 10 characters long',
      (value) => value.length === 10,
    )
    .matches(/^\d*$/, 'Phone should be a valid number'),
  countryCode: yup.string(),
});

export const initialSignupValues = {
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  countryCode: '',
};
