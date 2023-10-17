import { IEducation } from '@app-model';
import * as yup from 'yup';

export const educationValidator = yup.object().shape({
  startDate: yup.string().required('Start date is required'),
  endDate: yup.string().required('End date is required'),
  degree: yup.string().required('Degree is required'),
  school: yup.string().required('School is required'),
  major: yup.string().required('Major is required'),
});

export const initialEducationValues: IEducation = {
  startDate: '',
  endDate: '',
  degree: '',
  school: '',
  major: '',
};
