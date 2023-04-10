import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Homecontext } from "./contexts/Homecontext";

function Productoneshort(props) {
  // const navigate = useNavigate();
  const { cartitem, setCartitem } = useContext(Homecontext);
  const [badge, setBadge] = useState("");

  useEffect(() => {
    if (props.aunit === "0") {
      setBadge("Out Of Stock");
    } else {
      setBadge(props.aunit);
    }
  }, []);

  const addtocartclick = () => {
    setCartitem([
      ...cartitem,
      {
        Pid: props.pid,
        Pname: props.title,
        Pcategory: props.Category,
        Pdescription: props.desc,
        Price: props.price,
        Availableunits: props.aunit,
        Pimage: props.image,
        Squantity: 1,
      },
    ]);

    // const data={ Pid: props.pid,
    // Userid: userid}
    // if(userid!==""){
    //   axios.post("http://localhost:4000/api/cart/additem",data).then((res)=>{
    // })
    // }else{
    //   navigate('/login', { replace: true });
    // }
  };

  return (
    <>
      {/* <div className="col-lg-3 col-md-12 mb-4">
        <div className="card">
          <div
            className="bg-image hover-zoom ripple ripple-surface ripple-surface-light"
            data-mdb-ripple-color="light"
          >
            <img
              src={props.image}
              style={{height:"80%",width:"100%"}}
            />
            <a href="#!">
              <div className="mask">
                <div className="d-flex justify-content-start align-items-end h-100">
                  <h5>
                    <span className="badge bg-primary ms-2">New</span>
                  </h5>
                </div>
              </div>
              <div className="hover-overlay">
                <div
                  className="mask"
                  style={{ backgroundcolor: "rgba(251, 251, 251, 0.15)" }}
                ></div>
              </div>
            </a>
          </div>
          <div className="card-body">
            <a href="" className="text-reset">
              <h5 className="card-title mb-3">{props.title}</h5>
            </a>
            <a href="" className="text-reset">
              <p>Category</p>
            </a>
            <h6 className="mb-3">{props.price} Rs./Kg </h6>
          </div>
        </div>
      </div> */}

      <div className="col mb-5">
        <div className="card h-100">
          <div
            className="badge bg-success text-white position-absolute"
            style={{ top: "0.5rem", right: "0.5rem" }}
          >
            {badge}
          </div>
          <img
            className="card-img-top"
            src={props.image}
            height={"100%"}
            width={"100%"}
            alt="..."
          />
          <div className="card-body p-4">
            <div className="text-center">
              <h5 className="fw-bolder">{props.title}</h5>
              {props.Category}
              <div className="d-flex justify-content-center small text-warning mb-2">
                <div className="bi-star-fill"></div>
                <div className="bi-star-fill"></div>
                <div className="bi-star-fill"></div>
                <div className="bi-star-fill"></div>
                <div className="bi-star-fill"></div>
              </div>
              Price: {props.price} Rs
            </div>
          </div>
          <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
            <div className="text-center">
              <button
                className="btn btn-outline-success mt-auto mx-2"
                onClick={addtocartclick}
              >
                Add to cart
              </button>
              <a className="btn btn-outline-success mt-auto" href="/">
                Buy Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Productoneshort;
