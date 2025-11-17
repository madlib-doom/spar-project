import React, { useState } from 'react';
import './css/register.css';
import axios from 'axios';
import Loader from './Loader';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [passwordSuggestion, setPasswordSuggestion] = useState("");
  const [strength, setStrength] = useState({ label: '', score: 0 });

  const navigate = useNavigate();

  const generateStrongPassword = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+';
    let strongPass = '';
    for (let i = 0; i < 12; i++) {
      strongPass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return strongPass;
  };

  const checkPasswordStrength = (value) => {
    let score = 0;
    if (value.length >= 6) score++;
    if (/[A-Z]/.test(value)) score++;
    if (/[0-9]/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;

    let label = '';
    if (score <= 1) label = 'Weak';
    else if (score === 2 || score === 3) label = 'Medium';
    else if (score === 4) label = 'Strong';

    return { label, score };
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    const strengthResult = checkPasswordStrength(value);
    setStrength(strengthResult);

    if (value.length < 6 || /^\d+$/.test(value)) {
      setPasswordSuggestion(generateStrongPassword());
    } else {
      setPasswordSuggestion('');
    }
  };

  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append('username', username);
    data.append('email', email);
    data.append('phone', phone);
    data.append('password', password);

    try {
      const response = await axios.post("https://aarondev.pythonanywhere.com/api/signup", data);
      setLoading(false);

      const message = response.data.message;
      // console.log("Server response:", response.data);


      if (message === "Users registered succcesfully") {
        toast.success("🎉 Registered successfully! Redirecting to login...", {
          position: "top-right",
          autoClose: 2000,
        });

        setTimeout(() => {
          navigate("/signin");
        }, 2500);
      } else {
        toast.error(message || "Registration failed", {
          position: "top-right",
          autoClose: 3000,
        });
      }

      // Clear form fields
      setUsername('');
      setPassword('');
      setEmail('');
      setPhone('');
    } catch (error) {
      console.error("Signup error:", error);
      setLoading(false);
      toast.error("❌ An error occurred. Please try again later.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };
  // console.log("Server response:", response.data);


  return (
    <div>
      <ToastContainer />
      <div className="row justify-content-center mt-2">
        <div className="col-md-6 card shadow p-4">
          <h1 className='text-center text-info'>Registration Form</h1> <br />
          {loading && <Loader />}

          <form onSubmit={submit}>
            <label>Enter your username:</label> <br />
            <input
              type="text"
              className='form-control'
              placeholder='Enter your preferred username'
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <br />

            <label>Enter your password:</label> <br />
            <input
              type="text"
              className='form-control'
              placeholder='Enter your preferred password'
              required
              value={password}
              onChange={handlePasswordChange}
            />

            {/* Password Strength Bar */}
            {password && (
              <div className="mt-2">
                <label>
                  Password strength: <strong>{strength.label}</strong>
                </label>
                <div className="progress strength-bar">
                  <div
                    className={`progress-bar ${strength.label.toLowerCase()}`}
                    role="progressbar"
                    style={{ width: `${(strength.score / 4) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {/* Suggestion */}
            {passwordSuggestion && (
              <small className="text-muted">
                Your password is weak. Try this: <strong>{passwordSuggestion}</strong>
              </small>
            )}
            <br />

            <label>Enter your email:</label> <br />
            <input
              type="email"
              className='form-control'
              placeholder='Enter your email here'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />

            <label>Enter your phone number:</label>
            <input
              type="number"
              className='form-control'
              placeholder='Enter your phone number here'
              required
              
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <br />

            <button className='btn btn-outline-success' disabled={loading}>
              Submit
            </button>

            <h4 className='text-center text-warning mt-3'>Already have an account?</h4>
            <Link to="/signin"><button className='btn btn-outline-info'>Login</button></Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
