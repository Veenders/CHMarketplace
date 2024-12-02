import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductCard from './index';
import { Product } from '@/types/product';
import { useShoppingCart } from '@/context/ShoppingCart';

const mockProduct: Product = {
  product_id: '73647e2d-4a38-4162-af06-14f21e5f0864',
  has_stock: true,
  readable_id: 'OHXQO4',
  name: 'Multivitamin-Mineral CELA Tabletten',
  product_slug: 'multivitamin-mineral-cela-tabletten',
  presentation_unit: 'Stück · Tabletten',
  quantity_presentation_unit: 100,
  medias: [
    {
      title: 'Image',
      resource: 'https://statics.zurrose-shop.ch/static/zurrose-shop/prod/product_images/73647e2d-4a38-4162-af06-14f21e5f0864-de-1.jpg',
      position: 0,
    },
  ],
  brand: {
    brand_id: '066d1a98-2767-457c-9203-54c3e16edcce',
    name: 'Burgerstein',
    slug: 'burgerstein',
    image: 'https://statics.zurrose-shop.ch/static/zurrose-shop/prod/brand_images/K7TKF4_de_DE.png',
    readable_id: 'K7TKF4',
  },
  best_seller: {
    amount: 26.5,
    original_price: 27.1,
    base_price: 0.26,
    currency: 'EUR',
    seller_id: '782489d1-ea2d-4644-8f02-e06e815b0b13',
    seller_name: 'Kanela',
    stock: 30,
    has_stock: true,
  },
};

jest.mock('@/context/ShoppingCart', () => ({
  useShoppingCart: jest.fn(),
}));

const mockUseShoppingCart = useShoppingCart as jest.Mock;

describe('ProductCard Component', () => {
  beforeEach(() => {
    mockUseShoppingCart.mockReturnValue({
      addProduct: jest.fn(),
      shoppingCart: [],
    });
  });

  test('renders ProductCard component', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.presentation_unit)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.brand.name)).toBeInTheDocument();
    expect(screen.getByText(`${mockProduct.best_seller.amount} €`)).toBeInTheDocument();
  });

  test('renders product image', () => {
    render(<ProductCard product={mockProduct} />);
    const img = screen.getByAltText(mockProduct.medias[0].title);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', mockProduct.medias[0].resource);
  });

  test('disables button when out of stock', () => {
    const outOfStockProduct = { ...mockProduct, has_stock: false };
    render(<ProductCard product={outOfStockProduct} />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  test('disables button when quantity exceeds stock', () => {
    mockUseShoppingCart.mockReturnValue({
      addProduct: jest.fn(),
      shoppingCart: [{ ...mockProduct, quantity: 30 }],
    });
    render(<ProductCard product={mockProduct} />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });
});