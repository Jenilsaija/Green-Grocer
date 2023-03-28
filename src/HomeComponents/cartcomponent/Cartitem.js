import React, { useContext, useEffect, useState } from "react";
import { Homecontext } from "../contexts/Homecontext";

function Cartitem(props) {
  const { cartitem, setCartitem,price,setPrice } = useContext(Homecontext);
  const [quantity, setQuantity]=useState(1);
  const [items,setItems]=useState(cartitem);
  
  useEffect(()=>{
    let tempPrice=0;
    console.log(tempPrice)
    tempPrice=tempPrice+props.item.Price*quantity;
    console.log(tempPrice)
    setPrice(tempPrice);
  },[cartitem,quantity]);

  const removecartitem=()=>{
    let index=0;
    items.map(e => {
      if(e.Pid===props.item.Pid){
        index=index + items.indexOf(e);
        items.splice( index, 1);
        setItems(items);
        setCartitem(items);
      }
    });
    console.log(cartitem);
  }

  return (
    <div>
      <div className="card mb-3">
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <div className="d-flex flex-row align-items-center">
              <div>
                <img
                  src={props.item.Pimage}
                  className="img-fluid rounded-3"
                  alt="Shopping item"
                  width={"65px"}
                />
              </div>
              <div className="ms-3">
                <h5>{props.item.Pname}</h5>
                <p className="small mb-0">
                  <input
                    type="number"
                    id="quantitiy"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </p>
              </div>
            </div>
            <div className="d-flex flex-row align-items-center">
              <div width={"50px"}>
                <h5 className="fw-normal mb-0">{quantity}</h5>
              </div>
              <div width={"80px"}>
                <h5 className="mb-0 mx-3">{props.item.Price}</h5>
              </div>
              <button onClick={removecartitem} className="btn btn-danger mx-2" style={{ color: "#cecece" }}>
                <i className="fas fa-trash-alt"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cartitem;
