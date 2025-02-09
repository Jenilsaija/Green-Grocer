import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {

  const[name,setName]=useState("");
  const[Email,setEmail]=useState("");
  const[Password,setPassword]=useState("");
  const[dob,setDob]=useState("");
  const[Mobileno,setMobileno]=useState("");
  const navigate=useNavigate();

  const Submitclickhandle=(e)=>{
    e.preventDefault();
    const user={
      Name: name,
      Email: Email,
      Password:Password,
      Dob:dob,
      Mobileno:Mobileno
    }
      axios.post("http://localhost:4000/api/auth/createuser",user).then((res)=>{
        alert("Successfully Register");
        navigate("/login")
      }) 
    }

  return (
    <div>
      <div className="container my-4">
        <div className="row row-cols-1 row-cols-md-2 row-cols-xl-2 justify-content-center">
          <div className="col mt-3 mb-5">
            <h3 className="text-center mb-3">Buy Your Grocery at your Home</h3>
            <img src="./grocerylogin.jpg" height={"90%"} width={"100%"} alt="registerimage" />
          </div>
          <div className="col mt-3">
            <h2 className="mb-4">Register Here</h2>
            <form className="m-2" onSubmit={Submitclickhandle}>
            <div className="mb-3">
                <label htmlFor="Name" className="form-label">
                  Name
                </label>
                <input type="text" className="form-control" id="Name" name="Name" value={name} onChange={(e)=>{setName(e.target.value)}} />
              </div>
              <div className="mb-3">
                <label htmlFor="Email" className="form-label">
                  Email
                </label>
                <input type={"email"} className="form-control" id="Email" name="Email" value={Email} onChange={(e)=>{setEmail(e.target.value)}}/>
              </div>
              <div className="mb-3">
                <label htmlFor="Password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="pass"
                  autoComplete="on"
                  value={Password} 
                  onChange={(e)=>{setPassword(e.target.value)}}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Dob" className="form-label">
                  Date of Birth
                </label>
                <input type="date" className="form-control" id="Dob" name="Dob" value={dob} onChange={(e)=>{setDob(e.target.value)}}/>
              </div>
              <div className="mb-3">
                <label htmlFor="Mobileno" className="form-label">
                  Mobile No.
                </label>
                <input type="number" className="form-control" id="Mobileno" name="Mobileno" value={Mobileno} onChange={(e)=>{setMobileno(e.target.value)}} />
              </div>
              <div className="mb-3">
                <input
                  type={"submit"}
                  className="btn"
                  id="submit"
                  style={{backgroundColor:"#126E82",color:"white"}}
                  value={"Sign Up"} 
                />
              </div>
              <div className="mb-3">
                Alredy have an account ? {" "}
                <Link to="/Login" id="register" className="text-danger">
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
