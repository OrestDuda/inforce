import { useDispatch } from 'react-redux';
import productOperations from "../redux/product/product-operations";
import React, { useEffect, useState } from 'react';
import ProductList from "../components/ProductList/ProductList";
import Modal from "react-modal";
const shortid = require('shortid');


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};
Modal.setAppElement('#modal');


const ListView = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(productOperations.fetchProducts());
    }, [dispatch]);

    const [newProduct, setNewProduct] = useState({
        imageUrl: '',
        name: '',
        count: '',
        width: '',
        height: '',
        weight: ''
    });

    const handleChange = event => {
        let name = event.currentTarget.name;
        let value = event.currentTarget.value;
        setNewProduct(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const submitForm = event => {
        event.preventDefault();
        dispatch(
            productOperations.addProduct({
                id: shortid.generate(),
                imageUrl: newProduct.imageUrl,
                name: newProduct.name,
                count: newProduct.count,
                size: {
                    width: newProduct.width,
                    height: newProduct.height
                },
                weight: newProduct.weight,
                comments: []
            }),
        );
        setNewProduct({
            imageUrl: '',
            name: '',
            count: '',
            width: '',
            height: '',
            weight: '',
        });
    };

    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
    function openModal() {
        setIsOpen(true);
    }
    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }
    function closeModal() {
        setIsOpen(false);
        setNewProduct({
            imageUrl: '',
            name: '',
            count: '',
            width: '',
            height: '',
            weight: '',
        });
    }



    return (
        <>
            <div>
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Enter details</h2>

                    <form onSubmit={function(event){submitForm(event); closeModal()}}>
                                <label htmlFor="imageUrl">
                                    imageUrl
                                </label>
                                <input
                                    name="imageUrl"
                                    required
                                    value={newProduct.imageUrl}
                                    onChange={handleChange}
                                />
                                <label htmlFor="name">
                                    name
                                </label>
                                <input
                                    name="name"
                                    required
                                    value={newProduct.name}
                                    onChange={handleChange}
                                />
                                <label htmlFor="count">
                                    count
                                </label>
                                <input
                                    type="number"
                                    name="count"
                                    required
                                    value={newProduct.count}
                                    onChange={handleChange}
                                />
                        <label htmlFor="width">
                            width
                        </label>
                        <input
                            type="number"
                            name="width"
                            required
                            value={newProduct.width}
                            onChange={handleChange}
                        />
                        <label htmlFor="height">
                            height
                        </label>
                        <input
                            type="number"
                            name="height"
                            required
                            value={newProduct.height}
                            onChange={handleChange}
                        />
                                <label htmlFor="weight">
                                    weight
                                </label>
                                <input
                                    type="number"
                                    name="weight"
                                    required
                                    value={newProduct.weight}
                                    onChange={handleChange}
                                />
                            <button type="submit">Confirm</button>
                        <button onClick={closeModal}>Cancel</button>
                    </form>

                </Modal>
            </div>

            <h1>List View Page</h1>

            <button onClick={openModal} >ADD</button>
            <ProductList/>
        </>
    );
};

export default ListView;
