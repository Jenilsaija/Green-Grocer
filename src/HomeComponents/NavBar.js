import React from "react";
import { Link ,useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { Homecontext } from "./contexts/Homecontext";
function NavBar() {
  const [username,setUsername]=useState("Guest")
  const {cartitem}=useContext(Homecontext)
  const navigate=useNavigate();
  const [isadmin,setIsadmin]=useState("");
  let authtoken=localStorage.getItem("authtoken")

  useEffect(()=>{
    getuser()
  },[authtoken])

  const getuser=async()=>{
    if (localStorage.getItem("authtoken")) {
      await axios.post("http://localhost:4000/api/auth/getuser",{},{
        "headers":{
          "auth-token":localStorage.getItem("authtoken")
        }
      }).then((res)=>{
        setUsername(res.data.name)
        setIsadmin(res.data.isadmin) 
      })
    }
  }

  const logout=()=>{
    localStorage.removeItem("authtoken")
    setUsername("Guest");
    setIsadmin(false)
    navigate("/login")
  }

  const admincheck=()=>{
    if (isadmin) {
      return(<li className="nav-item">
      <Link className="nav-link" to="/admin">
        Admin
      </Link>
    </li>)
    }else{
      return ""
    }
  }

  const checkcartitem=()=>{
    if (cartitem.length>0) {
      return(<span
        className="position-absolute top-1 start-90 translate-middle bg-info border border-light rounded-circle"
        style={{
          fontSize: "10px",
          padding: "1px",
          width: "12px",
          height: "12px",
        }}
      >
        <span className="visually"></span>
      </span>)
    }else{
      return ""
    }
      
  }

  const loginlogoutbtn = () => {
    if (localStorage.getItem("authtoken")) {
      return (
        <>
          <button         
            className="btn me-3"
            onClick={logout}
            style={{ backgroundColor: "#126E82", color: "white" }}
          >
            Logout
          </button>
        </>
      );
    } else {
      return (
        <>
          <Link to="/login" className="btn btn-light px-3 me-2">
            Login
          </Link>
          <Link
            to="/register"
            className="btn me-3"
            style={{ backgroundColor: "#126E82", color: "white" }}
          >
            Sign up
          </Link>
        </>
      );
    }
  };

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg"
        // style={{ backgroundColor: "#c8d4ea" }}
      >
        <div className="container">
          <Link className="navbar-brand" to="/" style={{fontSize:"23px"}}>
            Green Grocer
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarToggler"
            aria-controls="navbarToggler"
            aria-expanded="true"
            key="navbartoogler"
            aria-label="Toggle navigation"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              className="bi bi-grid"
              viewBox="0 0 16 16"
            >
              <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z" />
            </svg>
          </button>

          <div className="collapse  navbar-collapse" id="navbarToggler">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/products">
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/orders">
                  My Orders
                </Link>
              </li>
              {admincheck()}
              {/* <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  to="/"
                  id="navbarDropdown"
                  role="button"
                  data-mdb-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link className="dropdown-item" to="/">
                      Action
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/">
                      Another action
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/">
                      Something else here
                    </Link>
                  </li>
                </ul>
              </li> */}
              <form className="input-group w-auto my-auto d-none d-sm-flex mx-auto">
                <input
                  autoComplete="off"
                  type="search"
                  className="form-control rounded"
                  placeholder="Search"
                  style={{ minwidth: "125px" }}
                />
                <span
                  className="input-group-text border-0 d-none d-lg-flex "
                  style={{ backgroundColor: "#126E82", color: "white" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-search"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                  </svg>
                </span>
              </form>
            </ul>
            <ul className="navbar-nav d-flex flex-row me-1">
              <li className="nav-item me-3 me-lg-0">
                <Link className="nav-link" to="/cart">
                  <i className="fas fa-shopping-cart">
                    {checkcartitem()}
                  </i>
                </Link>
              </li>
            </ul>

            <div className="d-flex align-items-center">
              <ul className="navbar-nav flex-row">
                <li className="nav-item me-3 me-lg-1">
                  <div
                    className="nav-link d-sm-flex align-items-sm-center"
                  >
                    <img
                      src="./Profile avatar.jpeg"
                      className="rounded-circle"
                      height="22"
                      alt="Black and White Portrait of a Man"
                      loading="lazy"
                    />
                    <strong className="d-none d-sm-block ms-1 text-dark">
                      {username}
                    </strong>
                  </div>
                </li>
              </ul>
              {loginlogoutbtn()}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
