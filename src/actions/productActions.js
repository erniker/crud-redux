import {
  ADD_PRODUCT,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_ERROR,
  START_PRODUCTS_DOWNLOAD,
  PRODUCTS_DOWNLOAD_SUCCESS,
  PRODUCTS_DOWNLOAD_ERROR,
  GET_PRODUCT_TO_DELETE,
  PRODUCT_DELETED_SUCCESS,
  PRODUCT_DELETED_ERROR,
  GET_PRODUCT_TO_EDIT,
  START_PRODUCT_EDIT,
  PRODUCT_EDITED_SUCCESS,
  PRODUCT_EDITED_ERROR,
} from "../types";

import axiosClient from "../config/axios";
import Swal from "sweetalert2";

// Create new product
export function createNewProductAction(product) {
  return async (dispatch) => {
    dispatch(addProduct());
    try {
      // Insert on DB
      await axiosClient.post("/productos", product);
      // If was inserted, update the state
      dispatch(addProductSuccess(product));
      // Alert
      Swal.fire("Correcto", "El producto se agregó correctamente", "success");
    } catch (error) {
      console.log(error);

      // If an error ocurred, change the state
      dispatch(addProductError(true));

      // Error Alert
      Swal.fire({
        icon: "error",
        title: "Hubo un error",
        text: "Hubo un error, intenta de nuevo",
      });
    }
  };
}

const addProduct = () => ({
  type: ADD_PRODUCT,
  payload: true,
});

// If save the product in the db was success
const addProductSuccess = (product) => ({
  type: ADD_PRODUCT_SUCCESS,
  payload: product,
});

// If save the product in the db was error
const addProductError = (state) => ({
  type: ADD_PRODUCT_ERROR,
  payload: state,
});

// Download products from database
export function getProductsAction() {
  return async (dispatch) => {
    dispatch(downloadProducts());

    try {
      const response = await axiosClient.get("/productos");
      dispatch(downloadProductsSuccess(response.data));
    } catch (error) {
      console.log(error);
      dispatch(downloadProductsError());
    }
  };
}

const downloadProducts = () => ({
  type: START_PRODUCTS_DOWNLOAD,
  payload: true,
});

const downloadProductsSuccess = (products) => ({
  type: PRODUCTS_DOWNLOAD_SUCCESS,
  payload: products,
});
const downloadProductsError = () => ({
  type: PRODUCTS_DOWNLOAD_ERROR,
  payload: true,
});

// Select and delete the product
export function deleteProductAction(id) {
  return async (dispatch) => {
    dispatch(getProductToDelete(id));
    try {
      await axiosClient.delete(`/productos/${id}`);
      dispatch(deleteProductSuccess());

      // If deleted, show alert
      Swal.fire("Eliminado", "El producto ha sido eliminado", "success");
    } catch (error) {
      console.log(error);
      dispatch(deleteProductError());
    }
  };
}

const getProductToDelete = (id) => ({
  type: GET_PRODUCT_TO_DELETE,
  payload: id,
});

const deleteProductSuccess = () => ({
  type: PRODUCT_DELETED_SUCCESS,
});

const deleteProductError = () => ({
  type: PRODUCT_DELETED_ERROR,
  payload: true,
});

// Put product to edit
export function getProductToEdit(product) {
  return (dispatch) => {
    dispatch(getProductToEditAction(product));
  };
}

const getProductToEditAction = (product) => ({
  type: GET_PRODUCT_TO_EDIT,
  payload: product,
});

// Edit register on API and on the state
export function editProductAction(product) {
  return async (dispatch) => {
    dispatch(editProduct());
    try {
      await axiosClient.put(`/productos/${product.id}`, product);
      dispatch(editProductSuccess(product));
    } catch (error) {
      console.log(error);
      dispatch(editProductError());
    }
  };
}

const editProduct = () => ({
  type: START_PRODUCT_EDIT,
});

const editProductSuccess = (product) => ({
  type: PRODUCT_EDITED_SUCCESS,
  payload: product,
});

const editProductError = () => ({
  type: PRODUCT_EDITED_ERROR,
  payload: true,
});
