/* eslint-disable @next/next/no-img-element */
'use client'
import { useState } from 'react'
import { Snackbar, Alert } from '@mui/material'
import QuantityInput from '@atoms/QuantityInput'
import TrashSVG from '@atoms/TrashSVG'
import { Product } from '@/types/product'
import { useShoppingCart } from '@/context/ShoppingCart'
import styles from './shoppingCard.module.css'

type ShoppingCardProps = {
  product: Product
}

const ShoppingCard = ({product}:ShoppingCardProps) => {
  const { removeProduct, updateQuantity } = useShoppingCart()
  const [ errorDialog, setErrorDialog] = useState('');
  const onChangeQuantity = (quantity: number) => {
    try {
      updateQuantity(product.product_id, quantity)
    }catch(err){
      const error = err as Error
      setErrorDialog(error.message);
    }
  }
  const handleClose = () => {
    setErrorDialog('');
  }
  return (
    <div className={styles.shoppingCard}>
      <div className={styles.shoppingCardImage}>
        {!!product.medias[0] && <img src={product.medias[0].resource} alt={product.medias[0].title}/>}
      </div>
      <div className={styles.shoppingCardContainer}>
        <div className={styles.shoppingCardMainContent}>
          <div className={styles.shoppingCardText}>
            <h4>{product.name}</h4>
            <p>{product.presentation_unit}</p>
            <p>PZN: {product.readable_id}</p>
            <p>Einzelpreis: {product.best_seller.amount} €</p>
          </div>
          <button onClick={()=>removeProduct(product)} data-testid="trash">
            <TrashSVG />
          </button>
        </div>
        <div className={styles.shoppingCardPrice}>
          <QuantityInput max={product.best_seller.stock} value={product.quantity ?? 1} onChangeValue={onChangeQuantity} />
          <p>{(product.best_seller.amount * (product.quantity ?? 0)).toFixed(2)} €</p>
        </div>
      </div>
      <Snackbar 
        open={!!errorDialog} 
        autoHideDuration={4000}  
        onClose={handleClose}
        anchorOrigin={{vertical:'top', horizontal:'right'}} 
      >
        <Alert onClose={handleClose} severity="error" sx={{width:'100%'}} variant="filled">{errorDialog}</Alert>
      </Snackbar>
    </div>
  )
}

export default ShoppingCard;