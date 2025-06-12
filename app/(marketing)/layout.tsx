import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "School Management System",
  description: "Comprehensive school management solution for modern educational institutions",
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Marketing-specific layout elements could go here */}
      <main>{children}</main>
    </div>
  );
}