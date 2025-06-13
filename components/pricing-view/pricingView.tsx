 
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePricingStore } from "@/store/usePricingStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Import Card components
import { Input } from "@/components/ui/input"; // Import Input
import { Label } from "@/components/ui/label"; // Import Label
import SuccessModal from "../modal/Successfulmodal";
import { useAuth } from "@/contexts/auth-context";
import { getDashboardPath } from "@/contexts/auth-context";
import { toast } from "sonner"; // Import toast

// PRICING_PLANS constant is removed as plan selection is done elsewhere

export default function PricingView() {
  const { selectedPlan, userEmail } = usePricingStore(); // Keep this to display selected plan/email
  const { user, loading: authLoading } = useAuth(); // Get user for role-based redirect
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // State for card details
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  useEffect(() => {
    setHydrated(true);
  }, []);

  // Redirect if plan/email missing or not authenticated
  useEffect(() => {
    if (hydrated && (!selectedPlan || !userEmail)) {
      toast.error("Please select a plan first.");
      router.push('/'); // Redirect to homepage where plans are selected
    }
    // Add auth check
    if (hydrated && !authLoading && !user) {
        toast.error("Please sign up or log in first.");
        router.push('/auth/signup');
    }
  }, [hydrated, selectedPlan, userEmail, authLoading, user, router]);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (!cardName || !cardNumber || !expiry || !cvv) {
      toast.error("Please fill in all card details.");
      return;
    }
    setLoading(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast.success("Payment Successful", {
      description: "Redirecting to onboarding...",
    });

    // Redirect based on user role
    setTimeout(() => {
      // Assuming 'admin' role corresponds to superadmin/school setup
      if (user?.role === 'school_admin' || user?.role === 'super_admin') {
        router.push(`/onboarding/admin`);
      } else {
        // Handle other roles or default redirect if needed
        router.push(user?.role ? getDashboardPath(user.role) : '/(users)/admin');
      }
    }, 1000);
  };

  // Show loading state while hydrating or auth context is resolving
  if (!hydrated || authLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#1B5B5E] py-16 px-4 flex items-center justify-center">
      {/* Removed Plan Selection Grid */}

      {/* Combined Order Summary and Payment Form */}
      <Card className="w-full max-w-lg shadow-xl bg-white">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-[#1B5B5E]">Complete Your Purchase</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePayment} className="space-y-6">
            {/* Order Summary Section */}
            <div className="mb-6 p-4 border rounded-lg bg-gray-50">
              <h3 className="text-lg font-semibold text-[#1B5B5E] mb-3">Order Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-md">
                  <span className="text-gray-600">Selected Plan:</span>
                  <span className="font-medium text-[#1B5B5E] capitalize">{selectedPlan || "None"}</span>
                </div>
                <div className="flex justify-between text-md">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium text-[#1B5B5E]">{userEmail || "Not provided"}</span>
                </div>
              </div>
            </div>

            {/* Payment Details Section */}
            <h3 className="text-lg font-semibold text-[#1B5B5E] mb-3">Payment Details</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-gray-700">Name on Card</Label>
                <Input id="name" placeholder="Jane Doe" required value={cardName} onChange={(e) => setCardName(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="card" className="text-gray-700">Card Number</Label>
                <Input id="card" placeholder="1234 5678 9012 3456" required value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label htmlFor="expiry" className="text-gray-700">Expiry</Label>
                  <Input id="expiry" placeholder="MM/YY" required value={expiry} onChange={(e) => setExpiry(e.target.value)} />
                </div>
                <div className="flex-1">
                  <Label htmlFor="cvv" className="text-gray-700">CVV</Label>
                  <Input id="cvv" placeholder="123" required value={cvv} onChange={(e) => setCvv(e.target.value)} />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#1B5B5E] hover:bg-[#1B5B5E]/90 text-white py-3 text-lg"
              disabled={loading || !selectedPlan || !userEmail || !user} // Also disable if user isn't loaded
            >
              {loading ? "Processing Payment..." : "Complete Payment"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* SuccessModal might still be useful for other scenarios, or can be removed if not needed */}
      <SuccessModal open={showModal} onOpenChange={setShowModal} />
    </div>
  );
}
