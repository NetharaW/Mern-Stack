import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import logo from "../../assets/logo.png";
import { useDispatch } from "react-redux";
import { signup } from "../../redux/actions/authActions"; 

const SignupSchema = Yup.object().shape({
    fullname: Yup.string().required("Fullname is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
        .matches(/^[0-9]{10,15}$/, "Phone must be 10–15 digits")
        .required("Phone is required"),
    password: Yup.string()
        .min(6, "Minimum 6 characters")
        .required("Password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm your password"),
});

const Signup = () => {
    const dispatch = useDispatch();

    const handleSubmit = async (values, { resetForm }) => {
        const { fullname, email, phone, password } = values;

        // Call the signup action
        const success = await dispatch(signup({
            name: fullname,
            email,
            phone,
            password
        }));

        if (success) {
            resetForm();
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-card shadow p-4">
                <div className="text-center mb-4">
                    <img
                        className="logo"
                        src={logo}
                        alt="Logo"
                        style={{ width: "200px" }}
                    />
                </div>
                <h3 className="mb-4 text-center">Sign Up</h3>

                <Formik
                    initialValues={{
                        fullname: "",
                        email: "",
                        phone: "",
                        password: "",
                        confirmPassword: "",
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className="mb-3">
                                <label className="form-label">Fullname</label>
                                <Field type="text" name="fullname" className="form-control" />
                                <ErrorMessage name="fullname" component="div" className="text-danger" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <Field type="email" name="email" className="form-control" />
                                <ErrorMessage name="email" component="div" className="text-danger" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Phone</label>
                                <Field type="text" name="phone" className="form-control" />
                                <ErrorMessage name="phone" component="div" className="text-danger" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <Field type="password" name="password" className="form-control" />
                                <ErrorMessage name="password" component="div" className="text-danger" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Confirm Password</label>
                                <Field type="password" name="confirmPassword" className="form-control" />
                                <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
                            </div>

                            <button type="submit" className="btn btn-primary w-100 mt-3" disabled={isSubmitting}>
                                {isSubmitting ? "Signing up..." : "Sign Up"}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Signup;
