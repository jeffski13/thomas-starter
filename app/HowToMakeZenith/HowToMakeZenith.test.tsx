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
