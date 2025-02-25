import { render, screen, fireEvent } from '@testing-library/react';
import CustomizedButton from '../CustomizedButton';

describe('CustomizedButton', () => {
  it('renders button with correct text', () => {
    render(<CustomizedButton>Click me</CustomizedButton>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<CustomizedButton onClick={handleClick}>Click me</CustomizedButton>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('can be disabled', () => {
    render(<CustomizedButton disabled>Click me</CustomizedButton>);
    expect(screen.getByText('Click me')).toBeDisabled();
  });
});
