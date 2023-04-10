import React from "react";
import { useContext, useEffect, useState } from "react";
import { Homecontext } from "./contexts/Homecontext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Ordersitem from "./Ordersitem";

function Orders() {
  const { userid } = useContext(Homecontext);
  const navigate = useNavigate();
  const [orderitem, setOrderitem] = useState([]);
  
  
  useEffect(() => {  
    if (userid === "") {
      navigate("/login",{replace:true})
    }
     if (userid !== "") {
      axios
        .post("http://localhost:4000/api/order/userorders/" + userid)
        .then((res) => {
          setOrderitem(res.data);
        });  
    }
  }, [userid]);

  return (
    <>
      <div className="container">
        <h2 className="my-4 text">My Orders</h2>
        <hr />
        {orderitem.map((e) => {
          return (
            <Ordersitem key={e._id} orderid={e._id} Orderdate={e.Orderdate} Pid={e.Pid} Orderquantity={e.Orderquantity} />
          );
        })}
      </div>
    </>
  );
}

export default Orders;
