import React, { useEffect, useState } from "react";
import Productoneshort from "./Productoneshort";
import axios from "axios";

function Product(props) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:4000/api/product/allproducts").then((res) => {
      setProducts(res.data);
    });
  }, []);

  return (
    <>
      <div>
        <div>
          <section className="py-4 bg-light">
            <div className="container px-4 px-lg-5 mt-4 ">
              <h2 className="fw-bolder mb-4 text-center">Products</h2>
              <div className="row gx-4 gx-lg-5 row-cols-1 row-cols-md-3 row-cols-xl-4 justify-content-center">
                {products.map((e) => {
                  return (
                    <Productoneshort
                      key={e.pid}
                      pid={e.pid}
                      image={e.pimage}
                      title={e.pname}
                      price={e.price}
                      aunit={e.availableunits}
                      Category={e.pcategory}
                      desc={e.pdescription}
                    />
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default Product;
