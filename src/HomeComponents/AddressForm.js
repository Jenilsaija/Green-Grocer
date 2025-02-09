import axios from "axios";
import React, { useEffect, useState } from "react";

const AddressForm = () => {
  let authtoken = localStorage.getItem("authtoken");
  const [address, setAddress] = useState({
    fname: "",
    lname: "",
    phoneno: 0,
    email: "",
    street: "",
    city: "Junagadh",
    state: "Gujarat",
    postalcode: 0,
  });

  useEffect(() => {
    getuser();
  }, [authtoken]);

  const getuser = async () => {
    if (localStorage.getItem("authtoken")) {
      await axios
        .post(
          "http://localhost:4000/api/auth/getuser",
          {},
          {
            headers: {
              "auth-token": localStorage.getItem("authtoken"),
            },
          }
        )
        .then((res) => {
          const name = res.data.name.split(" ");
          setAddress({
            ...address,
            fname: name[0],
            lname: name[1],
            email: res.data.email,
            phoneno: res.data.mobileno,
          });
        });
    }
  };

  const onchangehandler = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handlesubmit = () => {
    axios
      .post("http://localhost:4000/api/address/add", address,{
        "headers":{
          "auth-token":localStorage.getItem("authtoken"),
        }
      })
      .then((res) => {
        alert(res.data);
        setAddress({fname: "",
        lname: "",
        phoneno: 0,
        email: "",
        street: "",
        city: "",
        state: "",
        postalcode: 0})
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="card shadow-0 border">
        <div className="p-4">
          <h5 className="card-title mb-3">User info</h5>
          <div className="row">
            <div className="col-6 mb-3">
              <p className="mb-0">First name</p>
              <div className="form-outline">
                <input
                  type="text"
                  id="typeText"
                  name="fname"
                  placeholder="Type here"
                  value={address.fname}
                  onChange={onchangehandler}
                  className="form-control"
                />
              </div>
            </div>

            <div className="col-6">
              <p className="mb-0">Last name</p>
              <div className="form-outline">
                <input
                  type="text"
                  id="typeText"
                  name="lname"
                  value={address.lname}
                  onChange={onchangehandler}
                  placeholder="Type here"
                  className="form-control"
                />
              </div>
            </div>

            <div className="col-6 mb-3">
              <p className="mb-0">Phone</p>
              <div className="form-outline">
                <input
                  type="tel"
                  id="typePhone"
                  name="phoneno"
                  maxLength={10}
                  value={address.phoneno}
                  onChange={onchangehandler}
                  className="form-control"
                />
              </div>
            </div>

            <div className="col-6 mb-3">
              <p className="mb-0">Email</p>
              <div className="form-outline">
                <input
                  type="email"
                  name="email"
                  id="typeEmail"
                  onChange={onchangehandler}
                  placeholder="example@gmail.com"
                  value={address.email}
                  className="form-control"
                />
              </div>
            </div>
          </div>

          <hr className="my-4" />

          <h5 className="card-title mb-3">Shipping info</h5>

          {/* <div className="row mb-3">
            <div className="col-lg-4 mb-3">
              <div className="form-check h-100 border rounded-3">
                <div className="p-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault1"
                  >
                    Express delivery <br />
                    <small className="text-muted">3-4 days via Fedex </small>
                  </label>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-3">
              <div className="form-check h-100 border rounded-3">
                <div className="p-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault2"
                  >
                    Post office <br />
                    <small className="text-muted">20-30 days via post </small>
                  </label>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-3">
              <div className="form-check h-100 border rounded-3">
                <div className="p-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault3"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault3"
                  >
                    Self pick-up <br />
                    <small className="text-muted">Come to our shop </small>
                  </label>
                </div>
              </div>
            </div>
          </div> */}

          <div className="row">
            <div className="col-sm-8 mb-3">
              <p className="mb-0">Address</p>
              <div className="form-outline">
                <input
                  type="text"
                  id="typeText"
                  name="street"
                  value={address.street}
                  onChange={onchangehandler}
                  placeholder="Type here"
                  className="form-control"
                />
              </div>
            </div>

            <div className="col-sm-4 mb-3">
              <p className="mb-0">City</p>
              <select
                className="form-select"
                name="city"
                value={address.city}
                onChange={onchangehandler}
              >
                <option value="Junagadh">Junagadh</option>
                <option value="Rajkot">Rajkot</option>
                <option value="Surat">Surat</option>
              </select>
            </div>

            <div className="col-sm-4 mb-3">
              <p className="mb-0">State</p>
              <div className="form-outline">
                <select
                  className="form-select"
                  name="state"
                  value={address.state}
                  onChange={onchangehandler}
                >
                  <option value="Gujarat">Gujarat</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Delhi">Delhi</option>
                </select>
              </div>
            </div>

            <div className="col-sm-4 col-6 mb-3">
              <p className="mb-0">Postal code</p>
              <div className="form-outline">
                <input
                  type="number"
                  id="typeText"
                  className="form-control"
                  name="postalcode"
                  value={address.postalcode}
                  onChange={onchangehandler}
                />
              </div>
            </div>
          </div>

          <div className="float-end">
            {/* <button className="btn btn-light border mx-1">Cancel</button> */}
            <button
              className="btn btn-success shadow-0 border mx-1"
              onClick={handlesubmit}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddressForm;
