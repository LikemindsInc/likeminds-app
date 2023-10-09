import * as yup from "yup";

export const loginValidator = yup.object().shape({
  email: yup.string().required("Email is required"),
  password: yup.string().required("Password is required"),
});

export const initialLoginValue = {
  email: "",
  password: "",
};
