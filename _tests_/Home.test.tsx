import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '@/app/page';

describe('Home page', () => {
  it('renders the heading', () => {
    render(<Home />);
    expect(screen.getByRole('heading', { name: /School Management System for Africa and Beyond/i })).toBeInTheDocument();

  });
});
