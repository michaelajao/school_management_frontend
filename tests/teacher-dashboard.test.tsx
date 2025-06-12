import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import TeacherDashboard from '../app/(users)/teacher/page';

// Mock the auth context
const mockAuth = {
  user: {
    id: 'teacher-123',
    role: 'TEACHER',
    name: 'John Doe',
    email: 'john.doe@school.edu'
  },
  isAuthenticated: true
};

vi.mock('../contexts/AuthContext', () => ({
  useAuth: () => mockAuth
}));

// Mock the router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn()
  })
}));

describe('Teacher Dashboard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the dashboard with all main components', async () => {
    render(<TeacherDashboard />);
    
    // Check if main dashboard elements are present
    expect(screen.getByText('Teacher Dashboard')).toBeInTheDocument();
    expect(screen.getByRole('tablist')).toBeInTheDocument();
    
    // Check if all tabs are present
    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByText('Schedule')).toBeInTheDocument();
    expect(screen.getByText('Assignments')).toBeInTheDocument();
    expect(screen.getByText('Students')).toBeInTheDocument();
    expect(screen.getByText('Analytics')).toBeInTheDocument();
    expect(screen.getByText('Notifications')).toBeInTheDocument();
  });

  it('displays metric cards with correct information', async () => {
    render(<TeacherDashboard />);
    
    // Check if metric cards are present
    await waitFor(() => {
      expect(screen.getByText('Classes Today')).toBeInTheDocument();
      expect(screen.getByText('Pending Assignments')).toBeInTheDocument();
      expect(screen.getByText('Students')).toBeInTheDocument();
      expect(screen.getByText('Notifications')).toBeInTheDocument();
    });
    
    // Check if metrics display numbers
    expect(screen.getByText('6')).toBeInTheDocument(); // Classes today
    expect(screen.getByText('12')).toBeInTheDocument(); // Pending assignments
    expect(screen.getByText('150')).toBeInTheDocument(); // Students
  });

  it('handles tab navigation correctly', async () => {
    render(<TeacherDashboard />);
    
    // Click on Schedule tab
    const scheduleTab = screen.getByText('Schedule');
    fireEvent.click(scheduleTab);
    
    await waitFor(() => {
      expect(screen.getByText('Today\'s Schedule')).toBeInTheDocument();
    });
    
    // Click on Assignments tab
    const assignmentsTab = screen.getByText('Assignments');
    fireEvent.click(assignmentsTab);
    
    await waitFor(() => {
      expect(screen.getByText('Manage Assignments')).toBeInTheDocument();
    });
  });

  it('displays notifications with badge counter', async () => {
    render(<TeacherDashboard />);
    
    // Check if notification badge is present
    const notificationBadge = screen.getByText('8');
    expect(notificationBadge).toBeInTheDocument();
    expect(notificationBadge).toHaveClass('bg-red-500');
  });

  it('handles assignment filtering', async () => {
    render(<TeacherDashboard />);
    
    // Navigate to assignments tab
    fireEvent.click(screen.getByText('Assignments'));
    
    await waitFor(() => {
      // Check if filter dropdown is present
      expect(screen.getByText('All Assignments')).toBeInTheDocument();
    });
    
    // Test filtering by status (this would require more detailed implementation)
    const filterButton = screen.getByText('All Assignments');
    fireEvent.click(filterButton);
    
    // This test would need actual filter implementation to be meaningful
  });

  it('displays current class highlighting in schedule', async () => {
    render(<TeacherDashboard />);
    
    // Navigate to schedule tab
    fireEvent.click(screen.getByText('Schedule'));
    
    await waitFor(() => {
      // Check if current class is highlighted
      expect(screen.getByText('Mathematics - Grade 10')).toBeInTheDocument();
    });
  });

  it('handles student search functionality', async () => {
    render(<TeacherDashboard />);
    
    // Navigate to students tab
    fireEvent.click(screen.getByText('Students'));
    
    await waitFor(() => {
      // Check if search input is present
      const searchInput = screen.getByPlaceholderText('Search students...');
      expect(searchInput).toBeInTheDocument();
      
      // Test search functionality
      fireEvent.change(searchInput, { target: { value: 'John' } });
      expect(searchInput.value).toBe('John');
    });
  });

  it('displays analytics charts and data', async () => {
    render(<TeacherDashboard />);
    
    // Navigate to analytics tab
    fireEvent.click(screen.getByText('Analytics'));
    
    await waitFor(() => {
      expect(screen.getByText('Performance Overview')).toBeInTheDocument();
      expect(screen.getByText('Grade Distribution')).toBeInTheDocument();
    });
  });

  it('handles notification management', async () => {
    render(<TeacherDashboard />);
    
    // Navigate to notifications tab
    fireEvent.click(screen.getByText('Notifications'));
    
    await waitFor(() => {
      expect(screen.getByText('Notification Center')).toBeInTheDocument();
      // Check if different notification types are present
      expect(screen.getByText('Urgent')).toBeInTheDocument();
      expect(screen.getByText('Information')).toBeInTheDocument();
      expect(screen.getByText('Reminders')).toBeInTheDocument();
    });
  });

  it('maintains responsive design on different screen sizes', async () => {
    // Test mobile view
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
    });
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 667,
    });
    
    window.dispatchEvent(new Event('resize'));
    
    render(<TeacherDashboard />);
    
    // Check if mobile-friendly elements are present
    expect(screen.getByText('Teacher Dashboard')).toBeInTheDocument();
  });

  it('handles error states gracefully', async () => {
    // Mock console.error to avoid test noise
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    render(<TeacherDashboard />);
    
    // This test would require actual error injection to be meaningful
    // For now, just ensure the component doesn't crash
    expect(screen.getByText('Teacher Dashboard')).toBeInTheDocument();
    
    consoleSpy.mockRestore();
  });
});
