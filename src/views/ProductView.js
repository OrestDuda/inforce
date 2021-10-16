import React from 'react';

const ProductView = (state) => {
const productDetails = state.location.state.product;
    return (
        <ul>
            <li>id: {productDetails.id}</li>
            <li><img src={productDetails.imageUrl} alt={productDetails.name}/> </li>
            <li>name: {productDetails.name}</li>
            <li>count: {productDetails.count}</li>
            <li>width: {productDetails.size.width}</li>
            <li>height: {productDetails.size.height}</li>
            <li>weight: {productDetails.weight}</li>
            <li>comments: <ul>{productDetails.comments.map(comment => <li>{comment}</li>)}</ul></li>
        </ul>
    );
};
export default ProductView;
