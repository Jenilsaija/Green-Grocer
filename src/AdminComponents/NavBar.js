import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const [username,setUsername]=useState();
  const navigate=useNavigate();
  let authtoken=localStorage.getItem("authtoken")
  
  useEffect(()=>{
      getuser()
      // eslint-disable-next-line
  },[authtoken])

  const getuser=async()=>{
    if (localStorage.getItem("authtoken")) {
      await axios.post("http://localhost:4000/api/auth/getuser",{},{
        "headers":{
          "auth-token":localStorage.getItem("authtoken")
        }
      }).then((res)=>{
        setUsername(res.data.name) 
        if (!res.data.isadmin) {
          navigate('../404')
        }
      })
    }
    else{
      navigate("../404")
    }
  }


  const logout=()=>{
    localStorage.removeItem("authtoken")
    navigate("../login")
  }

  return (
    <>
      <nav
        className="navbar navbar-light"
        style={{ height: "100%", width: "100%", backgroundColor: "white" }}
      >
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarToggleExternalContent"
            aria-controls="navbarToggleExternalContent"
            aria-expanded="false"
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

          <form className="d-flex me-3">
            <div className="dropdown">
              <a
                href="/"
                className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle me-3"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {username}
              </a>
              <ul className="dropdown-menu text-small shadow">
                <li>
                  <a className="dropdown-item" href="/">
                    Profile
                  </a>
                </li>

                <li>
                  <button className="dropdown-item"  onClick={logout}>
                    Sign out
                  </button>
                </li>
              </ul>
            </div>
          </form>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
