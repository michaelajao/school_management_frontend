"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DollarSign, TrendingUp, ArrowRight, GraduationCap, Users, IdCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PiPercentBold } from "react-icons/pi";
import { MetricCard } from "../shared/MetricCard";

export function FinanceSummary() {
  // Mock finance data
  const financialData = {
    expectedFees: 20000000, // ₦20M
    amountCollected: 12500000, // ₦12.5M
    outstandingBalance: 7500000, // ₦7.5M
    collectionPercentage: 62.5, // 62.5%
    monthlyProgress: [
      { month: "Jan", amount: 2500000 },
      { month: "Feb", amount: 4000000 },
      { month: "Mar", amount: 3000000 },
      { month: "Apr", amount: 3000000 },
    ]
  };

  // Format amount to Naira currency format
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(amount).replace('NGN', '₦');
  };

  // Calculate max value for the chart scaling
  const maxMonthlyAmount = Math.max(...financialData.monthlyProgress.map(item => item.amount));

  return (
    <Card className="col-span-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg font-medium flex items-center">
              <DollarSign className="h-5 w-5 mr-2 text-muted-foreground" />
              Finance & Fees Summary
            </CardTitle>
            <CardDescription>Current term fee collection progress</CardDescription>
          </div>
          <Button variant="outline" size="sm" className="h-8 text-xs">
            View Detailed Report
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-3">
          {/* Key financial figures */}
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Expected Fees (Term)</p>
              <p className="text-2xl font-bold">{formatCurrency(financialData.expectedFees)}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Amount Collected</p>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(financialData.amountCollected)}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Outstanding Balance</p>
              <p className="text-2xl font-bold text-orange-500">{formatCurrency(financialData.outstandingBalance)}</p>
            </div>
          </div>

          {/* Progress section */}
          <div className="md:col-span-2 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <p className="text-sm font-medium">Collection Progress</p>
                <p className="text-sm font-medium">{financialData.collectionPercentage}%</p>
              </div>
              <Progress value={financialData.collectionPercentage} className="h-2" />
            </div>

            {/* Simple Bar Chart */}
            <div className="pt-6">
              <p className="text-sm font-medium mb-4">Monthly Collection Trend</p>
              <div className="flex items-end justify-between h-32 gap-2">
                {financialData.monthlyProgress.map((item, index) => {
                  // Calculate height percentage based on max value
                  const heightPercentage = (item.amount / maxMonthlyAmount) * 100;
                  
                  return (
                    <div key={index} className="flex flex-col items-center">
                      <div className="flex flex-col items-center">
                        <span className="text-xs font-medium mb-1">
                          {formatCurrency(item.amount).replace('₦', '')}M
                        </span>
                        <div 
                          className="w-12 rounded-t-md bg-blue-500"
                          style={{ height: `${heightPercentage}%` }}
                        ></div>
                      </div>
                      <span className="text-xs mt-1">{item.month}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4 flex justify-between">
        <div className="flex items-center text-sm text-muted-foreground">
          <TrendingUp className="mr-1 h-4 w-4" />
          <span>Collection rate improved by 8% compared to last term</span>
        </div>
        <Button variant="link" size="sm" className="text-xs">
          Download Statement
        </Button>
      </CardFooter>
    </Card>
      // <div className="flex gap-4 justify-between bg-[#f7f7f7] p-4 mb-6">
      //     <SummaryCard
      //         icon={<GraduationCap className="text-cyan-700" />}
      //         value={1250}
      //         label="Total Students"
      //         textColor="#00787A"
      //         bgColor="#E6FBFF"
      //     />
      //     <SummaryCard
      //         icon={<Users className="text-orange-500" />}
      //         value={78}
      //         label="Total Staff"
      //         textColor="#F78C1F"
      //         bgColor="#FFE7CC"
      //     />
      //     <SummaryCard
      //         // icon={<span className="bg-[#28C76F33] bg-opacity-30 rounded-full p-2">
      //         //       <IdCard size={40} color="#28C76F"  />
      //         //       </span>}
      //         icon={<PiPercentBold className="text-[#00B266]-600" />}
      //         value="78%"
      //         label="Total Fee Paid"
      //         textColor="#00B266"
      //         bgColor="#DFF9E4"
      //     />
      //     <SummaryCard
      //         icon={<span className="bg-[#FFDDDE80] bg-opacity-60 rounded-full p-2"> 
      //               <IdCard size={40} color="#EF1A36" />
      //               </span>}
      //         // icon={<AlarmClock className="text-red-[#EF1A36]" />}
      //         value={5}
      //         label="Pending Approvals"
      //         textColor="#EF1A36"
      //         bgColor="#FFE6E6"
      //     />
      // </div>
  );
}