"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AuthApiService } from '@/lib/api/auth';
import { getDashboardPath } from '@/contexts/auth-context';
import { 
  GraduationCap, 
  Users, 
  BookOpen, 
  Calendar, 
  MessageSquare, 
  BarChart3,
  Shield,
  Clock,
  CheckCircle,
  ArrowRight,
  School,
  UserCheck,
  FileText,
  Bell
} from 'lucide-react';

type UserRole = "admin" | "teacher" | "student" | "parent" | "superadmin" | "school_management";

export default function Home() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [showLanding, setShowLanding] = useState(false);

  useEffect(() => {
    const checkAuthAndRedirect = async () => {
      try {
        // Check if user is already authenticated
        const storedToken = AuthApiService.getStoredToken();
        const storedUser = AuthApiService.getStoredUser();

        if (storedToken && storedUser) {
          // Verify token is still valid
          try {
            await AuthApiService.getProfile();
            // Token is valid, redirect to appropriate dashboard
            const dashboardPath = getDashboardPath(storedUser.role as UserRole);
            router.replace(dashboardPath);
            return;
          } catch {
            // Token is invalid, clear storage and show landing page
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user_data');
            localStorage.removeItem('refresh_token');
          }
        }

        // No valid authentication, show landing page
        setShowLanding(true);
      } catch (error) {
        console.error('Auth check failed:', error);
        setShowLanding(true);
      } finally {
        setChecking(false);
      }
    };

    checkAuthAndRedirect();
  }, [router]);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className=&quot;text-center&quot;>
          <div className=&quot;animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4&quot;></div>
          <p className=&quot;text-gray-600&quot;>Loading...</p>
        </div>
      </div>
    );
  }

  if (!showLanding) {
    return null;
  }

  const features = [
    {
      icon: Users,
      title: "User Management",
      description: "Comprehensive management for students, teachers, parents, and administrators with role-based access control."
    },
    {
      icon: GraduationCap,
      title: "Academic Management",
      description: "Manage classes, subjects, grades, and academic performance tracking with detailed analytics."
    },
    {
      icon: Calendar,
      title: "Attendance & Scheduling",
      description: "Automated attendance tracking, timetable management, and schedule coordination."
    },
    {
      icon: MessageSquare,
      title: "Communication Hub",
      description: "Seamless communication between teachers, parents, and students with announcements and messaging."
    },
    {
      icon: BarChart3,
      title: "Reports & Analytics",
      description: "Detailed reports on student performance, attendance, and school-wide analytics."
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Enterprise-grade security with data protection and reliable cloud infrastructure."
    }
  ];

  const userTypes = [
    {
      icon: School,
      title: "School Administrators",
      description: "Complete control over school operations, user management, and system configuration.",
      href: "/auth/signin",
      color: "bg-blue-500"
    },
    {
      icon: UserCheck,
      title: "Teachers",
      description: "Manage classes, track student progress, and communicate with parents.",
      href: "/auth/signin",
      color: "bg-green-500"
    },
    {
      icon: GraduationCap,
      title: "Students",
      description: "Access assignments, view grades, and stay connected with school activities.",
      href: "/auth/signin",
      color: "bg-purple-500"
    },
    {
      icon: Users,
      title: "Parents",
      description: "Monitor your child's progress, communicate with teachers, and stay informed.",
      href: "/auth/signin",
      color: "bg-orange-500"
    }
  ];

  const benefits = [
    {
      icon: Clock,
      title: "Save Time",
      description: "Automate administrative tasks and streamline school operations."
    },
    {
      icon: CheckCircle,
      title: "Improve Communication",
      description: "Better coordination between all stakeholders in the education process."
    },
    {
      icon: BarChart3,
      title: "Data-Driven Decisions",
      description: "Make informed decisions with comprehensive analytics and reporting."
    },
    {
      icon: Bell,
      title: "Stay Connected",
      description: "Real-time notifications and updates keep everyone informed."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      {/* Header */}
      <header className=&quot;bg-white shadow-sm border-b&quot;>
        <div className=&quot;max-w-7xl mx-auto px-4 sm:px-6 lg:px-8&quot;>
          <div className=&quot;flex justify-between items-center py-4&quot;>
            <div className=&quot;flex items-center space-x-3&quot;>
              <div className=&quot;w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center&quot;>
                <School className=&quot;w-6 h-6 text-white&quot; />
              </div>
              <div>
                <h1 className=&quot;text-xl font-bold text-gray-900&quot;>SchoolMS</h1>
                <p className=&quot;text-sm text-gray-500&quot;>Management System</p>
              </div>
            </div>
            <div className=&quot;flex items-center space-x-4&quot;>
              <Link href=&quot;/auth/signin&quot;>
                <Button variant=&quot;outline&quot;>Sign In</Button>
              </Link>
              <Link href=&quot;/auth/school-signup&quot;>
                <Button className=&quot;bg-teal-600 hover:bg-teal-700&quot;>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className=&quot;max-w-7xl mx-auto text-center&quot;>
          <h1 className=&quot;text-4xl md:text-6xl font-bold text-gray-900 mb-6&quot;>
            Modern School
            <span className="text-teal-600"> Management</span>
            <br />Made Simple
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Streamline your educational institution with our comprehensive school management system. 
            From student enrollment to academic tracking, we've got everything covered.
          </p>
          <div className=&quot;flex flex-col sm:flex-row gap-4 justify-center&quot;>
            <Link href=&quot;/auth/school-signup&quot;>
              <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-lg px-8 py-3">
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href=&quot;/auth/signin&quot;>
              <Button size="lg" variant="outline" className="text-lg px-8 py-3">
                View Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className=&quot;max-w-7xl mx-auto px-4 sm:px-6 lg:px-8&quot;>
          <div className=&quot;text-center mb-16&quot;>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Manage Your School
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive platform provides all the tools necessary to run a modern educational institution efficiently.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className=&quot;border-0 shadow-lg hover:shadow-xl transition-shadow&quot;>
                <CardHeader>
                  <div className=&quot;w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4&quot;>
                    <feature.icon className=&quot;w-6 h-6 text-teal-600&quot; />
                  </div>
                  <CardTitle className=&quot;text-xl&quot;>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* User Types Section */}
      <section className="py-20 bg-gray-50">
        <div className=&quot;max-w-7xl mx-auto px-4 sm:px-6 lg:px-8&quot;>
          <div className=&quot;text-center mb-16&quot;>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Built for Every Role in Education
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tailored experiences for administrators, teachers, students, and parents with role-specific dashboards and features.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {userTypes.map((userType, index) => (
              <Card key={index} className=&quot;border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1&quot;>
                <CardHeader className=&quot;text-center&quot;>
                  <div className={`w-16 h-16 ${userType.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <userType.icon className=&quot;w-8 h-8 text-white&quot; />
                  </div>
                  <CardTitle className=&quot;text-xl&quot;>{userType.title}</CardTitle>
                </CardHeader>
                <CardContent className=&quot;text-center&quot;>
                  <CardDescription className="text-gray-600 mb-4">
                    {userType.description}
                  </CardDescription>
                  <Link href={userType.href}>
                    <Button variant="outline" className="w-full">
                      Access Portal
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className=&quot;max-w-7xl mx-auto px-4 sm:px-6 lg:px-8&quot;>
          <div className=&quot;text-center mb-16&quot;>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our School Management System?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className=&quot;text-center&quot;>
                <div className=&quot;w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4&quot;>
                  <benefit.icon className=&quot;w-8 h-8 text-teal-600&quot; />
                </div>
                <h3 className=&quot;text-xl font-semibold text-gray-900 mb-2&quot;>{benefit.title}</h3>
                <p className=&quot;text-gray-600&quot;>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-teal-600">
        <div className=&quot;max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center&quot;>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your School?
          </h2>
          <p className="text-xl text-teal-100 mb-8 max-w-3xl mx-auto">
            Join thousands of educational institutions already using our platform to streamline their operations and improve educational outcomes.
          </p>
          <div className=&quot;flex flex-col sm:flex-row gap-4 justify-center&quot;>
            <Link href=&quot;/auth/school-signup&quot;>
              <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
                Start Your Free Trial
              </Button>
            </Link>
            <Link href=&quot;/auth/signin&quot;>
              <Button size="lg" variant="outline" className="text-lg px-8 py-3 text-white border-white hover:bg-white hover:text-teal-600">
                Sign In to Your Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className=&quot;bg-gray-900 text-white py-12&quot;>
        <div className=&quot;max-w-7xl mx-auto px-4 sm:px-6 lg:px-8&quot;>
          <div className=&quot;grid grid-cols-1 md:grid-cols-4 gap-8&quot;>
            <div>
              <div className=&quot;flex items-center space-x-3 mb-4&quot;>
                <div className=&quot;w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center&quot;>
                  <School className=&quot;w-5 h-5 text-white&quot; />
                </div>
                <span className=&quot;text-xl font-bold&quot;>SchoolMS</span>
              </div>
              <p className="text-gray-400">
                Modern school management made simple and efficient.
              </p>
            </div>
            <div>
              <h3 className=&quot;text-lg font-semibold mb-4&quot;>Quick Access</h3>
              <ul className=&quot;space-y-2 text-gray-400&quot;>
                <li><Link href=&quot;/auth/signin&quot; className=&quot;hover:text-white&quot;>Login Portal</Link></li>
                <li><Link href=&quot;/auth/school-signup&quot; className=&quot;hover:text-white&quot;>School Registration</Link></li>
                <li><Link href=&quot;/auth/create-account&quot; className=&quot;hover:text-white&quot;>Create Account</Link></li>
                <li><Link href=&quot;/auth/signin&quot; className=&quot;hover:text-white&quot;>Login</Link></li>
              </ul>
            </div>
            <div>
              <h3 className=&quot;text-lg font-semibold mb-4&quot;>Features</h3>
              <ul className=&quot;space-y-2 text-gray-400&quot;>
                <li>User Management</li>
                <li>Academic Tracking</li>
                <li>Attendance System</li>
                <li>Communication Tools</li>
              </ul>
            </div>
            <div>
              <h3 className=&quot;text-lg font-semibold mb-4&quot;>Support</h3>
              <ul className=&quot;space-y-2 text-gray-400&quot;>
                <li>System Status</li>
                <li>Documentation</li>
                <li>Help Center</li>
                <li>Contact Support</li>
              </ul>
            </div>
          </div>
          <div className=&quot;border-t border-gray-800 mt-8 pt-8 text-center text-gray-400&quot;>
            <p>&copy; 2024 SchoolMS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
