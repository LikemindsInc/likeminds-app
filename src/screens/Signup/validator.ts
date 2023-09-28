import * as yup from "yup";
import { PASSWORD_REGEX } from "../../constants";

export const signupValidator = yup.object().shape({
	email: yup
		.string()
		.email("Please enter a valid email")
		.required("Email is required"),
	password: yup
		.string()
		.min(8, ({}) => "Password must be at least 8 characters")
		.required("Password is required")
		.matches(
			PASSWORD_REGEX,
			"Must Contain at least 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
		),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref("password")], "Passwords must match"),
	phone: yup
		.string()
		.required()
		.max(10, ({}) => "Phone must be at least 10 characters"),
});

export const initialSignupValues = {
	email: "",
	phone: "",
	password: "",
	confirmPassword: "",
};
