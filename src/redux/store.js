import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import {
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';

import productsReducer from "./product/product-reducer";

const middleware = [
    ...getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
];

const store = configureStore({
    reducer: {
        products: productsReducer,
    },
    middleware,
    devTools: process.env.NODE_ENV === 'development',
});

export default store;
