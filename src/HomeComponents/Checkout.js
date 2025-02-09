import React from "react";
import { useContext, useEffect, useState } from "react";
import { Homecontext } from "./contexts/Homecontext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AddressForm from "./AddressForm";
import axios from "axios";
function Checkout() {
  const { cartitem } = useContext(Homecontext);
  const navigate = useNavigate();
  const [Price, setPrice] = useState(0);
  const [address, setAddress] = useState([]);
  const [saddress,setSaddress]=useState();

  useEffect(() => {
    if (cartitem.length > 0) {
      let pr = 0;
      cartitem.map((e) => {
        if (e !== undefined) {
          pr = pr + e.Price * e.Squantity;
        }
        return "";
      });
      setPrice(pr);
    }
    getaddresses();
  }, [cartitem]);

  const handleonchange=(e)=>{
    setSaddress(e.target.value);
  }

  const getaddresses = async () => {
    await axios
      .post(
        "http://localhost:4000/api/address/fetch",
        {},
        {
          headers: {
            "auth-token": localStorage.getItem("authtoken"),
          },
        }
      )
      .then((res) => {
        setAddress(res.data);
      });
  };

  const checksaddress=()=>{
    if (saddress==="addnew") {
      return <AddressForm/>
    }
    else{
      return ""
    }
  }

  const checkaddresses = () => {
    if (address.length >= 0 && address[0] !== "No address Available") {
      return (
        <>
          <div className="card shadow-0 border mb-4">
            <div className="p-4">
              <h5 className="card-title mb-3">Addresses</h5>
              <div className="row">
                <div className="row mb-1">
                  {address.map((e, index) => {
                    return (
                      <div key={index}>
                        <div className="col-lg-4 mb-3">
                          <div className="form-check h-100 border rounded-3">
                            <div className="p-3">
                              <input
                                className="form-check-input"
                                type="radio"
                                value={e.aid}
                                name="flexRadioDefault"
                                id="flexRadioDefault2"
                                onChange={handleonchange}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="flexRadioDefault2"
                              >
                                {e.fname + " " + e.lname}
                                <small className="text-muted">
                                  <p>
                                    {e.phoneno}
                                    <br />
                                    {e.street},<br />
                                    {e.city},<br />
                                    {e.state} - {e.postalcode}
                                  </p>
                                </small>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div key={"newaddress"}>
                    <div className="col-lg-4 mb-3">
                      <div className="form-check h-100 border rounded-3">
                        <div className="p-3">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            value={"addnew"}
                            id="flexRadioDefault2"
                            onChange={handleonchange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexRadioDefault2"
                          >
                            Add New address
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    } else {
      return <AddressForm />;
    }
  };

  const Cartcheck = () => {
    if (cartitem.length >= 0) {
      return cartitem.map((e, index) => {
        return (
          <div className="d-flex align-items-center mb-4" id={index}>
            <div className="me-3 position-relative">
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill badge-danger"
                style={{ backgroundColor: "red" }}
              >
                {e.Squantity}
              </span>
              <img
                src={e.Pimage ? e.Pimage : "./Images/noimage.png"}
                alt={index}
                style={{ height: "96px", width: "96px" }}
                className="img-sm rounded border"
              />
            </div>

            <div className="">
              <a href="/" className="nav-link">
                {e.Pname ? e.Pname : ""} <br />
                {e.Pdescription ? e.Pdescription : ""}
              </a>
              <div className="price text-muted">
                Total: {e.Squantity * e.Price} Rs.
              </div>
            </div>
          </div>
        );
      });
    } else {
      return (
        <h4>
          Please add Some items <br />
          in your cart
        </h4>
      );
    }
  };

  return (
    <>
      <section className="bg-light py-5">
        <div className="container">
          <div className="row">
            <div className="col-xl-8 col-lg-8 mb-4">
              {!localStorage.getItem("authtoken") && (
                <div className="card mb-4 border shadow-0">
                  <div className="p-4 d-flex justify-content-between">
                    <div className="">
                      <h5>Have an account?</h5>
                      <p className="mb-0 text-wrap ">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit
                      </p>
                    </div>
                    <div className="d-flex align-items-center justify-content-center flex-column flex-md-row">
                      <Link
                        to="/register"
                        className="btn btn-outline-primary me-0 me-md-2 mb-2 mb-md-0 w-100"
                      >
                        Register
                      </Link>
                      <Link
                        to="/login"
                        className="btn btn-primary shadow-0 text-nowrap w-100"
                      >
                        Login
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {checkaddresses()}
              {checksaddress()}
            </div>
            <div className="col-xl-4 col-lg-4 d-flex justify-content-center justify-content-lg-end w-">
              <div
                className="ms-lg-4 mt-4 mt-lg-0"
                style={{ maxWidth: "320px" }}
              >
                <h6 className="mb-3">Summary</h6>
                <div className="d-flex justify-content-between">
                  <p className="mb-2">Total price:</p>
                  <p className="mb-2"> Rs. {Price}</p>
                </div>
                {/* <div className="d-flex justify-content-between">
                  <p className="mb-2">Discount:</p>
                  <p className="mb-2 text-danger">- 30.00</p>
                </div> */}
                <div className="d-flex justify-content-between">
                  <p className="mb-2">Shipping cost:</p>
                  <p className="mb-2">Rs. 30.00</p>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <p className="mb-2">Total price:</p>
                  <p className="mb-2 fw-bold">Rs. {Price + 30}</p>
                </div>

                {/* <div className="input-group mt-3 mb-4">
                  <input
                    type="text"
                    className="form-control border"
                    name=""
                    placeholder="Promo code"
                  />
                  <button className="btn btn-light text-primary border">
                    Apply
                  </button>
                </div> */}

                <div className="input-group mt-3 mb-4 p-2 ">
                  <button className="btn btn-outline-success w-100">
                    Conform Order
                  </button>
                </div>
                <hr />
                <h6 className="text-dark my-4">Items in cart</h6>
                {Cartcheck()}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Checkout;
