import axios from "axios";
import React, { useEffect, useState } from "react";

function Ordersitem(props) {
  const [Product, setProduct] = useState([]);
  useEffect(()=>{
    axios
      .post("http://localhost:4000/api/product/spsearch/" + props.Pid)
      .then((res) => {
        setProduct(res.data);
      });
  })
  return (
    <div>
      <section className="vh-80 gradient-custom-2">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-10 col-lg-8 col-xl-6">
              <div
                className="card card-stepper"
                style={{ borderradius: "16px" }}
              >
                <div className="card-header p-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <p className="text-muted mb-2">
                        {" "}
                        Order ID{" "}
                        <span className="fw-bold text-body">{props.orderid}</span>
                      </p>
                    </div>
                    <div>
                      <p className="text-muted mb-0">
                        {" "}
                        Place On{" "}
                        <span className="fw-bold text-body">
                          {props.Orderdate}
                        </span>{" "}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="card-body p-4">
                  <div className="d-flex flex-row mb-2 pb-2">
                    <div className="flex-fill">
                      <h5 className="bold">{Product.Pname}</h5>
                      <p className="text-muted"> Qt: {props.Orderquantity} item</p>
                      <h4 className="mb-3">
                        {" "}
                        Rs. {Product.Price * props.Orderquantity}{" "}
                      </h4>
                      <p className="text-muted">
                        Status : <span className="text-body">on the way</span>
                      </p>
                    </div>
                    <div>
                      <img
                        className="align-self-center img-fluid"
                        src={Product.Pimage}
                        alt="Productimage"
                        width="250"
                      />
                    </div>
                  </div>
                </div>
                <div className="card-footer p-3 ">
                  <div className="d-flex justify-content-between">
                    <h5 className="fw-normal mb-0">
                      <a href="#!" className="btn btn-danger">
                        Cancel Order
                      </a>
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Ordersitem;
