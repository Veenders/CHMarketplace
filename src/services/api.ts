'use server'
import { Product } from "@/types/product"

const API_HOST = "http://localhost:3000/api"

export const getProducts = async():Promise<Product[]> => {
  try{
    const response = await fetch(API_HOST+'/products')
    const data = await response.json()
    const products = data.products;
    return products;
  } catch (err) {
    console.error(err)
    return []
  }
}