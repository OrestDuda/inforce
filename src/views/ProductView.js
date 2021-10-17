import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import productOperations from "../redux/product/product-operations";
import productSelectors from "../redux/product/product-selectors";
import styles from "./productView.module.scss";

Modal.setAppElement("#modal");

const ProductView = (state) => {
  const products = useSelector(productSelectors.getAllProducts);
  const productId = state.location.state.product.id;
  const productDetails = products.find((product) => product.id === productId);

  const dispatch = useDispatch();

  const [currentProduct, setCurrentProduct] = useState({
    imageUrl: productDetails.imageUrl,
    name: productDetails.name,
    count: productDetails.count,
    width: productDetails.size.width,
    height: productDetails.size.height,
    weight: productDetails.weight,
    comments: productDetails.comments,
  });

  const [newComment, setNewComment] = useState("");

  const handleChangeText = (event) => {
    let value = event.currentTarget.value;
    setNewComment(value);
  };

  const handleChange = (event) => {
    let name = event.currentTarget.name;
    let value = event.currentTarget.value;
    setCurrentProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitFormText = (event) => {
    event.preventDefault();
    let currentComments = [...productDetails.comments];
    currentComments.push(newComment);
    dispatch(
      productOperations.updateProduct(
        {
          id: productDetails.id,
          imageUrl: currentProduct.imageUrl,
          name: currentProduct.name,
          count: currentProduct.count,
          size: {
            width: currentProduct.width,
            height: currentProduct.height,
          },
          weight: currentProduct.weight,
          comments: currentComments,
        },
        productDetails.id
      )
    );
    setNewComment("");
  };

  const submitForm = (event) => {
    event.preventDefault();
    dispatch(
      productOperations.updateProduct(
        {
          id: productDetails.id,
          imageUrl: currentProduct.imageUrl,
          name: currentProduct.name,
          count: currentProduct.count,
          size: {
            width: currentProduct.width,
            height: currentProduct.height,
          },
          weight: currentProduct.weight,
          comments: productDetails.comments,
        },
        productDetails.id
      )
    );
  };

  const onDelete = (indexToRemove) => {
    let currentComments = [...productDetails.comments];
    currentComments.splice(indexToRemove, 1);

    dispatch(
      productOperations.updateProduct(
        {
          id: productDetails.id,
          imageUrl: currentProduct.imageUrl,
          name: currentProduct.name,
          count: currentProduct.count,
          size: {
            width: currentProduct.width,
            height: currentProduct.height,
          },
          weight: currentProduct.weight,
          comments: currentComments,
        },
        productDetails.id
      )
    );
  };

  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className={styles.modal}
          contentLabel="Example Modal"
        >
          <h2 className={styles.modal_title}>Enter details</h2>

          <form
            className={styles.form}
            onSubmit={function (event) {
              submitForm(event);
              closeModal();
            }}
          >
            <label htmlFor="imageUrl">imageUrl</label>
            <input
              name="imageUrl"
              required
              value={currentProduct.imageUrl}
              onChange={handleChange}
            />
            <label htmlFor="name">name</label>
            <input
              name="name"
              required
              value={currentProduct.name}
              onChange={handleChange}
            />
            <label htmlFor="count">count</label>
            <input
              type="number"
              name="count"
              required
              value={currentProduct.count}
              onChange={handleChange}
            />
            <label htmlFor="width">width</label>
            <input
              type="number"
              name="width"
              required
              value={currentProduct.width}
              onChange={handleChange}
            />
            <label htmlFor="height">height</label>
            <input
              type="number"
              name="height"
              required
              value={currentProduct.height}
              onChange={handleChange}
            />
            <label htmlFor="weight">weight</label>
            <input
              name="weight"
              required
              value={currentProduct.weight}
              onChange={handleChange}
            />
            <button type="submit">Save</button>
            <button onClick={closeModal}>Cancel</button>
          </form>
        </Modal>
      </div>

      <ul className={styles.list}>
        <div className={styles.image}>
          <li>
            <img src={productDetails.imageUrl} alt={productDetails.name} />{" "}
          </li>
        </div>
        <div className={styles.data}>
          <li>id: {productDetails.id}</li>
          <li>name: {productDetails.name}</li>
          <li>count: {productDetails.count}</li>
          <li>width: {productDetails.size.width}</li>
          <li>height: {productDetails.size.height}</li>
          <li>weight: {productDetails.weight}</li>
          <li>
            comments:
            <ul className={styles.comments}>
              {productDetails.comments.map((comment, index) => (
                <li key={index}>
                  {comment}{" "}
                  <button id={index} onClick={() => onDelete(index)}>
                    delete
                  </button>
                </li>
              ))}
            </ul>
          </li>
        </div>
      </ul>
      <form onSubmit={submitFormText} id="commentTextNew">
        <label htmlFor="newComment">newComment</label>
        <textarea
          name="newComment"
          required
          value={newComment}
          onChange={handleChangeText}
        />
      </form>
      <button onClick={openModal}>EDIT DETAILS</button>
      <button type="submit" form="commentTextNew">
        ADD COMMENT
      </button>
    </>
  );
};
export default ProductView;
