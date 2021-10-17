import axios from "axios";
import {
  addProductRequest,
  addProductSuccess,
  addProductError,
  deleteProductRequest,
  deleteProductSuccess,
  deleteProductError,
  fetchProductRequest,
  fetchProductSuccess,
  fetchProductError,
  updateProductRequest,
  updateProductSuccess,
  updateProductError,
} from "./product-actions";

axios.defaults.baseURL = "http://localhost:4040";

const fetchProducts = () => async (dispatch) => {
  dispatch(fetchProductRequest());
  try {
    const { data } = await axios.get("/products");
    dispatch(fetchProductSuccess(data));
  } catch (error) {
    dispatch(fetchProductError(error));
  }
};

const addProduct = (newProductItem) => (dispatch) => {
  dispatch(addProductRequest());
  axios
    .post("/products", newProductItem)
    .then(({ data }) => dispatch(addProductSuccess(data)))
    .catch((error) => dispatch(addProductError(error)));
};

const deleteProduct = (productId) => (dispatch) => {
  dispatch(deleteProductRequest());
  axios
    .delete(`/products/${productId}`)
    .then(() => dispatch(deleteProductSuccess(productId)))
    .catch((error) => dispatch(deleteProductError(error)));
};

const updateProduct = (updatedProduct, productId) => (dispatch) => {
  dispatch(updateProductRequest());
  axios
    .patch(`/products/${productId}`, updatedProduct)
    .then(({ data }) => dispatch(updateProductSuccess(data)))
    .catch((error) => dispatch(updateProductError(error)));
};

export default {
  fetchProducts,
  deleteProduct,
  addProduct,
  updateProduct,
};
