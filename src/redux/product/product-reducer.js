import { combineReducers } from "redux";
import { createReducer } from "@reduxjs/toolkit";
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

const items = createReducer([], {
  [fetchProductSuccess]: (_, { payload }) => payload,
  [addProductSuccess]: (state, { payload }) => [...state, payload],
  [deleteProductSuccess]: (state, { payload }) =>
    state.filter(({ id }) => id !== payload),
  [updateProductSuccess]: (state, { payload }) =>
    state.map((product) => (product.id === payload.id ? payload : product)),
});

const loading = createReducer(false, {
  [fetchProductRequest]: () => true,
  [fetchProductSuccess]: () => false,
  [fetchProductError]: () => false,
  [addProductRequest]: () => true,
  [addProductSuccess]: () => false,
  [addProductError]: () => false,
  [deleteProductRequest]: () => true,
  [deleteProductSuccess]: () => false,
  [deleteProductError]: () => false,
  [updateProductRequest]: () => true,
  [updateProductSuccess]: () => false,
  [updateProductError]: () => false,
});

const error = createReducer(null, {});

export default combineReducers({
  items,
  loading,
  error,
});
