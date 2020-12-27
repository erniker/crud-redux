import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Actions de Redux
import { createNewProductAction } from "../actions/productActions";

const NewProduct = ({ history }) => {
  // Component state
  const [name, saveName] = useState("");
  const [price, savePrice] = useState(0);
  // Using useDispatch. This create and return a function
  const dispatch = useDispatch();
  // Access to store state
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);

  // Call the action from productActions
  const addProduct = (product) => dispatch(createNewProductAction(product));

  // When user submited
  const submitNewProduct = (e) => {
    e.preventDefault();

    // Validate form
    if (name.trim() === "" || price <= 0) {
      return;
    }
    // If there is not errors

    // Create new product
    addProduct({ name, price });

    // Redirection
    history.push("/");
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Agregar Nuevo Producto.
            </h2>
            <form onSubmit={submitNewProduct}>
              <div className="form-group">
                <label>Nombre Producto</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Nombre del producto"
                  name="name"
                  value={name}
                  onChange={(e) => saveName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Precio Producto</label>
                <input
                  className="form-control"
                  type="number"
                  placeholder="Precio del producto"
                  name="price"
                  value={price}
                  onChange={(e) => savePrice(Number(e.target.value))}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >
                Agregar
              </button>
            </form>
            {loading ? <p>Cargando...</p> : null}
            {error ? (
              <p className="alert alert-danger p2 mt-4 text-center">
                Hubo un error
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
