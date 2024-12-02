'use client'
/* eslint-disable @next/next/no-img-element */
import CardButton from "@/components/atoms/CartButton";
import { Product } from "@/types/product"
import styles from "./productcard.module.css";
import { useShoppingCart } from "@/context/ShoppingCart";

type CardButtonProps = {
  product: Product;
}

const FavoriteSVG = () => {
  return (
    <svg width="24" height="32" viewBox="0 0 24 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M15.825 4C18.995 4 21.125 6.98 21.125 9.76C21.125 15.39 12.285 20 12.125 20C11.965 20 3.125 15.39 3.125 9.76C3.125 6.98 5.255 4 8.425 4C10.245 4 11.435 4.91 12.125 5.71C12.815 4.91 14.005 4 15.825 4Z" stroke="#D0D0D0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

const StarSVG = () => {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.1605 13.5126C2.82275 13.6858 2.4395 13.3822 2.50775 12.9946L3.234 8.85582L0.151374 5.91932C-0.136501 5.64457 0.0131236 5.14232 0.398999 5.08807L4.68475 4.47907L6.59575 0.692949C6.76812 0.351699 7.2345 0.351699 7.40687 0.692949L9.31787 4.47907L13.6036 5.08807C13.9895 5.14232 14.1391 5.64457 13.8504 5.91932L10.7686 8.85582L11.4949 12.9946C11.5631 13.3822 11.1799 13.6858 10.8421 13.5126L7 11.5386L3.15962 13.5126H3.1605Z" fill="#FFD544"/>
    </svg>
  )
}
const ProductCard = ({product}:CardButtonProps) => {
  const { addProduct, shoppingCart } = useShoppingCart();
  const isDisabled = () => {
    const [element] = shoppingCart.filter(el => el.product_id === product.product_id)
    return !product.has_stock || !((element?.quantity ?? 0) < product.best_seller.stock)
  }
  return (
    <div className={styles.productCard}>
      <div className={styles.placeHolderImage}>
        <span>Pflichtangaben</span>
        {!!product.medias[0] && <img src={product.medias[0].resource} alt={product.medias[0].title}/>}
      </div>
      <div className={styles.textBox}>
        <h4>{product.name}</h4>
        <p>{product.presentation_unit}</p>
        <p>{product.brand.name}</p>
        <div className={styles.valorationLine}><StarSVG /><StarSVG /><StarSVG /><StarSVG /><StarSVG /> (52)</div>
        <p className={styles.price}>{product.best_seller.amount} € {!!product.best_seller.original_price && <span>{product.best_seller.original_price} €</span>}</p>
        <p>{product.best_seller.base_price} {!!product.best_seller.base_price && "€/st."}</p>
        <p className={styles.sponsor}>Gesponsert</p>
      </div>
      <div className={styles.button}>
        <CardButton onClick={() => addProduct(product)} disabled={isDisabled()}/>
      </div>
      <div className={styles.favoriteBox}>
        <FavoriteSVG />
      </div>
    </div>
  )
}

export default ProductCard