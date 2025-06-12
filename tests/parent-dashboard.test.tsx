import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ParentDashboard from '../app/(users)/parent/page';

// Mock the auth context
const mockAuth = {
  user: {
    id: 'parent-456',
    role: 'PARENT',
    name: 'Jane Smith',
    email: 'jane.smith@parent.com'
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

describe('Parent Dashboard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the dashboard with multi-child interface', async () => {
    render(<ParentDashboard />);
    
    // Check if main dashboard elements are present
    expect(screen.getByText('Parent Dashboard')).toBeInTheDocument();
    
    // Check if child selection interface is present
    expect(screen.getByText('Emma Johnson')).toBeInTheDocument();
    expect(screen.getByText('Alex Johnson')).toBeInTheDocument();
    expect(screen.getByText('Sarah Johnson')).toBeInTheDocument();
  });

  it('displays child selection cards with correct information', async () => {
    render(<ParentDashboard />);
    
    // Check if child cards display required information
    await waitFor(() => {
      expect(screen.getByText('Grade 10-A')).toBeInTheDocument();
      expect(screen.getByText('Grade 8-B')).toBeInTheDocument();
      expect(screen.getByText('Grade 6-C')).toBeInTheDocument();
    });
    
    // Check if achievements are displayed
    expect(screen.getByText('Honor Roll')).toBeInTheDocument();
    expect(screen.getByText('Math Champion')).toBeInTheDocument();
  });

  it('handles child switching correctly', async () => {
    render(<ParentDashboard />);
    
    // Click on second child
    const alexCard = screen.getByText('Alex Johnson');
    fireEvent.click(alexCard);
    
    await waitFor(() => {
      // Check if dashboard updates with Alex's data
      expect(screen.getByText('B+')).toBeInTheDocument(); // Alex's GPA
    });
    
    // Click on third child
    const sarahCard = screen.getByText('Sarah Johnson');
    fireEvent.click(sarahCard);
    
    await waitFor(() => {
      // Check if dashboard updates with Sarah's data
      expect(screen.getByText('A-')).toBeInTheDocument(); // Sarah's GPA
    });
  });

  it('displays correct metrics for selected child', async () => {
    render(<ParentDashboard />);
    
    // Check if metric cards are present
    await waitFor(() => {
      expect(screen.getByText('Current Grades')).toBeInTheDocument();
      expect(screen.getByText('Attendance')).toBeInTheDocument();
      expect(screen.getByText('Assignments')).toBeInTheDocument();
      expect(screen.getByText('Pending Fees')).toBeInTheDocument();
    });
    
    // Check metric values for Emma (default selected child)
    expect(screen.getByText('A+')).toBeInTheDocument(); // GPA
    expect(screen.getByText('96%')).toBeInTheDocument(); // Attendance
    expect(screen.getByText('3')).toBeInTheDocument(); // Assignments
    expect(screen.getByText('$0')).toBeInTheDocument(); // Fees
  });

  it('handles tab navigation correctly', async () => {
    render(<ParentDashboard />);
    
    // Check if all tabs are present
    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByText('Grades')).toBeInTheDocument();
    expect(screen.getByText('Attendance')).toBeInTheDocument();
    expect(screen.getByText('Messages')).toBeInTheDocument();
    expect(screen.getByText('Events')).toBeInTheDocument();
    expect(screen.getByText('Notifications')).toBeInTheDocument();
    
    // Click on Grades tab
    const gradesTab = screen.getByText('Grades');
    fireEvent.click(gradesTab);
    
    await waitFor(() => {
      expect(screen.getByText('Grade Report')).toBeInTheDocument();
    });
  });

  it('displays subject performance correctly', async () => {
    render(<ParentDashboard />);
    
    // Check if subject cards are present
    await waitFor(() => {
      expect(screen.getByText('Mathematics')).toBeInTheDocument();
      expect(screen.getByText('Science')).toBeInTheDocument();
      expect(screen.getByText('English')).toBeInTheDocument();
      expect(screen.getByText('History')).toBeInTheDocument();
    });
    
    // Check if grades are displayed
    expect(screen.getByText('95%')).toBeInTheDocument(); // Math grade
    expect(screen.getByText('92%')).toBeInTheDocument(); // Science grade
  });

  it('handles notification badges correctly', async () => {
    render(<ParentDashboard />);
    
    // Check if notification badges are present
    const messagesBadge = screen.getByText('2');
    expect(messagesBadge).toBeInTheDocument();
    expect(messagesBadge).toHaveClass('bg-blue-500');
    
    const notificationsBadge = screen.getByText('5');
    expect(notificationsBadge).toBeInTheDocument();
    expect(notificationsBadge).toHaveClass('bg-red-500');
  });

  it('displays attendance information in attendance tab', async () => {
    render(<ParentDashboard />);
    
    // Navigate to attendance tab
    fireEvent.click(screen.getByText('Attendance'));
    
    await waitFor(() => {
      expect(screen.getByText('Attendance Overview')).toBeInTheDocument();
      expect(screen.getByText('Monthly Breakdown')).toBeInTheDocument();
    });
  });

  it('handles message management in messages tab', async () => {
    render(<ParentDashboard />);
    
    // Navigate to messages tab
    fireEvent.click(screen.getByText('Messages'));
    
    await waitFor(() => {
      expect(screen.getByText('Messages')).toBeInTheDocument();
      // Check if message categories are present
      expect(screen.getByText('All Messages')).toBeInTheDocument();
    });
  });

  it('displays school events in events tab', async () => {
    render(<ParentDashboard />);
    
    // Navigate to events tab
    fireEvent.click(screen.getByText('Events'));
    
    await waitFor(() => {
      expect(screen.getByText('Upcoming Events')).toBeInTheDocument();
      // Check if event categories are present
      expect(screen.getByText('All Events')).toBeInTheDocument();
    });
  });

  it('manages notifications in notifications tab', async () => {
    render(<ParentDashboard />);
    
    // Navigate to notifications tab
    fireEvent.click(screen.getByText('Notifications'));
    
    await waitFor(() => {
      expect(screen.getByText('Notifications')).toBeInTheDocument();
      // Check if notification filters are present
      expect(screen.getByText('All Notifications')).toBeInTheDocument();
    });
  });

  it('maintains responsive design on mobile devices', async () => {
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
    
    render(<ParentDashboard />);
    
    // Check if mobile-friendly elements are present
    expect(screen.getByText('Parent Dashboard')).toBeInTheDocument();
  });

  it('handles achievements display correctly', async () => {
    render(<ParentDashboard />);
    
    // Check if achievements are displayed for children
    expect(screen.getByText('🏆')).toBeInTheDocument(); // Achievement emoji
    expect(screen.getByText('Honor Roll')).toBeInTheDocument();
    expect(screen.getByText('Math Champion')).toBeInTheDocument();
  });

  it('displays behavior scores when available', async () => {
    render(<ParentDashboard />);
    
    // Navigate to grades tab to see behavior scores
    fireEvent.click(screen.getByText('Grades'));
    
    await waitFor(() => {
      // Check if behavior scores are displayed (mock data shows 95)
      expect(screen.getByText('Behavior Score')).toBeInTheDocument();
    });
  });

  it('handles error states gracefully', async () => {
    // Mock console.error to avoid test noise
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    render(<ParentDashboard />);
    
    // Ensure the component doesn't crash
    expect(screen.getByText('Parent Dashboard')).toBeInTheDocument();
    
    consoleSpy.mockRestore();
  });

  it('updates metrics when switching between children', async () => {
    render(<ParentDashboard />);
    
    // Check Emma's initial metrics
    expect(screen.getByText('A+')).toBeInTheDocument();
    expect(screen.getByText('96%')).toBeInTheDocument();
    
    // Switch to Alex
    fireEvent.click(screen.getByText('Alex Johnson'));
    
    await waitFor(() => {
      // Check if metrics update to Alex's data
      expect(screen.getByText('B+')).toBeInTheDocument();
      expect(screen.getByText('94%')).toBeInTheDocument();
    });
  });
});
