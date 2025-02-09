import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

function Showorders() {
  const [orders, setOrders] = useState([]);
  const [orderid, setOrderid] = useState(0);


  useEffect(() => {
    getorders()
    // eslint-disable-next-line
  },[]);

  const getorders=async()=>{
    await axios.get("http://localhost:4000/api/order/allorders").then((res) => {
      setOrders(res.data);
    });
  }

  const handledeleteclick = () => {
    let arr=[]
     arr=orders.filter(function (e) {
      return e.oid !== orderid;
     });
     setOrders(arr);
    axios
      .delete("http://localhost:4000/api/order/cancelorder/" + orderid)
      .then((res) => {
        alert(res.data);
      });
  }

  return (
    <>
      <div
        className="m-4 bg-white"
        style={{ height: "100%", width: "100%", borderRadius: "10px" }}
      >
        <div className="m-3 fs-2 fw-bold">Orders List</div>
      </div>
      <div
        className="m-4 bg-white p-3"
        style={{ height: "100%", width: "100%", borderRadius: "10px" }}
      >
        <table className="table table-success table-striped ">
          <thead>
            <tr>
              <th scope="col">User Id</th>
              <th scope="col">Product Id</th>
              <th scope="col">orderquantity</th>
              <th scope="col">orderdate</th>
              <th scope="col">totalamount</th>
              <th scope="col">paymentstatus</th>
              <th scope="col">cardholdername</th>
              <th scope="col">cardnumber</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders!==[]&&orders.map((e) => {
              return (
                <tr key={e.oid?e.oid:""}>
                  <td>{e.uid?e.uid:""}</td>
                  <td>{e.pid?e.pid:""}</td>
                  <td>{e.orderquantity?e.orderquantity:""}</td>
                  <td>{e.orderdate?e.orderdate:""}</td>
                  <td>{e.totalamount?e.totalamount:""}</td>
                  <td>{e.paymentstatus?e.paymentstatus.toString():""}</td>
                  <td>{e.cardholdername?e.cardholdername:""}</td>
                  <td>{e.cardnumber?e.cardnumber:""}</td>
                  <td>
                    <button
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#deleteModal"
                      onClick={() => {
                        setOrderid(e.oid);
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
      </div>
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
    </>
  );
}

export default Showorders;
