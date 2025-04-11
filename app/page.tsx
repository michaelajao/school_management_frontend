import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105">
            <Image 
              src="/globe.svg" 
              alt="SchoolMS Logo" 
              width={28} 
              height={28}
              className="text-[#1B5B5E]"
            />
            <span className="font-bold text-xl text-[#1B5B5E]">SchoolMS</span>
          </Link>
          <nav className="flex gap-4 items-center">
            <Link 
              href="/auth/signin" 
              className="text-sm font-medium text-[#134345] hover:text-[#1B5B5E] transition-colors duration-200"
            >
              Sign In
            </Link>
            <Button asChild className="bg-[#1B5B5E] hover:bg-[#1B5B5E]/90 transition-all duration-300 hover:shadow-lg">
              <Link href="/auth/signup">Sign Up</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-slate-50 to-slate-100 py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 space-y-6 animate-fadeIn">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#0e1d1e]">
                School Management System for Africa and Beyond
              </h1>
              <p className="text-xl text-[#222f30]">
                A comprehensive, user-friendly platform designed to streamline educational administration in 
                Nigeria, Ghana, and globally. Enhance learning outcomes with our powerful school management solution.
              </p>
              <div className="flex gap-4 pt-4">
                <Button size="lg" asChild className="bg-[#1B5B5E] hover:bg-[#1B5B5E]/90 transition-all hover:shadow-lg hover:scale-105 duration-300">
                  <Link href="/auth/signup">Get Started</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="text-[#1B5B5E] border-[#1B5B5E] hover:bg-[#1B5B5E]/10 transition-all duration-300">
                  <Link href="#features">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="lg:w-1/2 flex justify-center">
              <div className="rounded-lg shadow-xl bg-white p-4 md:p-8 w-full max-w-md transform transition-all duration-500 hover:shadow-2xl hover:scale-[1.02]">
                <div className="aspect-video bg-slate-100 mb-6 rounded-md flex items-center justify-center relative overflow-hidden">
                  <Image 
                    src="/window.svg" 
                    alt="Dashboard Preview" 
                    width={300} 
                    height={180}
                    className="absolute inset-0 w-full h-full object-contain p-4 transition-transform hover:scale-105"
                  />
                </div>
                <h3 className="text-xl font-medium mb-2 text-[#134345]">Role-Specific Dashboards</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-[#2c3e40] hover:text-[#1B5B5E] transition-colors duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1B5B5E]">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    For Administrators
                  </li>
                  <li className="flex items-center gap-2 text-[#2c3e40] hover:text-[#1B5B5E] transition-colors duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1B5B5E]">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    For Teachers
                  </li>
                  <li className="flex items-center gap-2 text-[#2c3e40] hover:text-[#1B5B5E] transition-colors duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1B5B5E]">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    For Parents
                  </li>
                  <li className="flex items-center gap-2 text-[#2c3e40] hover:text-[#1B5B5E] transition-colors duration-200">
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
            <h2 className="text-3xl font-bold mb-4 text-[#0e1d1e]">Comprehensive School Management</h2>
            <p className="text-xl text-[#222f30] max-w-3xl mx-auto">
              Our platform centralizes student and teacher data, automates attendance and grading, 
              facilitates parent engagement, and integrates seamless payment and donation options.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <div className="bg-white rounded-lg p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="w-12 h-12 rounded-full bg-[#1B5B5E]/10 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1B5B5E]">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#134345]">User Management</h3>
              <p className="text-[#2c3e40]">
                Comprehensive user management system with role-based access control for administrators, teachers, parents, and students.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="bg-white rounded-lg p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="w-12 h-12 rounded-full bg-[#1B5B5E]/10 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
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
              <h3 className="text-xl font-semibold mb-2 text-[#134345]">Attendance Tracking</h3>
              <p className="text-[#2c3e40]">
                Easily track student attendance, generate reports, and send automated notifications to parents.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="bg-white rounded-lg p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="w-12 h-12 rounded-full bg-[#1B5B5E]/10 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1B5B5E]">
                  <path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h3.8a2 2 0 0 0 1.4-.6L12 4.6a2 2 0 0 1 1.4-.6H20a2 2 0 0 1 1.2.4" />
                  <path d="M12 10v6" />
                  <path d="m15 13-3 3-3-3" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#134345]">Grade Management</h3>
              <p className="text-[#2c3e40]">
                Complete grading system with customizable assessment types, grade calculations, and progress reports.
              </p>
            </div>

            {/* Feature Card 4 */}
            <div className="bg-white rounded-lg p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="w-12 h-12 rounded-full bg-[#1B5B5E]/10 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
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
              <h3 className="text-xl font-semibold mb-2 text-[#134345]">Calendar & Scheduling</h3>
              <p className="text-[#2c3e40]">
                School-wide calendar system for classes, events, exam schedules, and important dates.
              </p>
            </div>

            {/* Feature Card 5 */}
            <div className="bg-white rounded-lg p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="w-12 h-12 rounded-full bg-[#1B5B5E]/10 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1B5B5E]">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#134345]">Communication</h3>
              <p className="text-[#2c3e40]">
                Integrated messaging system for direct communication between teachers, parents, and administrators.
              </p>
            </div>

            {/* Feature Card 6 */}
            <div className="bg-white rounded-lg p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="w-12 h-12 rounded-full bg-[#1B5B5E]/10 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1B5B5E]">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#134345]">Performance Analytics</h3>
              <p className="text-[#2c3e40]">
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
            <h2 className="text-3xl font-bold mb-4 text-[#0e1d1e]">Pricing Plans</h2>
            <p className="text-xl text-[#222f30] max-w-3xl mx-auto">
              Choose the plan that works best for your school's size and needs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Freemium Plan */}
            <div className="bg-white rounded-lg p-6 shadow-md border border-slate-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-[#134345]">Freemium</h3>
                <div className="mt-4 text-4xl font-bold text-[#1B5B5E]">Free</div>
                <p className="text-sm text-[#2c3e40] mt-2">Forever</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-[#2c3e40] hover:text-[#134345] transition-colors duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1B5B5E]">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Basic student management
                </li>
                <li className="flex items-center gap-2 text-[#2c3e40] hover:text-[#134345] transition-colors duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1B5B5E]">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Teacher management
                </li>
                <li className="flex items-center gap-2 text-[#2c3e40] hover:text-[#134345] transition-colors duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1B5B5E]">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Attendance tracking
                </li>
                <li className="flex items-center gap-2 text-[#2c3e40] hover:text-[#134345] transition-colors duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1B5B5E]">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Up to 100 students
                </li>
              </ul>
              <Button className="w-full bg-[#1B5B5E] hover:bg-[#1B5B5E]/90 transition-all duration-300 hover:shadow-lg hover:scale-105" asChild>
                <Link href="/auth/signup">Get Started</Link>
              </Button>
            </div>

            {/* Standard Plan */}
            <div className="bg-white rounded-lg p-6 shadow-xl border-2 border-[#1B5B5E] relative transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:scale-105">
              <div className="absolute -top-4 left-0 right-0 mx-auto w-fit px-4 py-1 bg-[#1B5B5E] text-white text-sm font-medium rounded-full animate-pulse">
                Popular Choice
              </div>
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-[#134345]">Standard</h3>
                <div className="mt-4 text-4xl font-bold text-[#1B5B5E]">$X<span className="text-lg font-normal text-[#2c3e40]">/month</span></div>
                <p className="text-sm text-[#2c3e40] mt-2">Billed annually or monthly</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-[#2c3e40] hover:text-[#134345] transition-colors duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1B5B5E]">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Everything in Freemium
                </li>
                <li className="flex items-center gap-2 text-[#2c3e40] hover:text-[#134345] transition-colors duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1B5B5E]">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Parent communication
                </li>
                <li className="flex items-center gap-2 text-[#2c3e40] hover:text-[#134345] transition-colors duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1B5B5E]">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Comprehensive grading system
                </li>
                <li className="flex items-center gap-2 text-[#2c3e40] hover:text-[#134345] transition-colors duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1B5B5E]">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Timetable management
                </li>
                <li className="flex items-center gap-2 text-[#2c3e40] hover:text-[#134345] transition-colors duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1B5B5E]">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Unlimited students
                </li>
              </ul>
              <Button className="w-full bg-[#1B5B5E] hover:bg-[#1B5B5E]/90 transition-all duration-300 hover:shadow-lg hover:scale-105" asChild>
                <Link href="/auth/signup">Choose Standard</Link>
              </Button>
            </div>

            {/* Premium Plan */}
            <div className="bg-white rounded-lg p-6 shadow-md border border-slate-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-[#134345]">Premium</h3>
                <div className="mt-4 text-4xl font-bold text-[#1B5B5E]">$X<span className="text-lg font-normal text-[#2c3e40]">/month</span></div>
                <p className="text-sm text-[#2c3e40] mt-2">Billed annually or monthly</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-[#2c3e40] hover:text-[#134345] transition-colors duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1B5B5E]">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Everything in Standard
                </li>
                <li className="flex items-center gap-2 text-[#2c3e40] hover:text-[#134345] transition-colors duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1B5B5E]">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Advanced analytics
                </li>
                <li className="flex items-center gap-2 text-[#2c3e40] hover:text-[#134345] transition-colors duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1B5B5E]">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  EdTech integrations
                </li>
                <li className="flex items-center gap-2 text-[#2c3e40] hover:text-[#134345] transition-colors duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1B5B5E]">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Donation/payment processing
                </li>
                <li className="flex items-center gap-2 text-[#2c3e40] hover:text-[#134345] transition-colors duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1B5B5E]">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Priority support
                </li>
              </ul>
              <Button className="w-full bg-[#1B5B5E] hover:bg-[#1B5B5E]/90 transition-all duration-300 hover:shadow-lg hover:scale-105" asChild>
                <Link href="/auth/signup">Choose Premium</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Africa Focus Section */}
      <section className="py-20 bg-[#1B5B5E]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="aspect-[4/3] bg-white/10 rounded-lg overflow-hidden relative flex items-center justify-center transition-all duration-500 hover:shadow-xl hover:scale-[1.02]">
                <Image 
                  src="/globe.svg" 
                  alt="African Education Focus" 
                  width={400} 
                  height={300}
                  className="absolute inset-0 w-full h-full object-contain p-8 transition-transform hover:scale-105 animate-pulse text-white"
                />
              </div>
            </div>
            <div className="lg:w-1/2 space-y-6">
              <h2 className="text-3xl font-bold text-white">Designed for African Educational Needs</h2>
              <p className="text-lg text-white/90">
                Our School Management System is tailored to meet the unique challenges and opportunities
                in Nigerian and Ghanaian educational institutions, with features designed to overcome
                infrastructure limitations and maximize educational outcomes.
              </p>
              <ul className="space-y-5">
                <li className="flex items-start gap-3 hover:translate-x-1 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white mt-1">
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  <div>
                    <span className="font-medium text-white">Works offline</span>
                    <p className="text-white/90 mt-1">
                      Handles intermittent internet connectivity with offline capabilities
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3 hover:translate-x-1 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white mt-1">
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  <div>
                    <span className="font-medium text-white">Multiple payment options</span>
                    <p className="text-white/90 mt-1">
                      Support for local payment methods including mobile money
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3 hover:translate-x-1 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white mt-1">
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  <div>
                    <span className="font-medium text-white">Low-bandwidth optimized</span>
                    <p className="text-white/90 mt-1">
                      Fast performance even with limited internet speeds
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3 hover:translate-x-1 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white mt-1">
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  <div>
                    <span className="font-medium text-white">Multi-language support</span>
                    <p className="text-white/90 mt-1">
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
          <h2 className="text-3xl font-bold mb-6 transition-all duration-700 hover:scale-105">Transform Your School's Administration Today</h2>
          <p className="text-xl text-slate-100 mb-8 max-w-3xl mx-auto">
            Join schools across Nigeria, Ghana, and worldwide using our platform to improve administration, 
            enhance teaching efficiency, and boost student outcomes.
          </p>
          <Button size="lg" className="bg-[#1B5B5E] hover:bg-[#1B5B5E]/90 transition-all duration-300 hover:shadow-lg hover:scale-110 hover:shadow-[#1B5B5E]/20" asChild>
            <Link href="/auth/signup">Start Your Free Trial</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-slate-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-white text-lg mb-4 flex items-center gap-2">
                <Image 
                  src="/globe.svg" 
                  alt="SchoolMS Logo" 
                  width={24} 
                  height={24}
                  className="text-white"
                />
                SchoolMS
              </h3>
              <p className="text-slate-200 text-sm">
                A comprehensive school management system designed for educational institutions in Africa and beyond.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-slate-200 text-sm">
                <li><Link href="#features" className="hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block">Features</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block">Pricing</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block">Testimonials</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Resources</h4>
              <ul className="space-y-2 text-slate-200 text-sm">
                <li><Link href="#" className="hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block">Documentation</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block">Support</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block">Blog</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block">Webinars</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-slate-200 text-sm">
                <li><Link href="#" className="hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block">About</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block">Careers</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-8 pt-8 text-sm text-center text-slate-200">
            © 2025 School Management System. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
