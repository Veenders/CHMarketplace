import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CartButton from './index';

describe('CartButton Component', () => {
  test('renders CartButton component', () => {
    const {getByRole} = render(<CartButton />);
    const buttonElement = getByRole('button');
    expect(buttonElement).toBeInTheDocument();
  });
  test('expect click works correctly', () => {
    const onClickMock = jest.fn();
    const {getByRole} = render(<CartButton onClick={onClickMock}/>);
    const buttonElement = getByRole('button');
    fireEvent.click(buttonElement);
    expect(onClickMock).toHaveBeenCalled();
  });
  test('expect disabled works correctly', () => {
    const onClickMock = jest.fn();
    const {getByRole} = render(<CartButton onClick={onClickMock} disabled/>);
    const buttonElement = getByRole('button');
    buttonElement.click();
    expect(onClickMock).not.toHaveBeenCalled();
  });
});