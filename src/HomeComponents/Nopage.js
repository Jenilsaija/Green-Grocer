import React from "react";
import { Link } from "react-router-dom";

const Nopage = () => {
  return (
    <div>
      <center>
        <div className="" style={{fontSize:"225px",color:"#126E82"}}>404</div>
        <div style={{fontSize:"35px",color:"#105826",fontFamily:"cursive"}}>Not Found</div><br/>
        <Link to="/" className="btn btn-lg mx-1" style={{backgroundColor:"#efa758",color:"white"}}>Home</Link>
        <Link to="/login" className="btn btn-lg mx-1" style={{backgroundColor:"#66ad5f",color:"white"}}>Login</Link>
      </center>
    </div>
  );
};

export default Nopage;
