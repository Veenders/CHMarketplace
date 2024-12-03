import { NextResponse } from 'next/server'
import data from "@services/data/products.json"
import { Product } from '@/types/product'
 
export async function GET() {
  console.log('entra');
  const products = data.products as Product[];
  return NextResponse.json({products}, {status:200})
}