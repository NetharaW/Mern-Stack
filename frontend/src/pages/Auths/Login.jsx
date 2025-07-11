import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import logo from "../../assets/logo.png"; // Use your image path
import { useDispatch } from "react-redux";
import { login } from "../../redux/actions/authActions"; // implement this action
import { Link } from "react-router-dom";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (values, { resetForm }) => {
    const success = await dispatch(login(values));
    if (success) resetForm();
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center vh-100">
      <div className="login-card shadow p-4" style={{ width: '360px' }}>
        <div className="text-center mb-4">
          <img
            className="logo"
            src={logo}
            alt="Logo"
            style={{ width: "100px", borderRadius: "50%" }}
          />
        </div>
        <h3 className="text-center mb-3">Login</h3>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <Field type="email" name="email" className="form-control" />
                <ErrorMessage name="email" component="div" className="text-danger" />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <Field type="password" name="password" className="form-control" />
                <ErrorMessage name="password" component="div" className="text-danger" />
              </div>
              <button type="submit" className="btn btn-primary w-100 mt-2" disabled={isSubmitting}>
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
            </Form>
          )}
        </Formik>

        <div className="text-center mt-3">
          Don’t have an account? <Link to="/register">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
