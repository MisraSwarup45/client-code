import React, { useState } from "react";
import { useNavigate } from "react-router";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FaQuoteLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

export default function Register() {
  const [show, setshow] = useState(false);
  const navigate = useNavigate();
  const [info, setinfo] = useState({
    email: "",
    name: "",
    password: "",
    password2: "",
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const [isContributor, setIsContributor] = useState(false);

  const memberinfo = (e) => {
    setinfo((info) => ({
      ...info,
      [e.target.name]: e.target.value,
    }));
  };

  const toggleAdmin = () => {
    setIsAdmin(!isAdmin);
    setIsContributor(false); // Uncheck contributor when checking admin
  };

  const toggleContributor = () => {
    setIsContributor(!isContributor);
    setIsAdmin(false); // Uncheck admin when checking contributor
  };

  const handleChange = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://157.245.129.71:8000/users", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: info.email,
          password: info.password,
          is_admin: isAdmin,
          is_contributor: isContributor,
        }),
      });
  
      const data = await response.json();
  
      if (data.token) {
        const accessToken = data.token.access;
        const decodedAccessToken = jwt_decode(accessToken);
  
        console.log("Decoded Access Token:", decodedAccessToken);
  
        Cookies.set("accesstoken", accessToken);
        navigate("/");
      }
    } catch (err) {
      console.log("Error:", err);
    }
  };
  

  return (
    <>
      <Navbar />
      <div className="main_login_page">
        <div className="login_wrapper">
          <div className="login_art_">
            {/* ... (your existing JSX code) */}
          </div>

          <div className="login_details_">
            <form onSubmit={handleChange} className="form_details">
              <div className="input_wrapper">
                <label htmlFor="name">Company Name</label>
                <br />
                <input
                  title="name of the Person"
                  placeholder="Company Name"
                  className="input_box"
                  value={info.name}
                  type="name"
                  name="name"
                  id="name"
                  required
                  onChange={memberinfo}
                />
              </div>
              <div className="input_wrapper">
                <label htmlFor="email">Email</label>
                <br />
                <input
                  title="Email of the Person"
                  placeholder="info@example.com"
                  className="input_box"
                  value={info.email}
                  type="email"
                  name="email"
                  id="email"
                  required
                  onChange={memberinfo}
                />
              </div>
              <div className="input_wrapper">
                <label htmlFor="pass">Password</label>
                <br />
                <div className="fake_box">
                  <input
                    className="input_inside"
                    placeholder="password"
                    type={show ? "text" : "password"}
                    value={info.password}
                    required
                    name="password"
                    title="Password"
                    id="pass"
                    onChange={memberinfo}
                  />
                  <div
                    className="text"
                    onClick={(e) => {
                      setshow((cur) => !cur);
                    }}
                  >
                    {show ? <AiFillEyeInvisible /> : <AiFillEye />}
                  </div>
                </div>
              </div>
              <div className="input_wrapper">
                <label htmlFor="pass">Re-Password</label>
                <br />
                <div className="fake_box">
                  <input
                    className="input_inside"
                    placeholder="Rewrite Password"
                    type={show ? "text" : "password"}
                    value={info.password2}
                    required
                    name="password2"
                    title="Re-Password of the Person"
                    id="password2"
                    onChange={memberinfo}
                  />
                  <div
                    className="text"
                    onClick={(e) => {
                      setshow((cur) => !cur);
                    }}
                  >
                    {show ? <AiFillEyeInvisible /> : <AiFillEye />}
                  </div>
                </div>
              </div>
              <div className="input_wrapper">
                <label htmlFor="is_admin">Is Admin</label>
                <input
                  type="checkbox"
                  name="is_admin"
                  id="is_admin"
                  checked={isAdmin}
                  onChange={toggleAdmin}
                />
              </div>
              <div className="input_wrapper">
                <label htmlFor="is_contributor">Is Contributor</label>
                <input
                  type="checkbox"
                  name="is_contributor"
                  id="is_contributor"
                  checked={isContributor}
                  onChange={toggleContributor}
                />
              </div>
              <input
                className="submit"
                title="Submit Button"
                type="submit"
                value="Sign Up"
              />
            </form>
            <p className="alternate_acc_route">
              Already have an account?{" "}
              <Link className="link" to="/">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
