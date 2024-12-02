import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ShoppingCard from './index';
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

describe('ShoppingCard Component', () => {
  beforeEach(() => {
    mockUseShoppingCart.mockReturnValue({
      removeProduct: jest.fn(),
      updateQuantity: jest.fn(),
    });
  });

  test('renders ShoppingCard component', () => {
    render(<ShoppingCard product={mockProduct} />);
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
  });

  test('changes quantity correctly', () => {
    const mockUpdateQuantity = jest.fn();
    mockUseShoppingCart.mockReturnValue({
      removeProduct: jest.fn(),
      updateQuantity: mockUpdateQuantity,
    });

    render(<ShoppingCard product={mockProduct} />);

    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '5' } });
    expect(mockUpdateQuantity).toHaveBeenCalledWith(mockProduct.product_id, 5);
  });

  test('removes product correctly', () => {
    const mockRemoveProduct = jest.fn();
    mockUseShoppingCart.mockReturnValue({
      removeProduct: mockRemoveProduct,
      updateQuantity: jest.fn(),
    });

    render(<ShoppingCard product={mockProduct} />);

    const removeButton = screen.getByTestId(/trash/i);
    fireEvent.click(removeButton);
    expect(mockRemoveProduct).toHaveBeenCalledWith(mockProduct);
  });

  test('handles errors correctly', () => {
    const mockUpdateQuantity = jest.fn(() => {
      throw new Error('Test error');
    });
    mockUseShoppingCart.mockReturnValue({
      removeProduct: jest.fn(),
      updateQuantity: mockUpdateQuantity,
    });

    render(<ShoppingCard product={mockProduct} />);

    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '5' } });
    expect(screen.getByText('Test error')).toBeInTheDocument();
  });
});