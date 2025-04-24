"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { usePricingStore } from "@/store/usePricingStore";

export default function PaymentPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { userEmail } = usePricingStore();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated && !userEmail) {
      router.push('/auth/signup');
    }
  }, [hydrated, userEmail, router]);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    toast.success("Payment Successful", {
      description: "Redirecting...",
    });

    setTimeout(() => {
      if (userEmail) router.push(`/onboarding/admin`);
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
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={userEmail || ""}
                readOnly
                className="bg-gray-100"
              />
            </div>
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
