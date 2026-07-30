import { fireEvent, render, screen } from '@testing-library/react';
import HowToMakeZenithPage from './index';

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
