import { fireEvent, render, screen } from '@testing-library/react';
import TetrisPage from './index';

describe('TetrisPage sussyrizzrizz button', () => {
  test('toggles the sussyrizzrizz guy, wearing a 4, on and off', () => {
    render(<TetrisPage />);

    expect(screen.queryByRole('img', { name: 'sussyrizzrizz guy' })).not.toBeInTheDocument();

    const button = screen.getByRole('button', { name: 'sussyrizzrizz' });
    fireEvent.click(button);
    const guy = screen.getByRole('img', { name: 'sussyrizzrizz guy' });
    expect(guy).toBeInTheDocument();
    expect(guy).toHaveTextContent('sussyrizzrizz');
    expect(guy).toHaveTextContent('4');

    fireEvent.click(button);
    expect(screen.queryByRole('img', { name: 'sussyrizzrizz guy' })).not.toBeInTheDocument();
  });
});

describe('TetrisPage verity button', () => {
  test('toggles verity on and off', () => {
    render(<TetrisPage />);

    expect(screen.queryByRole('img', { name: 'verity' })).not.toBeInTheDocument();

    const button = screen.getByRole('button', { name: 'verity' });
    fireEvent.click(button);
    expect(screen.getByRole('img', { name: 'verity' })).toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.queryByRole('img', { name: 'verity' })).not.toBeInTheDocument();
  });
});
