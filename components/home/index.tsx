"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePricingStore } from "@/store/usePricingStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from 'lucide-react';

// Feature Icons
const UserManagementIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1B5B5E]"><path d=&quot;M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2&quot; /><circle cx=&quot;9&quot; cy=&quot;7&quot; r=&quot;4&quot; /><path d=&quot;M22 21v-2a4 4 0 0 0-3-3.87&quot; /><path d=&quot;M16 3.13a4 4 0 0 1 0 7.75&quot; /></svg>;
const AttendanceIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1B5B5E]"><path d=&quot;M8 2v4&quot;/><path d=&quot;M16 2v4&quot;/><rect width=&quot;18&quot; height=&quot;18&quot; x=&quot;3&quot; y=&quot;4&quot; rx=&quot;2&quot;/><path d=&quot;M3 10h18&quot;/><path d=&quot;M9.5 14.5 12 17l4.5-4.5&quot;/></svg>;
const GradingIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1B5B5E]"><polygon points=&quot;14 2 18 6 7 17 3 17 3 13 14 2&quot;/><line x1=&quot;3&quot; y1=&quot;22&quot; x2=&quot;21&quot; y2=&quot;22&quot;/></svg>;
const CalendarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1B5B5E]"><rect width=&quot;18&quot; height=&quot;18&quot; x=&quot;3&quot; y=&quot;4&quot; rx=&quot;2&quot; ry="2" /><line x1=&quot;16&quot; x2=&quot;16&quot; y1=&quot;2&quot; y2=&quot;6&quot; /><line x1=&quot;8&quot; x2=&quot;8&quot; y1=&quot;2&quot; y2=&quot;6&quot; /><line x1=&quot;3&quot; x2=&quot;21&quot; y1=&quot;10&quot; y2=&quot;10&quot; /></svg>;
const CommunicationIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1B5B5E]"><path d=&quot;M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z&quot;/></svg>;
const AnalyticsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1B5B5E]"><path d=&quot;M3 3v18h18&quot;/><path d=&quot;m19 9-5 5-4-4-3 3&quot;/></svg>;
const OfflineIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/80"><path d=&quot;M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z&quot;/><path d=&quot;m8 12 4 4 4-4&quot;/><path d=&quot;M12 8v8&quot;/></svg>;
const PaymentIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/80"><rect width=&quot;20&quot; height=&quot;14&quot; x=&quot;2&quot; y=&quot;5&quot; rx=&quot;2&quot;/><line x1=&quot;2&quot; y1=&quot;10&quot; x2=&quot;22&quot; y2=&quot;10&quot;/></svg>;
const BandwidthIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/80"><path d=&quot;M2 20h20&quot;/><path d=&quot;m5 16 7-8 7 8&quot;/></svg>;
const LanguageIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/80"><circle cx=&quot;12&quot; cy=&quot;12&quot; r=&quot;10&quot;/><path d=&quot;m2 12 20 0&quot;/><path d=&quot;M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z&quot;/></svg>;

// School Logo Component
const SchoolLogo = ({ number }: { number: number }) => (
  <div className=&quot;h-12 bg-white rounded shadow-sm opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition duration-300 mx-auto flex items-center justify-center w-full max-w-[150px] border border-gray-200&quot;>
    <div className=&quot;flex items-center space-x-2 px-3&quot;>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1B5B5E]">
        <path d=&quot;m2 3 20 9-20 9 5-9Z&quot;/>
      </svg>
      <span className=&quot;text-gray-700 text-sm font-medium&quot;>School {number}</span>
    </div>
  </div>
);

