import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState({
    username: "",
    password: "",
  });
  const { username, password } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
        position: "bottom-left",
    });

  const handleSuccess = (msg) =>
    toast.success(msg, {
        position: "bottom-left",
        

        
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_POINT}/login`,
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      console.log(data);
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    setInputValue({
      ...inputValue,
      username: "",
      password: "",
    });
  };

  return (
    <div className="d-flex justify-content-center align-items-center h-100">
    <div className="form_container border border-2 border-secondary">
      <h2 className="text-warning">Login Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
  
          <input
          className="form-control"
            type="text"
            name="username"
            value={username}
            placeholder="Enter your username"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
          className="form-control"
            type="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={handleOnChange}
          />
        </div>
        <button className="btn btn-warning p-2" type="submit">Submit</button>
        <span>
          Already have an account? <Link  className="text-warning" to={"/signup"}>Signup</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
    </div>
  );
};

export default Login;
