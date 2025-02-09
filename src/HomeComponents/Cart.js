import React, { useContext, useEffect, useState } from "react";
import { Homecontext } from "./contexts/Homecontext";
import { Link } from "react-router-dom";
import Cartitem from "./cartcomponent/Cartitem";
import axios from "axios";

function Cart() {
  const { cartitem, setCartitem } = useContext(Homecontext);
  const [Price, setPrice] = useState(0);
  const [chname, setChname] = useState("");
  const [cnum, setCnum] = useState();

  useEffect(() => {
    let pr = 0;
    cartitem.map((e) => {
      if (e !== undefined) {
        pr = pr + e.Price * e.Squantity;
      }
      return "";
    });
    setPrice(pr);
  }, [cartitem]);

  const removecartitem = (element) => {
    let arr = [];
    if (cartitem.count === 0) {
      cartitem.pop();
    } else {
      arr = cartitem.filter(function (e, index) {
        return index !== element;
      });
    }
    setCartitem(arr);
  };

  const handleorderevent = () => {
    cartitem.map(async (e) => {
      const data = {
        pid: e.Pid,
        orderquantity: e.Squantity,
        totalamount: Price,
        cardholdername: chname,
        cardnumber: cnum,
      };
      await axios
        .post("http://localhost:4000/api/order/addneworder", data, {
          headers: {
            "auth-token": localStorage.getItem("authtoken"),
          },
        })
        .then((res) => {
          alert(res.data);
        });
    });
    setCartitem([]);
    setChname("");
    setCnum("");
  };

  return (
    <div>
      <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <div className="card">
                <div className="card-body p-4">
                  <div className="row">
                    <div className="col-lg-12">
                      <h5 className="mb-3">
                        <Link to="/products" className="text-body">
                          <i className="fas fa-long-arrow-alt-left me-2"></i>
                          Continue shopping
                        </Link>
                      </h5>
                      <hr />

                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                          <p className="mb-1">Shopping cart</p>
                          <p className="mb-0">
                            You have {cartitem.length ? cartitem.length : 0}{" "}
                            items in your cart
                          </p>
                        </div>
                        {/* <div>
                          <p className="mb-0">
                            <span className="text-muted">Sort by:</span>{" "}
                            <a href="#!" className="text-body">
                              price <i className="fas fa-angle-down mt-1"></i>
                            </a>
                          </p>
                        </div> */}
                      </div>

                      {cartitem &&
                        cartitem.map((element, index) => {
                          if (element) {
                            return (
                              <Cartitem
                                item={element ? element : ""}
                                key={index}
                                onClick={removecartitem}
                                index={index}
                              />
                            );
                          } else {
                            return "";
                          }
                        })}
                    </div>

                    <hr className="my-4" />

                    <div className="d-flex justify-content-between">
                      <p className="mb-2">Subtotal</p>
                      <p className="mb-2">Rs. {Price}</p>
                    </div>

                    <Link
                      to="/checkout"
                      className={`btn btn-block btn-lg col-lg-3 ${cartitem.length>0?"btn-success":"btn-primary disabled"}`}
>
                      <div className="d-flex justify-content-between">
                        <span>
                          Checkout Your Order{" "}
                          <i className="fas fa-long-arrow-alt-right ms-2"></i>
                        </span>
                      </div>
                    </Link>
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

export default Cart;
