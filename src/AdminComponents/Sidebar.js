import React from "react";
import {Link} from "react-router-dom";
function Sidebar(props) {
  return (
  <>
    <div
      className="d-flex flex-column flex-shrink-0 p-3 "
      style={{ width: "280px", height: "100vh", backgroundColor: "white" }}
    >
      <Link to="/admin" className="m-3">
        <img
          className="p-2"
          width="100%"
          height="100%"
          alt="logo"
          src="../../Images/lightlogonav.png"
        ></img>
      </Link>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        {/* <li className="nav-item">
          <Link to="/admin" key="Home" className="nav-link" aria-current="page">
            <svg
              className="bi bi-house me-2"
              width="16"
              height="16"
              fill="currentColor"
            >
              <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z" />
            </svg>
            Home
          </Link>
        </li> */}
        <li className="nav-item">
          <Link to="/admin" className="nav-link link-dark">
            <svg
              className="bi pe-none me-2"
              width="16"
              height="16"
              fill="currentColor"
            >
              {" "}
              <path d="m14.12 10.163 1.715.858c.22.11.22.424 0 .534L8.267 15.34a.598.598 0 0 1-.534 0L.165 11.555a.299.299 0 0 1 0-.534l1.716-.858 5.317 2.659c.505.252 1.1.252 1.604 0l5.317-2.66zM7.733.063a.598.598 0 0 1 .534 0l7.568 3.784a.3.3 0 0 1 0 .535L8.267 8.165a.598.598 0 0 1-.534 0L.165 4.382a.299.299 0 0 1 0-.535L7.733.063z" />
              <path d="m14.12 6.576 1.715.858c.22.11.22.424 0 .534l-7.568 3.784a.598.598 0 0 1-.534 0L.165 7.968a.299.299 0 0 1 0-.534l1.716-.858 5.317 2.659c.505.252 1.1.252 1.604 0l5.317-2.659z" />
            </svg>
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link to="./orders" className="nav-link link-dark">
            <svg
              className="bi pe-none me-2"
              width="16"
              height="16"
              fill="currentColor"
            >
              <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5 8.186 1.113zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z" />
            </svg>
            Orders
          </Link>
        </li>
        <li className="nav-item">
          <Link to="./showaddresses" className="nav-link link-dark">
            <svg
              className="bi pe-none me-2"
              width="16"
              height="16"
              fill="currentColor"
            >
              <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5 8.186 1.113zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z" />
            </svg>
            User Addresses
          </Link>
        </li>
        <li className="nav-item">
          <div>
            <button
              className="nav-link link-dark"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#Product"
              aria-controls="Product"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <svg
                className="bi pe-none me-2"
                width="16"
                height="16"
                fill="currentColor"
              >
                <path d="M7.752.066a.5.5 0 0 1 .496 0l3.75 2.143a.5.5 0 0 1 .252.434v3.995l3.498 2A.5.5 0 0 1 16 9.07v4.286a.5.5 0 0 1-.252.434l-3.75 2.143a.5.5 0 0 1-.496 0l-3.502-2-3.502 2.001a.5.5 0 0 1-.496 0l-3.75-2.143A.5.5 0 0 1 0 13.357V9.071a.5.5 0 0 1 .252-.434L3.75 6.638V2.643a.5.5 0 0 1 .252-.434L7.752.066ZM4.25 7.504 1.508 9.071l2.742 1.567 2.742-1.567L4.25 7.504ZM7.5 9.933l-2.75 1.571v3.134l2.75-1.571V9.933Zm1 3.134 2.75 1.571v-3.134L8.5 9.933v3.134Zm.508-3.996 2.742 1.567 2.742-1.567-2.742-1.567-2.742 1.567Zm2.242-2.433V3.504L8.5 5.076V8.21l2.75-1.572ZM7.5 8.21V5.076L4.75 3.504v3.134L7.5 8.21ZM5.258 2.643 8 4.21l2.742-1.567L8 1.076 5.258 2.643ZM15 9.933l-2.75 1.571v3.134L15 13.067V9.933ZM3.75 14.638v-3.134L1 9.933v3.134l2.75 1.571Z" />
              </svg>
              Products
            </button>
          </div>
          <div className="collapse " id="Product">
            <ul className="nav nav-pills flex-column mb-auto">
              <li>
                <Link to="./addproduct" key="add" className="nav-link link-dark ms-3">
                  <svg
                    className="bi pe-none me-2"
                    width="16"
                    
                    height="16"
                    fill="currentColor"
                  >
                    <path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z" />
                  </svg>
                  Add Products
                </Link>
              </li>
              <li>
                <Link to="./showproduct" key="show" className="nav-link link-dark ms-3 ">
                  <svg
                    className="bi pe-none me-2"
                    width="16"
                    height="16"
                    fill="currentColor"
                  >
                    <path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z" />
                  </svg>
                  Show Products
                </Link>
              </li>
            </ul>
          </div>
        </li>
        {/* <li className="nav-item">
          <Link to="/admin" className="nav-link link-dark">
            <svg className="bi pe-none me-2" width="16" height="16"></svg>
            Customers
          </Link>
        </li> */}
      </ul>
      
    </div>
    
    </>
  );
}

export default Sidebar;
