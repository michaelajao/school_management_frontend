"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";


export default function PaymentPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState<string | null>(null);


  useEffect(() => {
    const emailFromQuery = searchParams.get("email"); // Get the email from query params
    if (emailFromQuery) {
      setEmail(emailFromQuery); // Store the email in the state
    } else {
      router.push('/auth/signup'); // Redirect to signup if email is not found
    }
  }, [searchParams, router]);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    toast.success("Payment Successful", {
        description: "Redirecting...",
      });
      
      setTimeout(() => {
        // Redirect to the onboarding admin page with the email as a parameter
        if (email) router.push(`/onboarding/admin?email=${encodeURIComponent(email)}`);
      }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <CardTitle>Mock Payment</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePayment} className="space-y-4">
            <div>
              <Label htmlFor="name">Name on Card</Label>
              <Input id="name" placeholder="Jane Doe" required />
            </div>
            <div>
              <Label htmlFor="card">Card Number</Label>
              <Input id="card" placeholder="1234 5678 9012 3456" required />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="expiry">Expiry</Label>
                <Input id="expiry" placeholder="MM/YY" required />
              </div>
              <div className="flex-1">
                <Label htmlFor="cvv">CVV</Label>
                <Input id="cvv" placeholder="123" required />
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Processing..." : "Pay Now"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
