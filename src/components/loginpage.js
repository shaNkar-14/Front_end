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

    <div>
      <div className="Auth-form-container">
        <div  className="Auth-form" style={{ backgroundColor: "black", color: "white" }}>
          <div className="Auth-form-content">
            <h1>User Login</h1><br/>
            <form className="containe" onSubmit={handlesubmit}>
              <div> 
              <label className="label" style={{textAlign:"right"}} >Email : </label>
                <input type="text" required onChange={emailChange} style={{marginLeft:"37px"}}></input>
              </div>
              <br/>
              <div>

                <label className="label" required style={{textAlign:"right"}}> Password : </label>
                <input  type="password" required onChange={passwordChange} style={{marginLeft:"10px"}}></input>
              </div>
              <br></br>
              <div>
                <button type="submit" className="btn btn-primary">Login</button>
              </div>

            </form>

            <br></br>
            <label className="label">Don't Have an Account ? </label>
            <button className="btn btn-outline-primary" onClick={registerPage}>
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;