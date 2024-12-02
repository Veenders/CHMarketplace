'use client'
import { ReactNode, createContext, useContext, useMemo, useState } from "react";
import { Product } from "@/types/product";

type ShoppingCartContextState = {
  shoppingCart: Product[],
  addProduct: (product: Product) => void,
  removeProduct: (product: Product) => void
  updateQuantity: (productId: string, quantity: number) => void
  totalShoppingCart: number;
}

type ShoppingCartProviderProps = {
  children: ReactNode;
}

const ShoppingCartContext = createContext<ShoppingCartContextState | undefined>(undefined);

export const ShoppingCartProvider = ({children}:ShoppingCartProviderProps) => {
  const [shoppingCart, setShoppingCart] = useState<Product[]>([])
  const addProduct = (product:Product) => {
    try {
      if(!product.has_stock) throw new Error('We don\'t have stock')
      const index = shoppingCart.map(item => item.product_id).indexOf(product.product_id);
      if(index === -1){
        setShoppingCart([...shoppingCart, {...product, quantity:1}]);
      }else{
        if((shoppingCart[index].quantity ?? 1) >= product.best_seller.stock) throw new Error('we don\'t have enough stock')
        const newShoppingCart = [...shoppingCart];
        newShoppingCart[index].quantity = newShoppingCart[index]?.quantity ? newShoppingCart[index]?.quantity + 1 : 1
        setShoppingCart(newShoppingCart);
      }
    }catch (err) {
      console.error(err);
    }
  }

  const removeProduct = (product:Product) => {
    const newShoppingCart = shoppingCart.filter(item => item.product_id !== product.product_id);
    setShoppingCart(newShoppingCart)
  }

  const updateQuantity = (productId: string, quantity: number) => {
    const index = shoppingCart.map(item => item.product_id).indexOf(productId);
    if(quantity <= shoppingCart[index].best_seller.stock){
      const newShoppingCart = [...shoppingCart];
      newShoppingCart[index].quantity = quantity
      setShoppingCart(newShoppingCart);
    }else {
      throw new Error(`We don't have ${quantity} products to sell`)
    }
  }

  const updateTotalShoppingCart = () => {
    const total = shoppingCart.reduce((sum, item) => {
      return sum+item.best_seller.amount*(item.quantity??0)
    },0)
    return total
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const contextState = useMemo(() => ({shoppingCart, addProduct, removeProduct, updateQuantity, totalShoppingCart:updateTotalShoppingCart()}),[shoppingCart])
  return <ShoppingCartContext.Provider value={contextState}>{children}</ShoppingCartContext.Provider>
}

export const useShoppingCart = () => {
  const context = useContext(ShoppingCartContext);

  if(!context) {
    throw new Error("useShoppingCart must be used inside the ShoppingCartProvider");
  }

  return context;
}