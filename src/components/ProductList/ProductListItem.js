import productOperations from "../../redux/product/product-operations";
import { useDispatch } from "react-redux";
import React from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import styles from "./productList.module.scss";

Modal.setAppElement("#modal");

export default function ProductListItem({ product }) {
  const dispatch = useDispatch();
  const onDelete = (id) => dispatch(productOperations.deleteProduct(id));

  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className={styles.modal}
        contentLabel="Example Modal"
      >
        <h2 className={styles.modal_title}>Are you sure?</h2>
        <div className={styles.button_container}>
          <button onClick={() => onDelete(product.id)}>Yes </button>
          <button onClick={closeModal}>No</button>
        </div>
      </Modal>

      <li className={styles.productCard}>
        <img
          className={styles.productCardImg}
          src={product.imageUrl}
          alt={product.name}
        />
        <Link to={{ pathname: `/product/${product.id}`, state: { product } }}>
          {product.name}
        </Link>
        <p>count: {product.count}</p>
        <button onClick={openModal}>DELETE</button>
      </li>
    </>
  );
}
