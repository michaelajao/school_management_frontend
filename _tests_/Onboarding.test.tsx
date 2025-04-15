import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RegistrationPage from '@/components/onboarding/registrationPage';
import { useRouter, useSearchParams } from 'next/navigation';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

// Mock toast
jest.mock('sonner', () => ({
  toast: { error: jest.fn() },
}));

describe('Onboarding RegistrationPage E2E', () => {
  const push = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push });
    // Mock search params to simulate inviteId in URL
    (useSearchParams as jest.Mock).mockReturnValue({
      get: (key: string) => (key === 'inviteId' ? 'abc123xyz' : null),
    });
    push.mockClear();
    localStorage.clear();
  });

  it('renders registration form with prefilled role and submits successfully', async () => {
    render(<RegistrationPage />);

    // Wait for form to appear
    expect(await screen.findByText(/Create Your Account/i)).toBeInTheDocument();

    // Role should be prefilled as 'student'
    expect(screen.getByDisplayValue('student')).toBeInTheDocument();

    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText(/first name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText(/last name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByPlaceholderText(/email address/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/phone number/i), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'password123' } });

    // Agree to terms
    fireEvent.click(screen.getByLabelText(/I agree to the/i));

    // Submit
    fireEvent.click(screen.getByText(/Create Account/i));

    // Wait for redirect
    await waitFor(() => {
      expect(push).toHaveBeenCalledWith('/onboarding/student');
    });

    // User should be saved in localStorage
    const user = JSON.parse(localStorage.getItem('user')!);
    expect(user).toMatchObject({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '1234567890',
      role: 'student',
      password: 'password123',
      agreed: true,
    });
  });
});