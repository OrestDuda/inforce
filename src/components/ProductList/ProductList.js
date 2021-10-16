import { useSelector } from 'react-redux';
import ProductListItem from '../ProductList/ProductListItem';
import productSelectors from "../../redux/product/product-selectors";

const ProductList = () => {
   const products = useSelector(productSelectors.getAllProducts);

    return (
        <ul>
            {products.map(item => (
                <ProductListItem product={item} key={item.id} />
            ))}
        </ul>
    );
};
export default ProductList;
