import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '@/app/page';

describe('Home page', () => {
  it('renders the heading', () => {
    render(<Home />);
    expect(screen.getByRole('heading', { name: /Modern School Management for Africa & Beyond/i })).toBeInTheDocument();

  });
});
