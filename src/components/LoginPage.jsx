import React, { useEffect, useState } from 'react';
import './LoginPage.scss';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { FaQuoteLeft } from 'react-icons/fa';
import Navbar from './Navbar';
import Footer from './Footer';

const apiUrl = 'http://157.245.129.71:8000/login';

export default function Login() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const [info, setInfo] = useState({
    password: '',
    email: '',
  });

  const [passmsg, setPassmsg] = useState('');

  useEffect(() => {
    const accessToken = Cookies.get('accesstoken');
    if (accessToken) {
      const decodedToken = decodeToken(accessToken);

      if (decodedToken.is_admin) {
        navigate('/contributors'); // Redirect to the Admins.jsx page
      } else if (decodedToken.is_contributor) {
        navigate('/projectadmins'); // Redirect to the Contributors.jsx page
      } else {
        // Handle other cases or display an error message
      }
    }
  }, []);

  // Function to decode the JWT access token
  const decodeToken = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decoding token:', error);
      return {};
    }
  };

  const handlechange = (e) => {
    setInfo((info) => ({
      ...info,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `username=${info.email}&password=${info.password}&grant_type=password`, // Use 'username' for email
      });
      if (!response.ok) {
        throw new Error('Failed to login');
      }
      const data = await response.json();
      const { access_token } = data;

      console.log('Access Token:', access_token);

      // Store the access token in cookies with an expiration date (e.g., 7 days)
      Cookies.set('accesstoken', access_token, { expires: 7 }); // Set your desired expiration time in days

      const decodedToken = decodeToken(access_token);

      if (decodedToken.is_admin) {
        navigate('/contributors'); // Redirect to the Admins.jsx page
      } else if (decodedToken.is_contributor) {
        navigate('/projectadmins'); // Redirect to the Contributors.jsx page
      } else {
        // Handle other cases or display an error message
      }
    } catch (err) {
      console.log('Error during login:', err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="main_login_page">
        <div className="login_wrapper">
          <div className="login_art_">
            <div className="icon">
              <div className="circle"></div>
            </div>
            <div className="text">
              <h2>Let us help you run your freelance business.</h2>
              <p>Our registration process is quick and easy, taking no more than 10 minutes to complete.</p>
            </div>
            <div className="card">
              <FaQuoteLeft className="quotes_icon" />
              <p>I'm impressed with the results I've seen since starting to use this product. I began receiving
                clients and projects in the first week.</p>
            </div>
          </div>
          <div className="login_details_">
            <form onSubmit={sendRequest} className="form_details">
              <h1>Get started</h1>
              <p>Login to your account now</p>
              <div className="input_wrapper">
                <div className="text_label"><label htmlFor="user">Email</label></div>
                <input
                  title="Email of the Person"
                  placeholder='info@example.com'
                  className='input_box'
                  type="text"
                  name="email"
                  id='email'
                  value={info.email}
                  required
                  onChange={handlechange}
                />
              </div>
              <div className="input_wrapper">
                <div className="text_label"><label htmlFor="pass">Password</label></div>
                <div className="fake_box">
                  <input
                    placeholder='Password'
                    type={show ? "text" : "password"}
                    required
                    name="password"
                    title="Password of the Person"
                    value={info.password}
                    id='pass'
                    onChange={handlechange}
                  />
                </div>
                <p className='passchecker' style={{ color: passmsg === "Strong" ? "green" : passmsg === "Medium" ? "orange" : passmsg === "Weak" ? "red" : "white" }}>{passmsg}</p>
              </div>
              <input className='submit' title="Submit Button" type="submit" value="Login" />
            </form>
            <p className='alternate_acc_route'>Don't have an account? <Link className='link' to='/signup'>Register</Link></p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
