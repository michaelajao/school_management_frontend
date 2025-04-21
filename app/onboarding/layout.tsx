import Link from "next/link";
// import { Separator } from "@/components/ui/separator";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen ">
      <header className="border-b bg-white">
        <div className="container flex h-16 items-center justify-between px-4">
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
          </nav>
        </div>
      </header>
      <main className="container bg-[#008080] py-10 px-4">{children}</main>
      <footer className="border-t bg-white">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="text-sm text-muted-foreground">
            © 2025 School Management System
          </div>
          <div className="flex gap-4">
            <Link 
              href="/terms" 
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Terms
            </Link>
            <Link 
              href="/privacy" 
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}