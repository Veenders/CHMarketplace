import { NextResponse } from 'next/server'
import data from "@services/data/products.json"
import { Product } from '@/types/product'
 
type ResponseData = {
  products: Product[],
}
 
export async function GET() {
  console.log('entra');
  const products = data.products as Product[];
  return NextResponse.json({products}, {status:200})
}