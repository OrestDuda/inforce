import { useSelector } from "react-redux";
import ProductListItem from "../ProductList/ProductListItem";
import productSelectors from "../../redux/product/product-selectors";
import styles from "./productList.module.scss";
import React from "react";

const ProductList = () => {
  const products = useSelector(productSelectors.getAllProducts);

  return (
    <>
      <select>
        <option value="name">By Name</option>
        <option value="count">Bt Count</option>
      </select>
      <ul className={styles.listProducts}>
        {products.map((item) => (
          <ProductListItem product={item} key={item.id} />
        ))}
      </ul>
    </>
  );
};
export default ProductList;
