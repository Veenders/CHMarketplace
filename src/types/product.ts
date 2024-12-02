export type Product = {
  product_id: string
  has_stock: boolean
  readable_id: string
  name: string
  product_slug: string
  presentation_unit: string
  quantity_presentation_unit: number
  medias: Media[]
  brand: Brand
  best_seller: BestSeller
  quantity?: number
}

export type Media = {
  title: string
  resource: string
  position: number
}

export type Brand = {
  brand_id: string
  name: string
  slug: string
  image: string
  readable_id: string
}

export type BestSeller = {
  amount: number
  original_price: number
  base_price: number
  currency: string
  seller_id: string
  seller_name: string
  stock: number
  has_stock: boolean
}