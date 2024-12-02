import styles from "./page.module.css";
import ProductList from "@organisms/ProductList";
import CartList from "@organisms/CartList";
import { ShoppingCartProvider } from "@/context/ShoppingCart";

export default function Home() {
  return (
    <ShoppingCartProvider>
      <div className={styles.page}>
        <ProductList />
        <CartList />
      </div>
    </ShoppingCartProvider>
  );
}
