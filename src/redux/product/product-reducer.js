import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
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
} from './product-actions';

const items = createReducer([], {
    [fetchProductSuccess]: (_, { payload }) => payload,
    [addProductSuccess]: (state, { payload }) => [...state, payload],
    [deleteProductSuccess]: (state, { payload }) =>
        state.filter(({ id }) => id !== payload),
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
});

const error = createReducer(null, {});

export default combineReducers({
    items,
    loading,
    error,
});