export default function HomeIndex() {
    const setSelectedPlan = usePricingStore((state) => state.setSelectedPlan);

    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        {/* Header */}
        <header className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
          <div className=&quot;container mx-auto flex h-16 items-center justify-between px-4&quot;>
            <Link href="/" className=&quot;flex items-center gap-2 transition-transform hover:scale-105&quot;>
              <Image 
                src="/globe.svg" 
                alt="SchoolMS Logo" 
                width={28} 
                height={28}
                className="text-[#1B5B5E]"
              />
              <span className=&quot;font-bold text-xl text-[#1B5B5E]&quot;>SchoolMS</span>
            </Link>
            <div className=&quot;hidden md:flex md:items-center md:space-x-8&quot;>
              <Link href="#features" className=&quot;text-gray-700 hover:text-[#1B5B5E] px-3 py-2 text-sm font-medium&quot;>Features</Link>
              <Link href="#how-it-works" className="text-gray-700 hover:text-[#1B5B5E] px-3 py-2 text-sm font-medium">How It Works</Link>
              <Link href="#pricing" className=&quot;text-gray-700 hover:text-[#1B5B5E] px-3 py-2 text-sm font-medium&quot;>Pricing</Link>
              <Link href="#testimonials" className="text-gray-700 hover:text-[#1B5B5E] px-3 py-2 text-sm font-medium">Testimonials</Link>
              <Link href="#contact" className=&quot;text-gray-700 hover:text-[#1B5B5E] px-3 py-2 text-sm font-medium&quot;>Contact</Link>
            </div>
            <div className=&quot;flex items-center&quot;>
              <Button asChild className=&quot;bg-[#1B5B5E] text-white shadow-md hover:bg-[#134345] transition-all&quot;>
                <Link href=&quot;/auth/signup&quot;>Get Started</Link>
              </Button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#1B5B5E]/30 via-[#1B5B5E]/20 to-[#E0F2F2] py-24 md:py-32 overflow-hidden">
          {/* Subtle background elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#1B5B5E]/10 rounded-full filter blur-3xl opacity-50 -translate-x-16 -translate-y-16"></div>
          <div className=&quot;absolute bottom-0 right-0 w-72 h-72 bg-[#D2E8E9]/20 rounded-full filter blur-3xl opacity-60 translate-x-16 translate-y-16&quot;></div>

          <div className=&quot;container mx-auto px-4 relative z-10&quot;>
            <div className=&quot;grid lg:grid-cols-2 items-center gap-12&quot;>
              <div className=&quot;space-y-6 animate-fadeInUp&quot;>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#134345] leading-tight">
                  Modern School Management for Africa & Beyond
                </h1>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                  Streamline administration, enhance communication, and empower educators with SchoolMS. A comprehensive, user-friendly platform built for the unique needs of educational institutions.
                </p>
                <div className=&quot;flex flex-col sm:flex-row gap-4 pt-4&quot;>
                  <Button size="lg" asChild className="bg-[#1B5B5E] text-white shadow-md hover:bg-[#134345] transition-all hover:shadow-lg transform hover:-translate-y-0.5 duration-300 px-8 py-3 text-base font-semibold">
                    <Link href=&quot;/auth/signup&quot;>Get Started Free</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild className="text-[#1B5B5E] border-[#1B5B5E] bg-white shadow-sm hover:bg-[#E0F2F2] hover:border-[#134345] hover:text-[#134345] transition-all duration-300 px-8 py-3 text-base font-semibold">
                    <Link href=&quot;#features&quot;>Explore Features</Link>
                  </Button>
                </div>
              </div>
              <div className=&quot;flex justify-center animate-fadeInRight&quot;>
                <div className=&quot;rounded-xl shadow-2xl bg-white p-2 w-full max-w-lg transform transition-all duration-500 hover:scale-[1.03]&quot;>
                  <div className="aspect-video bg-slate-100 rounded-lg flex items-center justify-center relative overflow-hidden border border-gray-200">
                    {/* Hero image from website.html */}
                    <Image
                      src="https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80"
                      alt="African students learning"
                      width={500}
                      height={300}
                      className="object-cover w-full h-full rounded-lg"
                      unoptimized
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trusted By Section */}
        <section className="bg-gray-50 py-12">
          <div className=&quot;container mx-auto px-4&quot;>
            <p className=&quot;text-center text-gray-500 mb-8&quot;>Trusted by schools across Africa</p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-center">
              {/* School logos using custom component */}
              {[1, 2, 3, 4, 5].map((num) => (
                <SchoolLogo key={num} number={num} />
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white">
          <div className=&quot;container mx-auto px-4&quot;>
            <div className=&quot;text-center mb-16 max-w-3xl mx-auto&quot;>
              <h2 className=&quot;text-3xl md:text-4xl font-bold mb-4 text-[#134345]&quot;>Everything You Need to Manage Your School</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                From student enrollment to performance analytics, SchoolMS provides a centralized hub for efficient school administration.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[ // Array of feature data
                { 
                  icon: <UserManagementIcon />, 
                  title: "Student Management", 
                  description: "Comprehensive student records, attendance tracking, and behavior monitoring tailored for African education systems.",
                  benefits: ["Offline-first capability", "Local language support", "Low-bandwidth optimized"] 
                },
                { 
                  icon: <GradingIcon />, 
                  title: "Academic Tools", 
                  description: "Lesson planning, gradebook, exam management, and curriculum tracking designed for African curricula.",
                  benefits: ["CBC/8-4-4 support", "Mobile report cards", "Automatic analytics"] 
                },
                { 
                  icon: <CommunicationIcon />, 
                  title: "Financial Management", 
                  description: "Fee collection, expense tracking, and financial reporting with mobile money integration for African markets.",
                  benefits: ["Mobile money integration", "Automated reminders", "Multi-currency support"] 
                },
              ].map((feature, index) => (
                <div key={index} className=&quot;group bg-white p-8 rounded-xl shadow-md border border-gray-100 transition duration-300 hover:shadow-lg hover:border-[#D2E8E9] hover:-translate-y-1&quot;>
                  <div className="w-16 h-16 rounded-full bg-[#E0F2F2] flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-[#1B5B5E]/20 group-hover:scale-110">
                    {feature.icon}
                  </div>
                  <h3 className=&quot;text-xl font-bold text-[#134345] mb-3&quot;>{feature.title}</h3>
                  <p className=&quot;text-gray-600 mb-4&quot;>{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, i) => (
                      <li key={i} className=&quot;flex items-center text-gray-600&quot;>
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

            </div>
            
            <div className=&quot;mt-12 text-center&quot;>
              <Link href="#" className="inline-flex items-center text-[#1B5B5E] font-medium hover:text-[#134345]">
                Explore all features
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                  <path d=&quot;M5 12h14&quot;></path>
                  <path d=&quot;m12 5 7 7-7 7&quot;></path>
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 bg-gray-50">
          <div className=&quot;container mx-auto px-4&quot;>
            <div className=&quot;lg:flex lg:items-center lg:justify-between&quot;>
              <div className=&quot;lg:w-1/2 mb-12 lg:mb-0&quot;>
                <h2 className=&quot;text-3xl font-bold text-[#134345] mb-6&quot;>Three Simple Steps</h2>
                <p className="text-lg text-gray-600 mb-6">Getting started with SchoolMS is easy and straightforward. Follow these three simple steps:</p>
                <div className="space-y-4">
                  {[ // Array of steps
                    {
                      num: 1,
                      title: "Sign Up",
                      description: "Create an account and provide basic information about your school."
                    },
                    {
                      num: 2,
                      title: "Set Up Your Profile",
                      description: "Fill in your school’s details, add staff and students, and configure settings."
                    },
                    {
                      num: 3,
                      title: "Go Live",
                      description: "Start using SchoolMS to manage your school operations effectively."
                    }
                  ].map((step) => (
                    <div key={step.num} className="flex">
                      <div className=&quot;flex-shrink-0&quot;>
                        <div className=&quot;flex items-center justify-center h-12 w-12 rounded-md bg-[#1B5B5E] text-white&quot;>
                          <span className=&quot;text-xl font-bold&quot;>{step.num}</span>
                        </div>
                      </div>
                      <div className=&quot;ml-4&quot;>
                        <h4 className=&quot;text-lg font-medium text-[#134345]&quot;>{step.title}</h4>
                        <p className=&quot;mt-2 text-gray-600&quot;>{step.description}</p>
                      </div>
                    </div>
                  ))}

                </div>
              </div>
              
              <div className=&quot;lg:w-1/2 lg:pl-12&quot;>
                <div className=&quot;bg-white p-6 rounded-xl shadow-lg border border-gray-200&quot;>
                  <div className="rounded-lg mb-6 bg-gray-200 aspect-video flex items-center justify-center overflow-hidden">
                    {/* How it works image from website.html */}
                    <Image
                      src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                      alt="Teacher using tablet"
                      width={400}
                      height={225}
                      className="object-cover w-full h-full"
                      unoptimized
                    />
                  </div>
                  <h3 className=&quot;text-xl font-bold text-[#134345] mb-3&quot;>See it in action</h3>
                  <p className="text-gray-600 mb-6">Watch how a school in Nigeria reduced administrative workload by 60% while improving parent engagement.</p>
                  <Link href="#" className="inline-flex items-center text-[#1B5B5E] font-medium hover:text-[#134345]">
                    Watch demo video
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                      <circle cx=&quot;12&quot; cy=&quot;12&quot; r=&quot;10&quot;></circle>
                      <polygon points=&quot;10 8 16 12 10 16 10 8&quot;></polygon>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-gray-100">
          <div className=&quot;container mx-auto px-4&quot;>
            <div className=&quot;text-center mb-16 max-w-3xl mx-auto&quot;>
              <h2 className=&quot;text-3xl md:text-4xl font-bold mb-4 text-[#134345]&quot;>Simple, Transparent Pricing</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Choose the plan that fits your school's needs and budget. Start free, upgrade anytime.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Freemium Plan */}
              <Card className="flex flex-col bg-white shadow-md border border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5">
                <CardHeader className=&quot;text-center pt-6 pb-4&quot;>
                  <CardTitle className=&quot;text-2xl font-semibold text-[#134345]&quot;>Freemium</CardTitle>
                  <p className=&quot;text-4xl font-bold text-[#1B5B5E] mt-3&quot;>Free</p>
                  <p className=&quot;text-sm text-gray-500 mt-1&quot;>Forever</p>
                </CardHeader>
                <CardContent className=&quot;flex-grow flex flex-col justify-between px-6 pb-6&quot;>
                  <ul className="space-y-3 mb-8 text-sm">
                    {[ // Feature list
                      "Basic student management",
                      "Teacher management",
                      "Attendance tracking",
                      "Up to 100 students",
                      "Community support"
                    ].map((item, i) => (
                      <li key={i} className=&quot;flex items-center gap-2 text-gray-700&quot;>
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-auto bg-gray-100 text-[#1B5B5E] hover:bg-gray-200 transition-all duration-300 font-semibold" asChild onClick={() => setSelectedPlan(&quot;freemium&quot;)}>
                    <Link href=&quot;/auth/signup&quot;>Get Started</Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Standard Plan - Highlighted */}
              <Card className="flex flex-col bg-white shadow-xl border-2 border-[#1B5B5E] relative transform scale-[1.02] transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5">
                <div className=&quot;absolute -top-4 left-1/2 transform -translate-x-1/2 w-fit px-4 py-1 bg-[#1B5B5E] text-white text-xs font-semibold rounded-full shadow-md&quot;>
                  Most Popular
                </div>
                <CardHeader className=&quot;text-center pt-8 pb-4&quot;>
                  <CardTitle className=&quot;text-2xl font-semibold text-[#134345]&quot;>Standard</CardTitle>
                  <p className=&quot;text-4xl font-bold text-[#1B5B5E] mt-3&quot;>$X<span className=&quot;text-base font-medium text-gray-500&quot;>/month</span></p>
                  <p className=&quot;text-sm text-gray-500 mt-1&quot;>Billed annually or monthly</p>
                </CardHeader>
                <CardContent className=&quot;flex-grow flex flex-col justify-between px-6 pb-6&quot;>
                  <ul className="space-y-3 mb-8 text-sm">
                    {[ // Feature list
                      "Everything in Freemium",
                      "Parent communication portal",
                      "Comprehensive grading system",
                      "Timetable management",
                      "Unlimited students",
                      "Email support"
                    ].map((item, i) => (
                      <li key={i} className=&quot;flex items-center gap-2 text-gray-700&quot;>
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-auto bg-[#1B5B5E] text-white hover:bg-[#134345] transition-all duration-300 shadow-md hover:shadow-lg font-semibold" asChild onClick={() => setSelectedPlan(&quot;standard&quot;)}>
                    <Link href=&quot;/auth/signup&quot;>Choose Standard</Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Premium Plan */}
              <Card className="flex flex-col bg-white shadow-md border border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5">
                <CardHeader className=&quot;text-center pt-6 pb-4&quot;>
                  <CardTitle className=&quot;text-2xl font-semibold text-[#134345]&quot;>Premium</CardTitle>
                  <p className=&quot;text-4xl font-bold text-[#1B5B5E] mt-3&quot;>$X<span className=&quot;text-base font-medium text-gray-500&quot;>/month</span></p>
                  <p className=&quot;text-sm text-gray-500 mt-1&quot;>Billed annually or monthly</p>
                </CardHeader>
                <CardContent className=&quot;flex-grow flex flex-col justify-between px-6 pb-6&quot;>
                  <ul className="space-y-3 mb-8 text-sm">
                    {[ // Feature list
                      "Everything in Standard",
                      "Advanced analytics & reports",
                      "EdTech integrations (LMS, etc.)",
                      "Online payment processing",
                      "Custom branding options",
                      "Priority support"
                    ].map((item, i) => (
                      <li key={i} className=&quot;flex items-center gap-2 text-gray-700&quot;>
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-auto bg-gray-100 text-[#1B5B5E] hover:bg-gray-200 transition-all duration-300 font-semibold" asChild onClick={() => setSelectedPlan(&quot;premium&quot;)}>
                    <Link href=&quot;/auth/signup&quot;>Choose Premium</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className=&quot;mt-12 bg-[#E0F2F2] rounded-lg p-6 max-w-4xl mx-auto&quot;>
              <div className=&quot;md:flex md:items-center md:justify-between&quot;>
                <div className=&quot;md:w-2/3&quot;>
                  <h3 className=&quot;text-lg font-medium text-[#134345]&quot;>Need a custom solution?</h3>
                  <p className="mt-2 text-gray-600">We offer special pricing for government partnerships and NGO initiatives across Africa.</p>
                </div>
                <div className=&quot;mt-4 md:mt-0&quot;>
                  <Button asChild className=&quot;bg-[#1B5B5E] text-white hover:bg-[#134345]&quot;>
                    <Link href="#contact">
                      Contact our team
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                        <rect width=&quot;20&quot; height=&quot;16&quot; x="2" y="4" rx="2"></rect>
                        <path d=&quot;m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7&quot;></path>
                      </svg>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 bg-gray-50">
          <div className=&quot;container mx-auto px-4&quot;>
            <div className=&quot;text-center mb-16 max-w-3xl mx-auto&quot;>
              <h2 className=&quot;text-3xl md:text-4xl font-bold mb-4 text-[#134345]&quot;>Trusted by African Educators</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">Schools across the continent are transforming their operations with SchoolMS.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[

                {
                  name: "Mrs. Amina Diallo",
                  role: "Principal, Dakar Academy",
                  image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
                  quote: "Since implementing SchoolMS, our administrative workload has decreased by 70%. The offline capabilities are perfect for our location with intermittent electricity and internet."
                },
                {
                  name: "Mr. Kwame Asante",
                  role: "Teacher, Accra Prep School",
                  image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
                  quote: "The mobile app has revolutionized parent-teacher communication. Even parents with basic smartphones can now track their child's progress in real-time."
                },
                {
                  name: "Dr. Ngozi Okonkwo",
                  role: "Administrator, Lagos Model School",
                  image: "https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
                  quote: "The financial modules with mobile money integration have helped us increase fee collection rates from 65% to 98% in just one term. A game-changer for African schools!"
                }
              ].map((testimonial, i) => (
                <div key={i} className=&quot;p-8 rounded-xl shadow-sm bg-gradient-to-br from-white to-gray-50&quot;>
                  <div className=&quot;flex items-center mb-6&quot;>
                    <div className=&quot;w-12 h-12 rounded-full overflow-hidden bg-[#E0F2F2] flex items-center justify-center&quot;>
                      <Image 
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                        unoptimized
                      />
                    </div>
                    <div className=&quot;ml-4&quot;>
                      <h4 className=&quot;font-medium text-[#134345]&quot;>{testimonial.name}</h4>
                      <p className=&quot;text-gray-600 text-sm&quot;>{testimonial.role}</p>
                    </div>
                  </div>
                  <p className=&quot;text-gray-700 italic mb-6&quot;>&quot;{testimonial.quote}&quot;</p>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="mr-1">
                        <polygon points=&quot;12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2&quot;></polygon>
                      </svg>
                    ))}
                  </div>
                </div>
              ))}

            </div>
            
            <div className=&quot;mt-12 text-center&quot;>
              <Button variant="outline" asChild className="border-gray-300 text-gray-700 hover:bg-gray-50">
                <Link href="#">
                  Read more success stories
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                    <path d=&quot;M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z&quot;></path>
                    <path d=&quot;M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z&quot;></path>
                  </svg>
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Africa Focus Section */}
        <section className="py-20 md:py-28 bg-[#1B5B5E]">
          <div className=&quot;container mx-auto px-4&quot;>
            <div className=&quot;grid lg:grid-cols-2 items-center gap-12 lg:gap-16&quot;>
              <div className=&quot;space-y-6 order-2 lg:order-1&quot;>
                <h2 className=&quot;text-3xl md:text-4xl font-bold text-white&quot;>Built for the African Context</h2>
                <p className="text-lg text-white/90 leading-relaxed">
                  SchoolMS addresses the unique challenges of educational institutions in regions like Nigeria and Ghana, offering robust features designed for reliability and accessibility.
                </p>
                <ul className="space-y-5 pt-4">
                  {[ // Feature list
                    { title: "Offline Capabilities", description: "Handles intermittent internet with sync features.", icon: <OfflineIcon /> },
                    { title: "Local Payment Integration", description: "Supports mobile money and other regional payment methods.", icon: <PaymentIcon /> },
                    { title: "Low-Bandwidth Optimized", description: "Ensures fast performance even on slower connections.", icon: <BandwidthIcon /> },
                    { title: "Multi-Language Support", description: "Includes local languages for enhanced accessibility.", icon: <LanguageIcon /> },
                  ].map((item, i) => (
                    <li key={i} className=&quot;flex items-start gap-4 group&quot;>
                      <div className="flex-shrink-0 w-8 h-8 mt-1 rounded-full bg-white/10 flex items-center justify-center transition-colors duration-300 group-hover:bg-white/20">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className=&quot;font-semibold text-white text-lg transition-colors duration-300 group-hover:text-white&quot;>{item.title}</h4>
                        <p className="text-white/80 text-sm leading-relaxed mt-1">
                          {item.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className=&quot;order-1 lg:order-2 flex justify-center items-center&quot;>
                <div className=&quot;relative w-full max-w-md aspect-square&quot;>
                   <div className=&quot;absolute inset-0 bg-white/10 rounded-full animate-pulse opacity-30&quot;></div>
                   <Image
                    src="/globe.svg"
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

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-white">
          <div className=&quot;container mx-auto px-4&quot;>
            <div className=&quot;lg:grid lg:grid-cols-2 lg:gap-8&quot;>
              <div className=&quot;mb-12 lg:mb-0&quot;>
                <h2 className=&quot;text-3xl font-bold text-[#134345] mb-6&quot;>We&apos;re here to help</h2>
                <p className="text-lg text-gray-600 mb-8">Our Africa-based support team understands the unique challenges facing schools on the continent.</p>
                
                <div className="space-y-6">
                  {[

                    {
                      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1B5B5E]"><rect width=&quot;20&quot; height=&quot;16&quot; x=&quot;2&quot; y=&quot;4&quot; rx=&quot;2&quot;></rect><path d=&quot;m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7&quot;></path></svg>,
                      title: "Email us",
                      details: ["support@schoolms.com"]
                    },
                    {
                      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1B5B5E]"><path d=&quot;M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z&quot;></path></svg>,
                      title: "Call us",
                      details: ["+254 700 123456 (Kenya)", "+234 800 1234567 (Nigeria)"]
                    },
                    {
                      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1B5B5E]"><path d=&quot;M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z&quot;></path><circle cx=&quot;12&quot; cy=&quot;10&quot; r=&quot;3&quot;></circle></svg>,
                      title: "Visit us",
                      details: ["Nairobi, Kenya", "Lagos, Nigeria"]
                    }
                  ].map((contact, i) => (
                    <div key={i} className=&quot;flex&quot;>
                      <div className="flex-shrink-0">
                        {contact.icon}
                      </div>
                      <div className=&quot;ml-4&quot;>
                        <h4 className=&quot;text-lg font-medium text-[#134345]&quot;>{contact.title}</h4>
                        {contact.details.map((detail, j) => (
                          <p key={j} className="mt-1 text-gray-600">{detail}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <div className=&quot;bg-white shadow-md rounded-lg p-6 border border-gray-200&quot;>
                  <h3 className=&quot;text-xl font-medium text-[#134345] mb-6&quot;>Send us a message</h3>
                  <form className=&quot;space-y-4&quot;>
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                      <input type="text" id="name" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1B5B5E] focus:border-[#1B5B5E]" placeholder="John Doe" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input type="email" id="email" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1B5B5E] focus:border-[#1B5B5E]" placeholder="you@example.com" />
                    </div>
                    <div>
                      <label htmlFor="school" className="block text-sm font-medium text-gray-700 mb-1">School Name</label>
                      <input type="text" id="school" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1B5B5E] focus:border-[#1B5B5E]" placeholder="Your School" />
                    </div>
                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                      <select id="country" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1B5B5E] focus:border-[#1B5B5E]">
                        <option>Select your country</option>
                        <option>Australia</option>
                        <option>Canada</option>
                        <option>Ghana</option>
                        <option>Kenya</option>
                        <option>Nigeria</option>
                        <option>South Africa</option>
                        <option>United Kingdom</option>
                        <option>United States</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                      <textarea id="message" rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1B5B5E] focus:border-[#1B5B5E]" placeholder="Tell us about your school's needs..."></textarea>
                    </div>
                    <Button type="submit" className="w-full bg-[#1B5B5E] text-white hover:bg-[#134345]">
                      Send Message
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                        <path d=&quot;m22 2-7 20-4-9-9-4Z&quot;></path>
                        <path d=&quot;M22 2 11 13&quot;></path>
                      </svg>
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gray-100 text-center py-20 md:py-28">
          <div className=&quot;container mx-auto px-4 max-w-3xl&quot;>
            <h2 className=&quot;text-3xl md:text-4xl font-bold text-[#134345] mb-6&quot;>Ready to Transform Your School?</h2>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
              Join hundreds of schools improving efficiency and student outcomes with SchoolMS. Start your free trial today – no credit card required.
            </p>
            <Button size="lg" className=&quot;bg-[#1B5B5E] text-white shadow-lg hover:bg-[#134345] transition-all duration-300 transform hover:scale-105 hover:shadow-xl px-10 py-3 text-lg font-semibold&quot; asChild>
              <Link href=&quot;/auth/signup&quot;>Start Your Free Trial Now</Link>
            </Button>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-800 text-slate-400 py-12">
          <div className=&quot;container mx-auto px-4&quot;>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-8">
              {/* Logo & Description */}
              <div className="col-span-2 lg:col-span-1">
                <Link href="/" className=&quot;flex items-center gap-2 mb-4&quot;>
                  <Image
                    src="/globe.svg"
                    alt="SchoolMS Logo"
                    width={24}
                    height={24}
                    className="filter brightness-0 invert"
                  />
                  <span className=&quot;font-bold text-xl text-white&quot;>SchoolMS</span>
                </Link>
                <p className="text-sm">
                  Modernizing school administration across Africa and beyond.
                </p>
              </div>

              {/* Product Links */}
              <div>
                <h4 className=&quot;font-semibold text-white mb-4 text-sm tracking-wider uppercase&quot;>Product</h4>
                <ul className=&quot;space-y-2 text-sm&quot;>
                  <li><Link href="#features" className=&quot;text-slate-400 hover:text-white transition-colors duration-200&quot;>Features</Link></li>
                  <li><Link href="#pricing" className=&quot;text-slate-400 hover:text-white transition-colors duration-200&quot;>Pricing</Link></li>
                  <li><Link href="#" className=&quot;text-slate-400 hover:text-white transition-colors duration-200&quot;>Demo</Link></li>
                </ul>
              </div>

              {/* Resources Links */}
              <div>
                <h4 className=&quot;font-semibold text-white mb-4 text-sm tracking-wider uppercase&quot;>Resources</h4>
                <ul className=&quot;space-y-2 text-sm&quot;>
                  <li><Link href="#" className=&quot;text-slate-400 hover:text-white transition-colors duration-200&quot;>Documentation</Link></li>
                  <li><Link href="#" className=&quot;text-slate-400 hover:text-white transition-colors duration-200&quot;>Support</Link></li>
                  <li><Link href="#" className=&quot;text-slate-400 hover:text-white transition-colors duration-200&quot;>Blog</Link></li>
                </ul>
              </div>

              {/* Company Links */}
              <div>
                <h4 className=&quot;font-semibold text-white mb-4 text-sm tracking-wider uppercase&quot;>Company</h4>
                <ul className=&quot;space-y-2 text-sm&quot;>
                  <li><Link href="#" className=&quot;text-slate-400 hover:text-white transition-colors duration-200&quot;>About Us</Link></li>
                  <li><Link href="#" className=&quot;text-slate-400 hover:text-white transition-colors duration-200&quot;>Contact</Link></li>
                </ul>
              </div>

              {/* Legal Links */}
              <div>
                <h4 className=&quot;font-semibold text-white mb-4 text-sm tracking-wider uppercase&quot;>Legal</h4>
                <ul className=&quot;space-y-2 text-sm&quot;>
                  <li><Link href="#" className=&quot;text-slate-400 hover:text-white transition-colors duration-200&quot;>Privacy Policy</Link></li>
                  <li><Link href="#" className=&quot;text-slate-400 hover:text-white transition-colors duration-200&quot;>Terms of Service</Link></li>
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