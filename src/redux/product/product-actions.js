import { createAction } from '@reduxjs/toolkit';

export const fetchProductRequest = createAction('products/fetchProductRequest');
export const fetchProductSuccess = createAction('products/fetchProductSuccess');
export const fetchProductError = createAction('products/fetchProductError');

export const addProductRequest = createAction('products/addProductRequest');
export const addProductSuccess = createAction('products/addProductSuccess');
export const addProductError = createAction('products/addProductError');

export const deleteProductRequest = createAction('products/deleteProductRequest');
export const deleteProductSuccess = createAction('products/deleteProductSuccess');
export const deleteProductError = createAction('products/deleteProductError');

