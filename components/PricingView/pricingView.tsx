/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { usePricingStore } from "@/store/usePricingStore";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import SuccessModal from "../modal/Successfulmodal";

const PRICING_PLANS = [
  { key: "freemium", name: "Freemium", price: "Free", features: ["Basic features", "Community support"] },
  { key: "standard", name: "Standard", price: "$x/mo", features: ["All Freemium features", "Email support", "More storage"] },
  { key: "premium", name: "Premium", price: "$x/mo", features: ["All Standard features", "Priority support", "Unlimited storage"] },
] as const;

export default function PricingView() {
  const { selectedPlan, userEmail, setSelectedPlan } = usePricingStore();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-[#1B5B5E] py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Choose Your Plan</h1>
          <p className="text-[#D2E8E9] text-lg">Select the plan that works best for you</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {PRICING_PLANS.map((plan) => (
            <Card
              key={plan.key}
              className={`p-8 rounded-xl shadow-xl transition-all duration-300 ${
                selectedPlan === plan.key
                  ? "border-2 border-[#D2E8E9] transform scale-105"
                  : "border border-gray-200"
              }`}
            >
              <div className="flex flex-col h-full">
                <h3 className="text-2xl font-bold mb-4 text-[#1B5B5E]">{plan.name}</h3>
                <div className="text-3xl font-bold mb-6 text-[#1B5B5E]">{plan.price}</div>
                <ul className="mb-8 space-y-3 flex-grow">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center text-[#1B5B5E]">
                      <svg
                        className="w-5 h-5 mr-2 text-[#1B5B5E]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={selectedPlan === plan.key ? "default" : "outline"}
                  className="w-full mt-auto py-6 text-lg"
                  onClick={() => setSelectedPlan(plan.key as any)}
                  disabled={selectedPlan === plan.key}
                >
                  {selectedPlan === plan.key ? "Selected" : "Choose Plan"}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="bg-white rounded-xl p-8 max-w-2xl mx-auto shadow-lg">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#1B5B5E] mb-4">Order Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between text-lg">
                <span className="text-gray-600">Selected Plan:</span>
                <span className="font-semibold text-[#1B5B5E] capitalize">{selectedPlan || "None"}</span>
              </div>
              <div className="flex justify-between text-lg">
                <span className="text-gray-600">Email:</span>
                <span className="font-semibold text-[#1B5B5E]">{userEmail || "Not provided"}</span>
              </div>
            </div>
          </div>

            <Button
            className="w-full bg-[#1B5B5E] hover:bg-[#1B5B5E]/90 text-white py-6 text-lg"
            onClick={() => window.location.href = '/mockPayment'}
            disabled={!selectedPlan || !userEmail}
            >
            Proceed to Payment
            </Button>
        </div>
      </div>

      <SuccessModal open={showModal} onOpenChange={setShowModal} />
    </div>
  );
}