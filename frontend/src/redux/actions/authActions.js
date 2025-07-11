import { toast } from "react-toastify";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS= "LOGIN_SUCCESS";
export const LOGIN_FAILURE= "LOGIN_FAILURE";

export const SIGNUP_REQUEST = "SIGNUP_REQUEST";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";

//SIGNUP

export const signup= (values) => async (dispatch) =>{
    console.log("User signup ..",values);
    dispatch({type: SIGNUP_REQUEST});
     try {
    const res = await fetch("https://mern-stack-tutorial-dy2v.onrender.com/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: values.name,
        email: values.email,
        password: values.password,
      }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Signup failed");

    // Store JWT token in local storage
    localStorage.setItem("token", data.token);

    toast.success("User registered successfully!");

    dispatch({
      type: SIGNUP_SUCCESS,
      payload: data.user,
    });

    return true;
  } catch (error) {
    console.error("Signup error:", error.message);

    dispatch({
      type: SIGNUP_FAILURE,
      payload: error.message,
    });

    toast.error(error.message);
  }
};
export const login = (values) => async (dispatch) => {
  console.log("Logging in user...", values);
  dispatch({ type: LOGIN_REQUEST });

  try {
    const res = await fetch("https://mern-stack-tutorial-dy2v.onrender.com/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Login failed");

    localStorage.setItem("token", data.token);

    toast.success("Login successful!");

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.user,
    });

    return true;
  } catch (error) {
    console.error("Login error:", error.message);

    dispatch({
      type: LOGIN_FAILURE,
      payload: error.message,
    });

    toast.error(error.message);
    return false;
  }
};
