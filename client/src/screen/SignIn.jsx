import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Add toast options
const toastOptions = {
  position: "bottom-right",
  autoClose: 5000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};

const SignIn = () => {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    email: "",
    userName: "",
    password: "",
    confirmPassword: "",
  });

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleValidation = () => {
    const { password, confirmPassword, userName, email } = newUser;
    if (password !== confirmPassword) {
      toast.error("Password and confirm password should be the same.", toastOptions);
      return false;
    } else if (userName.length < 3) {
      toast.error("Username should be greater than 3 characters.", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error("Password should be equal to or greater than 8 characters.", toastOptions);
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    if (!handleValidation()) {
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        toast.success("Sign up successful!", toastOptions);
        navigate("/login");
      } else {
        const data = await response.json();
        toast.error(data.msg, toastOptions);
      }
    } catch (error) {
      console.error("Error during sign up:", error);
      toast.error("Sign up failed. Please try again later.", toastOptions);
    }
  };

  return (
    <div className="sign-up">
      <div className="sign-up-container">
        <h2>Sign Up</h2>
        
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={newUser.email}
          onChange={handleChange}
          className="sign-up-input"
        />
        <label>Username</label>
        <input
          type="text"
          name="userName"
          value={newUser.userName}
          onChange={handleChange}
          className="sign-up-input"
        />
        <label>Set Password</label>
        <input
          type="password"
          name="password"
          value={newUser.password}
          onChange={handleChange}
          className="sign-up-input"
        />
        <label>Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={newUser.confirmPassword}
          onChange={handleChange}
          className="sign-up-input"
        />
        <button className="sign-up-button" onClick={handleSignUp}>
          Sign Up
        </button>
      </div>
      <div className="existing-account">
        Already have an account?{" "}
        <button className="login-button" onClick={handleLoginClick}>
          Login Here
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignIn;