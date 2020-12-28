import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editProductAction } from "../actions/productActions";
import { useHistory } from "react-router-dom";

const EditProduct = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  // New state of product
  const [product, saveProduct] = useState({
    name: "",
    price: "",
  });

  // Product to edit
  const editProduct = useSelector((state) => state.products.editProduct);

  // Fill state automatically
  useEffect(() => {
    saveProduct(editProduct);
  }, [editProduct]);

  // Read data from form
  const onChangeForm = (e) => {
    saveProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const { name, price } = product;

  const submitEditProduct = (e) => {
    e.preventDefault();
    dispatch(editProductAction(product));
    history.push("/");
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Editar Producto.
            </h2>
            <form onSubmit={submitEditProduct}>
              <div className="form-group">
                <label>Nombre Producto</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Nombre del producto"
                  name="name"
                  value={name}
                  onChange={onChangeForm}
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
                  onChange={onChangeForm}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >
                Guardar Cambios
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
