import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import QuantityInput from './index';

describe('QuantityInput Component', () => {
  const mockOnChangeValue = jest.fn();

  test('renders QuantityInput component', () => {
    render(<QuantityInput max={10} value={1} onChangeValue={mockOnChangeValue} />);
    expect(screen.getByRole('spinbutton')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '-' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '+' })).toBeInTheDocument();
  });

  test('changes value when input changes', () => {
    render(<QuantityInput max={10} value={1} onChangeValue={mockOnChangeValue} />);
    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '5' } });
    expect(mockOnChangeValue).toHaveBeenCalledWith(5);
  });

  test('increments value when + button is clicked', () => {
    render(<QuantityInput max={10} value={1} onChangeValue={mockOnChangeValue} />);
    const addButton = screen.getByRole('button', { name: '+' });
    fireEvent.click(addButton);
    expect(mockOnChangeValue).toHaveBeenCalledWith(2);
  });

  test('decrements value when - button is clicked', () => {
    render(<QuantityInput max={10} value={2} onChangeValue={mockOnChangeValue} />);
    const removeButton = screen.getByRole('button', { name: '-' });
    fireEvent.click(removeButton);
    expect(mockOnChangeValue).toHaveBeenCalledWith(1);
  });

  test('disables - button when value is 1', () => {
    render(<QuantityInput max={10} value={1} onChangeValue={mockOnChangeValue} />);
    const removeButton = screen.getByRole('button', { name: '-' });
    expect(removeButton).toBeDisabled();
  });

  test('disables + button when value is equal to max', () => {
    render(<QuantityInput max={10} value={10} onChangeValue={mockOnChangeValue} />);
    const addButton = screen.getByRole('button', { name: '+' });
    expect(addButton).toBeDisabled();
  });

  test('changes value to 0 when input changes with isNaN', () => {
    render(<QuantityInput max={10} value={1} onChangeValue={mockOnChangeValue} />);
    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(mockOnChangeValue).toHaveBeenCalledWith(0);
  });
});