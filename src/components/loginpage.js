import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";

const Home = () => {
  const navigate = useNavigate();

  const [email, emailchange] = useState("");

  const [password, passwordchange] = useState("");

  const emailChange = (e) => {
    emailchange(e.target.value);
  };

  const passwordChange = (e) => {
    passwordchange(e.target.value);
  };

  const handlesubmit = async (e) => {
    e.preventDefault();

    const res = await axios.get(
      `http://localhost:8081/getresponse/${email}/${password}`
    );

    if (res.data === "wrong mail") {
      alert("Email doesn't exist");
    } else if (res.data === "wrong pass") {
      alert("Wrong Password");
    } else {
      navigate("/employees");
    }
  };

  const registerPage = () => {
    navigate("/register");
  };

  return (
    <div
      style={{
        backgroundImage: `url('https://www.freecodecamp.org/news/content/images/size/w2000/2022/09/jonatan-pie-3l3RwQdHRHg-unsplash.jpg')`,
        height: "700px",
      }}
    >
      <div className="Auth-form-container">
        <div
          className="Auth-form"
          style={{ backgroundColor: "black", color: "white" }}
        >
          <div className="Auth-form-content">
            <h1>SignIn !</h1>
            <div>
            <form className="containe" onSubmit={handlesubmit}>
              <label className="label" style={{textAlign:"left",float:"left"}}>Email :</label>
                <input type="text"onChange={emailChange} style={{alignContent:"center"}} ></input><br></br>
                <label className="label" required style={{textAlign:"left"}}>Password :</label>
                <input type="password" required onChange={passwordChange} style={{marginLeft: "10px"}}></input>
            </form>
            </div>
            <br></br>
            <div>
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </div>
              <br></br>
            <button className="btn btn-outline-primary" onClick={registerPage}>Create Account</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
