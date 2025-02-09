import React from "react";
import {  useEffect, useState } from "react";
import axios from "axios";
import Ordersitem from "./Ordersitem";
import { useNavigate } from "react-router-dom";


function Orders() {
  const [orderitem, setOrderitem] = useState([]);
  const [Product, setProduct] = useState([]);
  const navigate=useNavigate()  
  useEffect(()=>{
    if(localStorage.getItem("authtoken")){
      getOrder();
      getproducts();
    }else{
      navigate('/login')
    }
    // eslint-disable-next-line
  },[])

  const getOrder=async()=>{
    await axios
    .post("http://localhost:4000/api/order/userorders",{},{
      "headers":{
        "auth-token":localStorage.getItem("authtoken")
      }
    })
    .then((res) => {
      setOrderitem(res.data);
    });  
  }
  
  const getproducts=async()=>{
    await axios.get("http://localhost:4000/api/product/allproducts").then((res) => {
      setProduct(res.data);
    });
  }

  return (
    <>
      <div className="container">
        <h2 className="my-4 text">My Orders</h2>
        <hr />
        {orderitem && orderitem.map((e,index) => {
          if(e.oid){
            for (let i = 0; i < Product.length; i++) {
              const element = Product[i];
              if (e.pid===element.pid) {
                return (
                  <Ordersitem key={index} index={index} orderid={e.oid} Orderdate={e.orderdate} Pid={e.pid} Orderquantity={e.orderquantity} image={element.pimage?element.pimage:"./Images/noimage.png"} pprice={element.price}  orderitem={orderitem}/>
                );
              }
            } 
          }
          else{
            return <h2 key={index}>{e}</h2>;
          }
          return ""
        })}
      </div>
    </>
  );
}

export default Orders;
