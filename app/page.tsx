import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-bold text-xl">SchoolMS</span>
          </Link>
          <nav className="flex gap-4 items-center">
            <Link 
              href="/auth/signin" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Sign In
            </Link>
            <Button asChild className="bg-[#1B5B5E] hover:bg-[#1B5B5E]/90">
              <Link href="/auth/signup">Sign Up</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-slate-50 to-slate-100 py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
                School Management System for Africa and Beyond
              </h1>
              <p className="text-xl text-slate-600">
                A comprehensive, user-friendly platform designed to streamline educational administration in 
                Nigeria, Ghana, and globally. Enhance learning outcomes with our powerful school management solution.
              </p>
              <div className="flex gap-4 pt-4">
                <Button size="lg" asChild className="bg-[#1B5B5E] hover:bg-[#1B5B5E]/90">
                  <Link href="/auth/signup">Get Started</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="text-[#1B5B5E] border-[#1B5B5E] hover:bg-[#1B5B5E]/10">
                  <Link href="#features">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="lg:w-1/2 flex justify-center">
              <div className="rounded-lg shadow-xl bg-white p-4 md:p-8 w-full max-w-md">
                <div className="aspect-video bg-slate-100 mb-6 rounded-md flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#1B5B5E]">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">Role-Specific Dashboards</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-slate-700">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1B5B5E]">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    For Administrators
                  </li>
                  <li className="flex items-center gap-2 text-slate-700">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1B5B5E]">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    For Teachers
                  </li>
                  <li className="flex items-center gap-2 text-slate-700">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1B5B5E]">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    For Parents
                  </li>
                  <li className="flex items-center gap-2 text-slate-700">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1B5B5E]">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    For Students
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Comprehensive School Management</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our platform centralizes student and teacher data, automates attendance and grading, 
              facilitates parent engagement, and integrates seamless payment and donation options.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="w-12 h-12 rounded-full bg-[#1B5B5E]/10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1B5B5E]">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">User Management</h3>
              <p className="text-slate-600">
                Comprehensive user management system with role-based access control for administrators, teachers, parents, and students.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="w-12 h-12 rounded-full bg-[#1B5B5E]/10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1B5B5E]">
                  <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4" />
                  <path d="M3 15h18" />
                  <path d="M7 10v5" />
                  <path d="M17 10v5" />
                  <path d="M12 10v5" />
                  <path d="M3 10a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v0Z" />
                  <path d="M12 6V3" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Attendance Tracking</h3>
              <p className="text-slate-600">
                Easily track student attendance, generate reports, and send automated notifications to parents.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="w-12 h-12 rounded-full bg-[#1B5B5E]/10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1B5B5E]">
                  <path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h3.8a2 2 0 0 0 1.4-.6L12 4.6a2 2 0 0 1 1.4-.6H20a2 2 0 0 1 1.2.4" />
                  <path d="M12 10v6" />
                  <path d="m15 13-3 3-3-3" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Grade Management</h3>
              <p className="text-slate-600">
                Complete grading system with customizable assessment types, grade calculations, and progress reports.
              </p>
            </div>

            {/* Feature Card 4 */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="w-12 h-12 rounded-full bg-[#1B5B5E]/10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1B5B5E]">
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                  <line x1="16" x2="16" y1="2" y2="6" />
                  <line x1="8" x2="8" y1="2" y2="6" />
                  <line x1="3" x2="21" y1="10" y2="10" />
                  <path d="M8 14h.01" />
                  <path d="M12 14h.01" />
                  <path d="M16 14h.01" />
                  <path d="M8 18h.01" />
                  <path d="M12 18h.01" />
                  <path d="M16 18h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Calendar & Scheduling</h3>
              <p className="text-slate-600">
                School-wide calendar system for classes, events, exam schedules, and important dates.
              </p>
            </div>

            {/* Feature Card 5 */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="w-12 h-12 rounded-full bg-[#1B5B5E]/10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1B5B5E]">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Communication</h3>
              <p className="text-slate-600">
                Integrated messaging system for direct communication between teachers, parents, and administrators.
              </p>
            </div>

            {/* Feature Card 6 */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="w-12 h-12 rounded-full bg-[#1B5B5E]/10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1B5B5E]">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Performance Analytics</h3>
              <p className="text-slate-600">
                Visualize student performance metrics, track improvement, and identify areas needing attention.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Pricing Plans</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Choose the plan that works best for your school's size and needs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Freemium Plan */}
            <div className="bg-white rounded-lg p-6 shadow-md border border-slate-200">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold">Freemium</h3>
                <div className="mt-4 text-4xl font-bold">Free</div>
                <p className="text-sm text-slate-500 mt-2">Forever</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-slate-700">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1B5B5E]">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Basic student management
                </li>
                <li className="flex items-center gap-2 text-slate-700">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1B5B5E]">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Teacher management
                </li>
                <li className="flex items-center gap-2 text-slate-700">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1B5B5E]">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Attendance tracking
                </li>
                <li className="flex items-center gap-2 text-slate-700">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1B5B5E]">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Up to 100 students
                </li>
              </ul>
              <Button className="w-full bg-[#1B5B5E] hover:bg-[#1B5B5E]/90" asChild>
                <Link href="/auth/signup">Get Started</Link>
              </Button>
            </div>

            {/* Standard Plan */}
            <div className="bg-white rounded-lg p-6 shadow-xl border-2 border-[#1B5B5E] relative">
              <div className="absolute -top-4 left-0 right-0 mx-auto w-fit px-4 py-1 bg-[#1B5B5E] text-white text-sm font-medium rounded-full">
                Popular Choice
              </div>
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold">Standard</h3>
                <div className="mt-4 text-4xl font-bold">$X<span className="text-lg font-normal text-slate-500">/month</span></div>
                <p className="text-sm text-slate-500 mt-2">Billed annually or monthly</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-slate-700">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1B5B5E]">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Everything in Freemium
                </li>
                <li className="flex items-center gap-2 text-slate-700">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1B5B5E]">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Parent communication
                </li>
                <li className="flex items-center gap-2 text-slate-700">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1B5B5E]">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Comprehensive grading system
                </li>
                <li className="flex items-center gap-2 text-slate-700">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1B5B5E]">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Timetable management
                </li>
                <li className="flex items-center gap-2 text-slate-700">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1B5B5E]">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Unlimited students
                </li>
              </ul>
              <Button className="w-full bg-[#1B5B5E] hover:bg-[#1B5B5E]/90" asChild>
                <Link href="/auth/signup">Choose Standard</Link>
              </Button>
            </div>

            {/* Premium Plan */}
            <div className="bg-white rounded-lg p-6 shadow-md border border-slate-200">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold">Premium</h3>
                <div className="mt-4 text-4xl font-bold">$X<span className="text-lg font-normal text-slate-500">/month</span></div>
                <p className="text-sm text-slate-500 mt-2">Billed annually or monthly</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-slate-700">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1B5B5E]">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Everything in Standard
                </li>
                <li className="flex items-center gap-2 text-slate-700">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1B5B5E]">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Advanced analytics
                </li>
                <li className="flex items-center gap-2 text-slate-700">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1B5B5E]">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  EdTech integrations
                </li>
                <li className="flex items-center gap-2 text-slate-700">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1B5B5E]">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Donation/payment processing
                </li>
                <li className="flex items-center gap-2 text-slate-700">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1B5B5E]">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Priority support
                </li>
              </ul>
              <Button className="w-full bg-[#1B5B5E] hover:bg-[#1B5B5E]/90" asChild>
                <Link href="/auth/signup">Choose Premium</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Africa Focus Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="aspect-[4/3] bg-slate-100 rounded-lg overflow-hidden relative flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-[#1B5B5E]">
                  <path d="M3 7V5c0-1.1.9-2 2-2h2" />
                  <path d="M17 3h2c1.1 0 2 .9 2 2v2" />
                  <path d="M21 17v2c0 1.1-.9 2-2 2h-2" />
                  <path d="M7 21H5c-1.1 0-2-.9-2-2v-2" />
                  <path d="M8 7v10" />
                  <path d="M12 7v10" />
                  <path d="M17 11h-6" />
                  <path d="M11 15h6" />
                </svg>
                {/* Map of Africa could be placed here as an image */}
              </div>
            </div>
            <div className="lg:w-1/2 space-y-6">
              <h2 className="text-3xl font-bold">Designed for African Educational Needs</h2>
              <p className="text-lg text-slate-600">
                Our School Management System is tailored to meet the unique challenges and opportunities
                in Nigerian and Ghanaian educational institutions, with features designed to overcome
                infrastructure limitations and maximize educational outcomes.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1B5B5E] mt-1">
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  <div>
                    <span className="font-medium">Works offline</span>
                    <p className="text-slate-600 text-sm mt-1">
                      Handles intermittent internet connectivity with offline capabilities
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1B5B5E] mt-1">
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  <div>
                    <span className="font-medium">Multiple payment options</span>
                    <p className="text-slate-600 text-sm mt-1">
                      Support for local payment methods including mobile money
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1B5B5E] mt-1">
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  <div>
                    <span className="font-medium">Low-bandwidth optimized</span>
                    <p className="text-slate-600 text-sm mt-1">
                      Fast performance even with limited internet speeds
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1B5B5E] mt-1">
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  <div>
                    <span className="font-medium">Multi-language support</span>
                    <p className="text-slate-600 text-sm mt-1">
                      Supporting local languages for better accessibility
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Transform Your School's Administration Today</h2>
          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Join schools across Nigeria, Ghana, and worldwide using our platform to improve administration, 
            enhance teaching efficiency, and boost student outcomes.
          </p>
          <Button size="lg" className="bg-[#1B5B5E] hover:bg-[#1B5B5E]/90" asChild>
            <Link href="/auth/signup">Start Your Free Trial</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-slate-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-white text-lg mb-4">SchoolMS</h3>
              <p className="text-sm">
                A comprehensive school management system designed for educational institutions in Africa and beyond.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#features" className="hover:text-white">Features</Link></li>
                <li><Link href="#" className="hover:text-white">Pricing</Link></li>
                <li><Link href="#" className="hover:text-white">Testimonials</Link></li>
                <li><Link href="#" className="hover:text-white">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-white">Documentation</Link></li>
                <li><Link href="#" className="hover:text-white">Support</Link></li>
                <li><Link href="#" className="hover:text-white">Blog</Link></li>
                <li><Link href="#" className="hover:text-white">Webinars</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-white">About</Link></li>
                <li><Link href="#" className="hover:text-white">Careers</Link></li>
                <li><Link href="#" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-8 pt-8 text-sm text-center">
            © 2025 School Management System. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
