import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { ShoppingCartProvider, useShoppingCart } from './ShoppingCart';
import { Product } from '@/types/product';

const mockProduct: Product = {
  product_id: "73647e2d-4a38-4162-af06-14f21e5f0864",
  has_stock: true,
  readable_id: "OHXQO4",
  name: "Multivitamin-Mineral CELA Tabletten",
  product_slug: "multivitamin-mineral-cela-tabletten",
  presentation_unit: "Stück · Tabletten",
  quantity_presentation_unit: 100,
  medias: [
    {
      title: "Image",
      resource: "https://statics.zurrose-shop.ch/static/zurrose-shop/prod/product_images/73647e2d-4a38-4162-af06-14f21e5f0864-de-1.jpg",
      position: 0
    }
  ],
  brand: {
    brand_id: "066d1a98-2767-457c-9203-54c3e16edcce",
    name: "Burgerstein",
    slug: "burgerstein",
    image: "https://statics.zurrose-shop.ch/static/zurrose-shop/prod/brand_images/K7TKF4_de_DE.png",
    readable_id: "K7TKF4"
  },
  best_seller: {
    amount: 26.5,
    original_price: 27.1,
    base_price: 0.26,
    currency: "EUR",
    seller_id: "782489d1-ea2d-4644-8f02-e06e815b0b13",
    seller_name: "Kanela",
    stock: 30,
    has_stock: true
  }
};

const TestComponent = () => {
  const { shoppingCart, addProduct, removeProduct, updateQuantity, totalShoppingCart } = useShoppingCart();
  return (
    <div>
      <button onClick={() => addProduct(mockProduct)}>Add Product</button>
      <button onClick={() => removeProduct(mockProduct)}>Remove Product</button>
      <button onClick={() => updateQuantity(mockProduct.product_id, 5)}>Update Quantity</button>
      <div data-testid="total">{totalShoppingCart}</div>
      <div data-testid="cart-length">{shoppingCart.length}</div>
    </div>
  );
};

describe('ShoppingCartProvider', () => {
  test('renders ShoppingCartProvider component', () => {
    render(
      <ShoppingCartProvider>
        <TestComponent />
      </ShoppingCartProvider>
    );
    expect(screen.getByText('Add Product')).toBeInTheDocument();
  });

  test('adds product to shopping cart', () => {
    render(
      <ShoppingCartProvider>
        <TestComponent />
      </ShoppingCartProvider>
    );
    const addButton = screen.getByText('Add Product');
    fireEvent.click(addButton);
    expect(screen.getByTestId('cart-length').textContent).toBe('1');
  });

  test('removes product from shopping cart', () => {
    render(
      <ShoppingCartProvider>
        <TestComponent />
      </ShoppingCartProvider>
    );
    const addButton = screen.getByText('Add Product');
    const removeButton = screen.getByText('Remove Product');
    fireEvent.click(addButton);
    fireEvent.click(removeButton);
    expect(screen.getByTestId('cart-length').textContent).toBe('0');
  });

  test('updates product quantity in shopping cart', () => {
    render(
      <ShoppingCartProvider>
        <TestComponent />
      </ShoppingCartProvider>
    );
    const addButton = screen.getByText('Add Product');
    const updateButton = screen.getByText('Update Quantity');
    fireEvent.click(addButton);
    fireEvent.click(updateButton);
    expect(screen.getByTestId('cart-length').textContent).toBe('1');
    expect(screen.getByTestId('total').textContent).toBe('132.5');
  });

  test('calculates total shopping cart correctly', () => {
    render(
      <ShoppingCartProvider>
        <TestComponent />
      </ShoppingCartProvider>
    );
    const addButton = screen.getByText('Add Product');
    fireEvent.click(addButton);
    expect(screen.getByTestId('total').textContent).toBe('26.5');
  });
});