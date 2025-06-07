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
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
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
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center">
                <School className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">SchoolMS</h1>
                <p className="text-sm text-gray-500">Management System</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/auth/signin">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link href="/auth/school-signup">
                <Button className="bg-teal-600 hover:bg-teal-700">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Modern School
            <span className="text-teal-600"> Management</span>
            <br />Made Simple
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Streamline your educational institution with our comprehensive school management system. 
            From student enrollment to academic tracking, we've got everything covered.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/school-signup">
              <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-lg px-8 py-3">
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/auth/signin">
              <Button size="lg" variant="outline" className="text-lg px-8 py-3">
                View Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Manage Your School
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive platform provides all the tools necessary to run a modern educational institution efficiently.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-teal-600" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Built for Every Role in Education
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tailored experiences for administrators, teachers, students, and parents with role-specific dashboards and features.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {userTypes.map((userType, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 ${userType.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <userType.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{userType.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our School Management System?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your School?
          </h2>
          <p className="text-xl text-teal-100 mb-8 max-w-3xl mx-auto">
            Join thousands of educational institutions already using our platform to streamline their operations and improve educational outcomes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/school-signup">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
                Start Your Free Trial
              </Button>
            </Link>
            <Link href="/auth/signin">
              <Button size="lg" variant="outline" className="text-lg px-8 py-3 text-white border-white hover:bg-white hover:text-teal-600">
                Sign In to Your Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
                  <School className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">SchoolMS</span>
              </div>
              <p className="text-gray-400">
                Modern school management made simple and efficient.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Access</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/auth/signin" className="hover:text-white">Login Portal</Link></li>
                <li><Link href="/auth/school-signup" className="hover:text-white">School Registration</Link></li>
                <li><Link href="/auth/create-account" className="hover:text-white">Create Account</Link></li>
                <li><Link href="/auth/signin" className="hover:text-white">Login</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-gray-400">
                <li>User Management</li>
                <li>Academic Tracking</li>
                <li>Attendance System</li>
                <li>Communication Tools</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>System Status</li>
                <li>Documentation</li>
                <li>Help Center</li>
                <li>Contact Support</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 SchoolMS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
