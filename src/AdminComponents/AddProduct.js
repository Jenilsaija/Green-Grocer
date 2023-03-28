import React, { useState } from "react";
import axios from "axios";

function Addproduct() {
  const [product,setNewproduct] = useState({
    Pname: "",
    Pcategory: "",
    Pdescription: "",
    Price: 0,
    Availableunits: 0,
    Pimage:"",
  });

  const handleChange=(e)=>{
    setNewproduct({...product,[e.target.name]:e.target.value});
  }

  const handleImage=(e)=>{
    setNewproduct({...product,Pimage:e.target.files[0]});
    console.log(product.Pimage);
  }

  const handleSubmitclick=(e)=>{
    e.preventDefault();
    const formData=new FormData();
    formData.append('Pname',product.Pname)
    formData.append('Pcategory',product.Pcategory)
    formData.append('Pdescription',product.Pdescription)
    formData.append('Price',product.Price)
    formData.append('Availableunits',product.Availableunits)
    formData.append('Pimage',product.Pimage)

    axios.post("http://localhost:4000/api/product/addnewproduct",formData).then(res=>alert(res.data)).catch(err=>console.log(err));
  }

  return (
    <>
      <div
        className="m-4 bg-white"
        style={{ height: "100%", width: "100%", borderRadius: "10px" }}
      >
        <div className="m-3 fs-2 fw-bold">Add New Product</div>
      </div>
      <div
        className="m-4 bg-white"
        style={{ height: "100%", width: "100%", borderRadius: "10px" }}
      >
        <div className="m-3">
          <form
            className="p-3"
            onSubmit={handleSubmitclick}
            encType="multipart/form-data"
          >
            <div className="mb-3">
              <label htmlFor="pname" className="form-label">
                Product Name
              </label>
              <input
                type="text"
                className="form-control"
                id="pname"
                name="Pname"
                value={product.Pname}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="pname" className="form-label">
                Product Category
              </label>
              <select
                className="form-select"
                name="Pcategory"
                value={product.Pcategory}
                onChange={handleChange}
              >
                <option>Choose Category</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Fruits">Fruits</option>
                <option value="Spacial_Fruits">Spacial Fruits</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="Pdescription" className="form-label">
                Product Description
              </label>
              <textarea
              name="Pdescription"
                value={product.Pdescription}
                onChange={ handleChange }
                className="form-control"
                id="Pdescription"
                rows="3"
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="Price" className="form-label">
                Price
              </label>
              <input
                type="number"
                className="form-control"
                id="Price"
                name="Price"
                value={product.Price}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Aunits" className="form-label">
                Available Units
              </label>
              <input
                type="number"
                name="Availableunits"
                className="form-control"
                id="Aunits"
                value={product.Availableunits}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="formFile" className="form-label">
                Product Image
              </label>
              <input
                className="form-control"
                type="file"
                name="Pimage"
                accept=" .png, .jpg, .jpeg"
                onChange={handleImage}
              />
              <div
                style={{ border: "1", Height: "500px", width: "500px" }}
              ></div>
            </div>
            <button type="submit" className="btn btn-primary">
              Add
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Addproduct;
