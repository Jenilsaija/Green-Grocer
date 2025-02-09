import axios from "axios";
import React, { useEffect, useState } from "react";

const ShowAddresses = () => {
  const [addresses, setAddresses] = useState([]);
  const [search, setSearch] = useState({
    searchterm: "",
    searchthrough: "aid",
    searchdata:[],
  });

  useEffect(() => {
    getaddresses();
    // eslint-disable-next-line
  }, []);

  const searchonaddresses=()=>{ 
    const newarr=addresses.filter((e)=>{
      const st=search.searchthrough;
      if(st==="aid"){
        if (e.aid===parseInt(search.searchterm)) {
          return e
        }
      }else if(st==="uid"){
        if (e.uid===parseInt(search.searchterm)) {
          return e
        }
      }else if(st==="phoneno"){
        if (e.phoneno.toString()===search.searchterm) {
          return e
        }
      }
      else if (st==="fname") {
        if (e.fname===search.searchterm) {
          return e
        }
      }else if (st==="lname") {
        if (e.lname===search.searchterm) {
          return e
        }
      }else if (st==="state") {
        if (e.state===search.searchterm) {
          return e
        }
      }else if (st==="city") {
        if (e.city===search.searchterm) {
          return e
        }
      }else if (st==="email") {
        if (e.email===search.searchterm) {
          return e
        }
      }
      else{
        return ""
      }
      return ""
    })
    setSearch({...search,searchdata:newarr})  
  }

  const onchangehandler = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  const resethandler=()=>{
    setSearch({
      searchterm: "",
      searchthrough: "aid",
      searchdata:[]
    })
  }

  const getaddresses = async () => {
    await axios
      .get("http://localhost:4000/api/address/alladdress")
      .then((res) => {
        setAddresses(res.data);
      });
  };

  const Checksearchorall=()=>{
    console.log(search.searchdata.length)
    if (search.searchdata.length>0) {
      return (
      search.searchdata.map((e)=>{
        return(<tr key={e.oid ? e.oid : ""}>
        <td>{e.aid}</td>
        <td>{e.uid}</td>
        <td>{e.fname}</td>
        <td>{e.lname}</td>
        <td>{e.phoneno}</td>
        <td>{e.email}</td>
        <td>{e.street}</td>
        <td>{e.city}</td>
        <td>{e.state}</td>
        <td>{e.postalcode}</td>
      </tr>)
      }))
    }else{
      console.log(addresses.length)
      if (addresses.length>0) {
        return (
        addresses.map((e) => {
          return (
            <tr key={e.oid ? e.oid : ""}>
              <td>{e.aid}</td>
              <td>{e.uid}</td>
              <td>{e.fname}</td>
              <td>{e.lname}</td>
              <td>{e.phoneno}</td>
              <td>{e.email}</td>
              <td>{e.street}</td>
              <td>{e.city}</td>
              <td>{e.state}</td>
              <td>{e.postalcode}</td>
            </tr>
          );
        }) )
      }
       
    }
  }

  return (
    <>
      <div
        className="m-4 bg-white"
        style={{ height: "100%", width: "100%", borderRadius: "10px" }}
      >
        <div className="m-3 fs-2 fw-bold">Show Addresses</div>
      </div>
      <div
        className="m-4 bg-white p-2"
        style={{ height: "100%", width: "100%", borderRadius: "10px" }}
      >
        <div className="conatiner">
          <h3 className="pt-3 ps-3">
            <b>Search</b>
          </h3>
          <br />
          <div className="row">
            <div className="mb-3 col-md-2">
              {" "}
              <select
                className="mx-1 form-control"
                onChange={onchangehandler}
                value={search.searchthrough}
                id="searchthrough"
                name="searchthrough"
              >
                <option value={"aid"}>Address ID</option>
                <option value={"uid"}>User ID</option>\
                <option value={"phoneno"}>Mobile No</option>
                <option value={"email"}>Email</option>
                <option value={"city"}>City</option>
                <option value={"state"}>State</option>
                <option value={"fname"}>First Name</option>
                <option value={"lname"}>Last Name</option>
              </select>
            </div>
            <div className="mb-3 col-md-4">
              <input
                className="mx-1 form-control"
                type="text"
                id="search"
                placeholder="Enter Search term"
                name="searchterm"
                value={search.searchterm}
                onChange={onchangehandler}
              ></input>
            </div>
            <div className="mb-3 col-md-4">
              <button className="btn btn-primary" onClick={searchonaddresses}>Search</button>&nbsp;
              <button className="btn btn-success mx-2" onClick={resethandler}>Reset</button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="m-4 bg-white p-3"
        style={{ height: "100%", width: "100%", borderRadius: "10px" }}
      >
        <table className="table table-success table-striped ">
          <thead>
            <tr>
              <th scope="col">aid</th>
              <th scope="col">uid</th>
              <th scope="col">fname</th>
              <th scope="col">lname</th>
              <th scope="col">phoneno</th>
              <th scope="col">email</th>
              <th scope="col">street</th>
              <th scope="col">city</th>
              <th scope="col"> state</th>
              <th scope="col">postalcode</th>
            </tr>
          </thead>
          <tbody>
            {Checksearchorall()}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ShowAddresses;
