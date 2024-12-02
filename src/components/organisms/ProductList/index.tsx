import styles from "./productlist.module.css";
import { getProducts } from "@/services/api";
import ProductCard from "@molecules/ProductCard";
import FeaturedCard from "@molecules/FeaturedCard";

const ProductList = async() => {
  const products = await getProducts();
  return (
    <div className={styles.productList}>
      {products.map( product => <ProductCard key={product.product_id} product={product}/>)}
      <FeaturedCard />
    </div>
  );
}

export default ProductList