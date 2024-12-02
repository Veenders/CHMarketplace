'use client'
import ShoppingCard from "@molecules/ShoppingCard";
import { useShoppingCart } from "@/context/ShoppingCart";
import Drawer from "@/components/atoms/Drawer"
import styles from "./cartlist.module.css"

const CartList = () => {
  const {shoppingCart, totalShoppingCart} = useShoppingCart();
  return (
    <>
      <div className={styles.cartList}>
        <h3>Zum Warenkorb hinzugefügt</h3>
        <div className={styles.cartListItems}>
          {shoppingCart.map(product => <ShoppingCard key={product.product_id} product={product} />)}
        </div>
        <div className={styles.cartListTotal}>
          <h3>Total</h3>
          <div>
            <p>Summe <span>({shoppingCart.length} Produkte)</span></p>
            <p>{totalShoppingCart.toFixed(2)} €</p>
          </div>
        </div>
      </div>
      <Drawer quantity={shoppingCart.length}>
        <>
          <div className={styles.cartListItems}>
            {shoppingCart.map(product => <ShoppingCard key={product.product_id} product={product} />)}
          </div>
          <div className={styles.cartListTotalMobile}>
            <h3>Total</h3>
            <div>
              <p>Summe <span>({shoppingCart.length} Produkte)</span></p>
              <p>{totalShoppingCart.toFixed(2)} €</p>
            </div>
          </div>
        </>
      </Drawer>
    </>
  )
}

export default CartList