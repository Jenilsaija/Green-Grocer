import React, { useState,useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Homecontext } from './contexts/Homecontext'

function Login() {
  const { userid, username,setUserid, setUsername } = useContext(Homecontext);
  const[Email,setEmail]=useState("");
  const[Password,setPassword]=useState("");
  const navigate = useNavigate(1);

  const submitclickhandle=(e)=>{
    e.preventDefault();
    const Logindata={
      Email:Email,
      Password:Password,
    }
    axios.post("http://localhost:4000/api/auth/login",Logindata).then((res)=>{
    if(res.data._id == null){
      navigate('/login', { replace: true });
      console.log(res.data.warning);
    }else{
      setUserid(res.data._id);
      setUsername(res.data.Name);
      navigate('/', { replace: true }); 
    }
  })
  }


  return (
    <div>
      <div className="container my-4">
        <div className="row row-cols-1 row-cols-md-2 row-cols-xl-2 justify-content-center">
          <div className="col mt-3 mb-5">
            <h3 className="text-center mb-3">Buy Your Grocery at your Home</h3>
            <img src="./grocerylogin.jpg" height={"100%"} width={"100%"} />
          </div>
          <div className="col mt-3">
            <h2 className="mb-4">Login Here</h2>
            <form className="m-2" onSubmit={submitclickhandle}>
              <div className="mb-3">
                <label htmlFor="Email" className="form-label">
                  Email
                </label>
                <input type={"email"} className="form-control" id="Email" value={Email} onChange={(e)=>{setEmail(e.target.value)}} />
              </div>
              <div className="mb-3">
                <label htmlFor="Password" className="form-label">
                  Password
                </label>
                <input type={"password"} autoComplete="on" className="form-control" id="Password" value={Password} onChange={(e)=>{setPassword(e.target.value)}}/>
              </div>
              <div className="mb-3">
                <input type={"submit"} className="btn btn-warning" id="submit" value={"Login"} />
              </div>
              <div className="mb-3">
                you want to <Link to="/register" id="register" className="text-danger">Register</Link> ?  
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
