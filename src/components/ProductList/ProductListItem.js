import productOperations from "../../redux/product/product-operations";
import { useDispatch } from 'react-redux';
import React from 'react';
import Modal from 'react-modal';
import { Link } from "react-router-dom";
import '../../index.css'

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

export default function ProductListItem({product}) {
    const dispatch = useDispatch();
   const onDelete = id => dispatch(productOperations.deleteProduct(id));

    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
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
            <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Are you sure?</h2>
                <button onClick={() => onDelete(product.id)}>Yes</button>
                <button onClick={closeModal}>No</button>
        </Modal>
    </div>

    <li>
        <Link to={
        {pathname: `/product/${product.id}`,
        state: {product}
        }
        } >
            {product.name}
        </Link>
        <button onClick={openModal} >DELETE</button>
    </li></>
    );
}

