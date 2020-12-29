import React from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
//Redux
import { useDispatch } from "react-redux";
import {
  deleteProductAction,
  getProductToEdit,
} from "../actions/productActions";

const Product = ({ product }) => {
  const { name, price, id } = product;

  const dispatch = useDispatch();
  const history = useHistory();

  // confirm if want to delete
  // Confirm deleted
  const confirmDeletePoduct = (id) => {
    // Ask to user
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Un producto que se elimina no se puede recuperar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        //Pass To action
        dispatch(deleteProductAction(id));
      }
    });
  };
  // Function to redirect in a programaticaly way
  const redirectEdition = (product) => {
    dispatch(getProductToEdit(product));
    history.push(`/products/edit/${product.id}`);
  };
  return (
    <tr>
      <td>{name}</td>
      <td>
        <span className="font-weight-bold"> {price}€</span>
      </td>
      <td className="acciones">
        <button
          type="button"
          className="btn btn-primary mr-2"
          onClick={() => redirectEdition(product)}
        >
          Editar
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => confirmDeletePoduct(id)}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default Product;
