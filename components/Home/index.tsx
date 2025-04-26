"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePricingStore } from "@/store/usePricingStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Added Card components
import { CheckCircle } from 'lucide-react'; // Example icon import

// Example Feature Icons (replace with actual icons or components)
const UserManagementIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1B5B5E]"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
const AttendanceIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1B5B5E]"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M9.5 14.5 12 17l4.5-4.5"/></svg>; // More relevant icon
const GradingIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1B5B5E]"><polygon points="14 2 18 6 7 17 3 17 3 13 14 2"/><line x1="3" y1="22" x2="21" y2="22"/></svg>; // More relevant icon
const CalendarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1B5B5E]"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /></svg>;
const CommunicationIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1B5B5E]"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>; // More relevant icon
const AnalyticsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1B5B5E]"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>; // More relevant icon

export default function HomeIndex() {
    const setSelectedPlan = usePricingStore((state) => state.setSelectedPlan);

    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        {/* Header */}
        <header className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
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
            {/* Optional: Add Login/Signup buttons here if needed */}
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#E0F2F2] via-white to-[#E0F2F2] py-24 md:py-32 overflow-hidden">
          {/* Subtle background elements (optional) */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#1B5B5E]/10 rounded-full filter blur-3xl opacity-50 -translate-x-16 -translate-y-16"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#D2E8E9]/20 rounded-full filter blur-3xl opacity-60 translate-x-16 translate-y-16"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 items-center gap-12">
              <div className="space-y-6 animate-fadeInUp">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#134345] leading-tight">
                  Modern School Management for Africa & Beyond
                </h1>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                  Streamline administration, enhance communication, and empower educators with SchoolMS. A comprehensive, user-friendly platform built for the unique needs of educational institutions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button size="lg" asChild className="bg-[#1B5B5E] text-white shadow-md hover:bg-[#134345] transition-all hover:shadow-lg transform hover:-translate-y-0.5 duration-300 px-8 py-3 text-base font-semibold">
                    <Link href="/auth/signup">Get Started Free</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild className="text-[#1B5B5E] border-[#1B5B5E] bg-white shadow-sm hover:bg-[#E0F2F2] hover:border-[#134345] hover:text-[#134345] transition-all duration-300 px-8 py-3 text-base font-semibold">
                    <Link href="#features">Explore Features</Link>
                  </Button>
                </div>
              </div>
              <div className="flex justify-center animate-fadeInRight">
                {/* Enhanced Dashboard Preview */}
                <div className="rounded-xl shadow-2xl bg-white p-2 w-full max-w-lg transform transition-all duration-500 hover:scale-[1.03]">
                  <div className="aspect-video bg-slate-100 rounded-lg flex items-center justify-center relative overflow-hidden border border-gray-200">
                    {/* Placeholder for a more dynamic image/graphic */}
                    <Image
                      src="/window.svg" // Consider a more engaging dashboard screenshot/graphic
                      alt="SchoolMS Dashboard Preview"
                      width={500}
                      height={300}
                      className="object-contain p-4 transition-transform duration-300 hover:scale-105"
                    />
                    {/* Example overlay elements */}
                    <div className="absolute top-4 left-4 bg-[#1B5B5E]/80 text-white text-xs px-2 py-1 rounded">Admin View</div>
                    <div className="absolute bottom-4 right-4 flex items-center gap-1 bg-white/80 px-2 py-1 rounded shadow-sm">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                      </span>
                      <span className="text-xs text-gray-700">Live Data</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 md:py-28 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#134345]">Everything You Need to Manage Your School</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                From student enrollment to performance analytics, SchoolMS provides a centralized hub for efficient school administration.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature Card - Reusable Structure */}
              {[ // Array of feature data
                { icon: <UserManagementIcon />, title: "User Management", description: "Role-based access for administrators, teachers, parents, and students." },
                { icon: <AttendanceIcon />, title: "Attendance Tracking", description: "Easily track attendance, generate reports, and notify parents automatically." },
                { icon: <GradingIcon />, title: "Grade Management", description: "Customizable assessments, grade calculations, and insightful progress reports." },
                { icon: <CalendarIcon />, title: "Calendar & Scheduling", description: "Centralized school-wide calendar for classes, events, exams, and deadlines." },
                { icon: <CommunicationIcon />, title: "Seamless Communication", description: "Integrated messaging for direct contact between staff, parents, and students." },
                { icon: <AnalyticsIcon />, title: "Performance Analytics", description: "Visualize student metrics, track progress, and identify areas for improvement." },
              ].map((feature, index) => (
                <div key={index} className="group bg-white rounded-xl p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-lg hover:border-[#D2E8E9] hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-lg bg-[#E0F2F2] flex items-center justify-center mb-5 transition-all duration-300 group-hover:bg-[#1B5B5E]/20 group-hover:scale-110">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-[#134345]">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-gray-100">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#134345]">Simple, Transparent Pricing</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Choose the plan that fits your school's needs and budget. Start free, upgrade anytime.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Freemium Plan */}
              <Card className="flex flex-col bg-white shadow-md border border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5">
                <CardHeader className="text-center pt-6 pb-4">
                  <CardTitle className="text-2xl font-semibold text-[#134345]">Freemium</CardTitle>
                  <p className="text-4xl font-bold text-[#1B5B5E] mt-3">Free</p>
                  <p className="text-sm text-gray-500 mt-1">Forever</p>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between px-6 pb-6">
                  <ul className="space-y-3 mb-8 text-sm">
                    {[ // Feature list
                      "Basic student management",
                      "Teacher management",
                      "Attendance tracking",
                      "Up to 100 students",
                      "Community support"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-auto bg-gray-100 text-[#1B5B5E] hover:bg-gray-200 transition-all duration-300 font-semibold" asChild onClick={() => setSelectedPlan("freemium")}>
                    <Link href="/auth/signup">Get Started</Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Standard Plan - Highlighted */}
              <Card className="flex flex-col bg-white shadow-xl border-2 border-[#1B5B5E] relative transform scale-[1.02] transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-fit px-4 py-1 bg-[#1B5B5E] text-white text-xs font-semibold rounded-full shadow-md">
                  Most Popular
                </div>
                <CardHeader className="text-center pt-8 pb-4">
                  <CardTitle className="text-2xl font-semibold text-[#134345]">Standard</CardTitle>
                  <p className="text-4xl font-bold text-[#1B5B5E] mt-3">$X<span className="text-base font-medium text-gray-500">/month</span></p>
                  <p className="text-sm text-gray-500 mt-1">Billed annually or monthly</p>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between px-6 pb-6">
                  <ul className="space-y-3 mb-8 text-sm">
                    {[ // Feature list
                      "Everything in Freemium",
                      "Parent communication portal",
                      "Comprehensive grading system",
                      "Timetable management",
                      "Unlimited students",
                      "Email support"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-auto bg-[#1B5B5E] text-white hover:bg-[#134345] transition-all duration-300 shadow-md hover:shadow-lg font-semibold" asChild onClick={() => setSelectedPlan("standard")}>
                    <Link href="/auth/signup">Choose Standard</Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Premium Plan */}
              <Card className="flex flex-col bg-white shadow-md border border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5">
                <CardHeader className="text-center pt-6 pb-4">
                  <CardTitle className="text-2xl font-semibold text-[#134345]">Premium</CardTitle>
                  <p className="text-4xl font-bold text-[#1B5B5E] mt-3">$X<span className="text-base font-medium text-gray-500">/month</span></p>
                  <p className="text-sm text-gray-500 mt-1">Billed annually or monthly</p>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between px-6 pb-6">
                  <ul className="space-y-3 mb-8 text-sm">
                    {[ // Feature list
                      "Everything in Standard",
                      "Advanced analytics & reports",
                      "EdTech integrations (LMS, etc.)",
                      "Online payment processing",
                      "Custom branding options",
                      "Priority support"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-auto bg-gray-100 text-[#1B5B5E] hover:bg-gray-200 transition-all duration-300 font-semibold" asChild onClick={() => setSelectedPlan("premium")}>
                    <Link href="/auth/signup">Choose Premium</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Africa Focus Section - Enhanced */}
        <section className="py-20 md:py-28 bg-[#1B5B5E]">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 items-center gap-12 lg:gap-16">
              <div className="space-y-6 order-2 lg:order-1">
                <h2 className="text-3xl md:text-4xl font-bold text-white">Built for the African Context</h2>
                <p className="text-lg text-white/90 leading-relaxed">
                  SchoolMS addresses the unique challenges of educational institutions in regions like Nigeria and Ghana, offering robust features designed for reliability and accessibility.
                </p>
                <ul className="space-y-5 pt-4">
                  {[ // Feature list
                    { title: "Offline Capabilities", description: "Handles intermittent internet with sync features.", icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/80"><path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3"/><circle cx="12" cy="10" r="3"/><circle cx="12" cy="12" r="10"/></svg> },
                    { title: "Local Payment Integration", description: "Supports mobile money and other regional payment methods.", icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/80"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg> },
                    { title: "Low-Bandwidth Optimized", description: "Ensures fast performance even on slower connections.", icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/80"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg> },
                    { title: "Multi-Language Support", description: "Includes local languages for enhanced accessibility.", icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/80"><path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/></svg> },
                  ].map((item, i) => (
                    // Wrap each item in an <li> tag
                    <li key={i} className="flex items-start gap-4 group">
                      <div className="flex-shrink-0 w-8 h-8 mt-1 rounded-full bg-white/10 flex items-center justify-center transition-colors duration-300 group-hover:bg-white/20">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-white text-lg transition-colors duration-300 group-hover:text-white">{item.title}</h4>
                        <p className="text-white/80 text-sm leading-relaxed mt-1">
                          {item.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="order-1 lg:order-2 flex justify-center items-center">
                {/* Replace with a more relevant graphic/image */}
                <div className="relative w-full max-w-md aspect-square">
                   <div className="absolute inset-0 bg-white/10 rounded-full animate-pulse opacity-30"></div>
                   <Image
                    src="/globe.svg" // Placeholder - Needs a better image representing Africa/Education
                    alt="African Education Focus Graphic"
                    width={300}
                    height={300}
                    className="relative z-10 w-3/4 h-3/4 mx-auto my-auto object-contain filter drop-shadow-lg text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gray-100 text-center py-20 md:py-28">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#134345] mb-6">Ready to Transform Your School?</h2>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
              Join hundreds of schools improving efficiency and student outcomes with SchoolMS. Start your free trial today – no credit card required.
            </p>
            <Button size="lg" className="bg-[#1B5B5E] text-white shadow-lg hover:bg-[#134345] transition-all duration-300 transform hover:scale-105 hover:shadow-xl px-10 py-3 text-lg font-semibold" asChild>
              <Link href="/auth/signup">Start Your Free Trial Now</Link>
            </Button>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-800 text-slate-400 py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-8">
              {/* Logo & Description */}
              <div className="col-span-2 lg:col-span-1">
                <Link href="/" className="flex items-center gap-2 mb-4">
                  <Image
                    src="/globe.svg" // Use a white/light version if available
                    alt="SchoolMS Logo"
                    width={24}
                    height={24}
                    className="filter brightness-0 invert"
                  />
                  <span className="font-bold text-xl text-white">SchoolMS</span>
                </Link>
                <p className="text-sm">
                  Modernizing school administration across Africa and beyond.
                </p>
              </div>

              {/* Product Links */}
              <div>
                <h4 className="font-semibold text-white mb-4 text-sm tracking-wider uppercase">Product</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="#features" className="hover:text-white transition-colors duration-200">Features</Link></li>
                  <li><Link href="#pricing" className="hover:text-white transition-colors duration-200">Pricing</Link></li>
                  {/* Add other relevant links */}
                </ul>
              </div>

              {/* Resources Links */}
              <div>
                <h4 className="font-semibold text-white mb-4 text-sm tracking-wider uppercase">Resources</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="#" className="hover:text-white transition-colors duration-200">Documentation</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors duration-200">Support</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors duration-200">Blog</Link></li>
                </ul>
              </div>

              {/* Company Links */}
              <div>
                <h4 className="font-semibold text-white mb-4 text-sm tracking-wider uppercase">Company</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="#" className="hover:text-white transition-colors duration-200">About Us</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors duration-200">Contact</Link></li>
                </ul>
              </div>

              {/* Legal Links */}
              <div>
                <h4 className="font-semibold text-white mb-4 text-sm tracking-wider uppercase">Legal</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors duration-200">Terms of Service</Link></li>
                </ul>
              </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-slate-700 mt-8 pt-8 text-sm text-center">
              © {new Date().getFullYear()} School Management System. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    );
  }