import { IExperience } from '@app-model';
import * as yup from 'yup';

export const experienceValidator = yup.object().shape({
  startDate: yup.string().required('Start date is required'),
  endDate: yup.string(),
  stillWorkHere: yup.boolean(),
  jobTitle: yup.string().required('Job Title is required'),
  companyName: yup.string().required('Company Name is required'),
  responsibilities: yup.string(),
  industry: yup.string().required('Industry date is required'),
});

export const initialExperienceValues: IExperience = {
  startDate: '',
  endDate: '',
  stillWorkHere: false,
  jobTitle: '',
  companyName: '',
  responsibilities: '',
  industry: '',
};
