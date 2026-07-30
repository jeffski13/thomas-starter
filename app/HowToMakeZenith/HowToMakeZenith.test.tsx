import { fireEvent, render, screen } from '@testing-library/react';
import HowToMakeZenithPage from './index';

beforeEach(() => {
  localStorage.clear();
});

describe('HowToMakeZenithPage rainbow speed meter', () => {
  test('defaults to 0.3s and updates the displayed value when the slider moves', () => {
    render(<HowToMakeZenithPage />);

    expect(screen.getByText('0.3s')).toBeInTheDocument();

    const slider = screen.getByLabelText('Rainbow speed');
    fireEvent.change(slider, { target: { value: '1.5' } });

    expect(screen.getByText('1.5s')).toBeInTheDocument();
  });

  test('applies the selected speed as the rainbow bar animation duration', () => {
    const { container } = render(<HowToMakeZenithPage />);

    const slider = screen.getByLabelText('Rainbow speed');
    fireEvent.change(slider, { target: { value: '2.1' } });

    const logo = container.querySelector('img[src="images/zenith/logo.webp"]')!;
    fireEvent.click(logo);

    const rainbowBar = container.querySelector('.rainbow-bar') as HTMLElement;
    expect(rainbowBar).toBeInTheDocument();
    expect(rainbowBar.style.animationDuration).toBe('2.1s');
  });
});

describe('HowToMakeZenithPage rainbow size meter', () => {
  test('defaults to 1.0x and updates the displayed value when the slider moves', () => {
    render(<HowToMakeZenithPage />);

    expect(screen.getByText('1.0x')).toBeInTheDocument();

    const slider = screen.getByLabelText('Rainbow size');
    fireEvent.change(slider, { target: { value: '2.5' } });

    expect(screen.getByText('2.5x')).toBeInTheDocument();
  });

  test('applies the selected size as the rainbow bar width and height', () => {
    const { container } = render(<HowToMakeZenithPage />);

    const slider = screen.getByLabelText('Rainbow size');
    fireEvent.change(slider, { target: { value: '2' } });

    const logo = container.querySelector('img[src="images/zenith/logo.webp"]')!;
    fireEvent.click(logo);

    const rainbowBar = container.querySelector('.rainbow-bar') as HTMLElement;
    expect(rainbowBar).toBeInTheDocument();
    expect(rainbowBar.style.width).toBe('40%');
    expect(rainbowBar.style.height).toBe('100px');
  });
});

describe('HowToMakeZenithPage man guy', () => {
  test('starts dancing on click and stops when the animation ends', () => {
    render(<HowToMakeZenithPage />);

    const manGuy = screen.getByRole('img', { name: 'man guy' });
    expect(manGuy).not.toHaveClass('dancing');

    fireEvent.click(manGuy);
    expect(manGuy).toHaveClass('dancing');

    fireEvent.animationEnd(manGuy);
    expect(manGuy).not.toHaveClass('dancing');
  });
});

describe('HowToMakeZenithPage grab jumpscare', () => {
  test('button reveals grabbing hand, then death text after the hand animation ends', () => {
    render(<HowToMakeZenithPage />);

    expect(screen.queryByRole('img', { name: 'grabbing hand' })).not.toBeInTheDocument();
    expect(screen.queryByText('YOU DIED')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: '???' }));

    const hand = screen.getByRole('img', { name: 'grabbing hand' });
    expect(hand).toBeInTheDocument();
    expect(screen.queryByText('YOU DIED')).not.toBeInTheDocument();

    fireEvent.animationEnd(hand);

    expect(screen.getByText('YOU DIED')).toBeInTheDocument();
    expect(screen.getByText("don't be surprised")).toBeInTheDocument();
  });

  test('clicking the overlay dismisses the hand and the death text', () => {
    const { container } = render(<HowToMakeZenithPage />);

    fireEvent.click(screen.getByRole('button', { name: '???' }));
    fireEvent.animationEnd(screen.getByRole('img', { name: 'grabbing hand' }));
    expect(screen.getByText('YOU DIED')).toBeInTheDocument();

    fireEvent.click(container.querySelector('.grab-overlay')!);

    expect(screen.queryByRole('img', { name: 'grabbing hand' })).not.toBeInTheDocument();
    expect(screen.queryByText('YOU DIED')).not.toBeInTheDocument();
  });
});

describe('HowToMakeZenithPage localStorage persistence', () => {
  test('persists speed and size changes to localStorage', () => {
    render(<HowToMakeZenithPage />);

    fireEvent.change(screen.getByLabelText('Rainbow speed'), { target: { value: '1.8' } });
    fireEvent.change(screen.getByLabelText('Rainbow size'), { target: { value: '3' } });

    expect(localStorage.getItem('zenith-rainbow-speed')).toBe('1.8');
    expect(localStorage.getItem('zenith-rainbow-size')).toBe('3');
  });

  test('loads previously saved speed and size on mount', () => {
    localStorage.setItem('zenith-rainbow-speed', '2.4');
    localStorage.setItem('zenith-rainbow-size', '0.7');

    render(<HowToMakeZenithPage />);

    expect(screen.getByText('2.4s')).toBeInTheDocument();
    expect(screen.getByText('0.7x')).toBeInTheDocument();
  });

  test('falls back to defaults when stored values are missing or invalid', () => {
    localStorage.setItem('zenith-rainbow-speed', 'not-a-number');

    render(<HowToMakeZenithPage />);

    expect(screen.getByText('0.3s')).toBeInTheDocument();
    expect(screen.getByText('1.0x')).toBeInTheDocument();
  });
});
