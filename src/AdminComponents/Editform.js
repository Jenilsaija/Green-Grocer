import React, {  useState } from "react";
import axios from 'axios';
function Editform(props) {
  const [product, setNewproduct] = useState({Pname: props.Pname,
    Pcategory: props.Pcategory,
    Pdescription: props.Pdescription,
    Price: props.Price,
    Availableunits: props.Aunit,
    Pimage: props.Image?props.Image:"",
  });

  const handleChange = (e) => {
    setNewproduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    setNewproduct({ ...product, Pimage: e.target.files[0]})
  };

  const handleSubmitclick = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("Pname", product.Pname);
    formData.append("Pcategory", product.Pcategory);
    formData.append("Pdescription", product.Pdescription);
    formData.append("Price", product.Price);
    formData.append("Availableunits", product.Availableunits);
    formData.append("Pimage", product.Pimage);

    axios
      .put("http://localhost:4000/api/product/updateproduct/"+props.Id, formData)
      .then((res) => alert(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <>
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
              <label htmlFor="Pcategory" className="form-label">
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
                onChange={handleChange}
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
              <label htmlFor="preimage" className="form-label">
                Previous Image :
              </label><br/>
                <img src={"../../."+product.Pimage} 
                height={"100%"} width={"60%"}
                id="Pimage" alt="Privious Image"/>
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
              Update
            </button>
          </form>
        
    </>
  );
}

export default Editform;
