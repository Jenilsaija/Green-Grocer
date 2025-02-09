import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Editform from "./Editform";
import { useNavigate } from "react-router-dom";

function Showproducts() {
  const [products, setProducts] = useState([]);
  const [productid, setProductid] = useState("");
  const navigate=useNavigate();
  useEffect(() => {
    axios.get("http://localhost:4000/api/product/allproducts").then((res) => {
      setProducts(res.data);
    });
    // eslint-disable-next-line
  }, []);

  const handledeleteclick = () => {
    axios
      .delete("http://localhost:4000/api/product/deleteproduct/" + productid)
      .then((res) => {
        alert(res.data);
      });
  };

  return (
    <>
        <div
          className="m-4 bg-white p-3"
          style={{ height: "100%", width: "100%", borderRadius: "10px" }}
        >
        <div className="row gx-4 gx-lg-5 row-cols-1 row-cols-md-3 row-cols-xl-4 justify-content-center">
          {products.map((e,index)=>{
            return(<div className="col mb-5">
            <div className="card h-100">
              <div
                className="badge bg-success text-white position-absolute"
                style={{ top: "0.5rem", right: "0.5rem" }}
              >
                {e.availableunits}
              </div>
              <img
                className="card-img-top"
                src={"../"+e.pimage}
                height={"200px"}
                width={"200px"}
                style={{ backgroundColor: "white" }}
                alt="..."
              />
              <div className="card-body p-4">
                <div className="text-center">
                  <h5 className="fw-bolder">{e.pname}</h5>
                  {e.pcategory}<br/>{e.pdescription}
                  <div className="d-flex justify-content-center small text-warning mb-2">
                    <div className="bi-star-fill"></div>
                    <div className="bi-star-fill"></div>
                    <div className="bi-star-fill"></div>
                    <div className="bi-star-fill"></div>
                    <div className="bi-star-fill"></div>
                  </div>
                  Price: {e.price} Rs
                </div>
              </div>
              <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                <div className="text-center">
                <button
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#editModal"
                      onClick={() => {
                        setProductid(e);
                      }}
                      className="btn btn-primary m-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-pencil-square"
                        viewBox="0 0 16 16"
                      >
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path
                          fillRule="evenodd"
                          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                        />
                      </svg>
                    </button>
                    <button
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#deleteModal"
                      onClick={() => {
                        setProductid(e.pid);
                      }}
                      className="m-1 btn btn-danger"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-trash"
                        viewBox="0 0 16 16"
                      >
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                        <path
                          fillRule="evenodd"
                          d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                        />
                      </svg>
                    </button>
                </div>
              </div>
            </div>
          </div>)
          })}
          <div className="col mb-5">
            <div className="card h-100" onClick={()=>{
              navigate('/admin/addproduct')
            }}>
              <div className="card-body p-4">
                <div className="text-center mt-5" style={{fontSize:"30px"}}>
                <div style={{fontSize:"70px",padding:0}}>+</div>
                  Add Product  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div
        className="m-4 bg-white"
        style={{ height: "100%", width: "100%", borderRadius: "10px" }}
      >
        <div className="m-3 fs-2 fw-bold">Show Products List</div>
      </div>
      <div
        className="m-4 bg-white p-3"
        style={{ height: "100%", width: "100%", borderRadius: "10px" }}
      >
        <table className="table table-success table-striped ">
          <thead>
            <tr>
              <th scope="col">Pname</th>
              <th scope="col">Pcategory</th>
              <th scope="col">Pdescription</th>
              <th scope="col">Price</th>
              <th scope="col">Availableunits</th>
              <th scope="col">Pimage</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((e) => {
              return (
                <tr key={e.pid ? e.pid : ""}>
                  <td>{e.pname ? e.pname : ""}</td>
                  <td>{e.pcategory ? e.pcategory : ""}</td>
                  <td>{e.pdescription ? e.pdescription : ""}</td>
                  <td>{e.price ? e.price : ""}</td>
                  <td>{e.availableunits ? e.availableunits : ""}</td>
                  <td>
                    <img
                      src={e.pimage ? "../." + e.pimage : ""}
                      key={e.pid ? e.pid : ""}
                      height={"100px"}
                      width={"125px"}
                      alt="productimage"
                    />
                  </td>
                  <td>
                    <button
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#editModal"
                      onClick={() => {
                        setProductid(e);
                      }}
                      className="btn btn-primary m-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-pencil-square"
                        viewBox="0 0 16 16"
                      >
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path
                          fillRule="evenodd"
                          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                        />
                      </svg>
                    </button>
                    <button
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#deleteModal"
                      onClick={() => {
                        setProductid(e.pid);
                      }}
                      className="m-1 btn btn-danger"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-trash"
                        viewBox="0 0 16 16"
                      >
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                        <path
                          fillRule="evenodd"
                          d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div> */}
      <div>
        <div
          className="modal fade"
          id="deleteModal"
          tabIndex="-1"
          aria-labelledby="deleteModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="deleteModalLabel">
                  Delete Conformation
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">Are you Sure you want to delete</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  cancel
                </button>
                <button
                  type="button"
                  onClick={handledeleteclick}
                  data-bs-dismiss="modal"
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div
          className="modal fade"
          id="editModal"
          tabIndex="-1"
          aria-labelledby="editModalLabel"
          aria-hidden="true"
          style={{ width: "100%" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="editModalLabel">
                  Edit Details
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body ">
                <Editform
                  Pname={productid.pname}
                  Pcategory={productid.pcategory}
                  Pdescription={productid.pdescription}
                  Price={productid.price}
                  Aunit={productid.availableunits}
                  Image={productid.pimage}
                  Id={productid.pid}
                  key={productid.pid}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Showproducts;
