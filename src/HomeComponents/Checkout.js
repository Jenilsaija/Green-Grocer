import React from "react";
import { useContext, useEffect, useState } from "react";
import { Homecontext } from "./contexts/Homecontext";

function Checkout() {
  const { cartitem } = useContext(Homecontext);
  const [tpPrice, setTpprice] = useState(0);
  const [items, setItems] = useState(cartitem);

  return (
    <div className="container">
      <div className="my-4">
        <h2>Conform Your Order</h2>
        <hr />
        <div className="mx-5 m-5">
          <table className="table table-bordered border-success">
            <thead>
              <tr>
                <th scope="col">Product</th>
                <th scope="col">Quantity</th>
                <th scope="col">One item Price</th>
                <th scope="col">total price</th>
              </tr>
            </thead>
            <tbody>
              {items != [] &&
                items.map((e) => {
                  return (
                    <>
                      <tr>
                        <td>
                          {e.Pname}
                          <br />
                          {e.Pdescription}
                          <br />
                          {e.Pcategory}
                        </td>
                        <td>{e.Squantity}</td>
                        <td>{e.Price}</td>
                        <td>{e.Price * e.Squantity}</td>
                        {setTpprice(tpPrice + e.Price * e.Squantity)}
                      </tr>
                    </>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
