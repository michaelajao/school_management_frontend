"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

type SuccessModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function SuccessModal({ open, onOpenChange }: SuccessModalProps) {
  const [count, setCount] = useState(3);
  const router = useRouter();

  useEffect(() => {
    if (!open) return;
    setCount(3);
    const timer = setInterval(() => {
      setCount((c) => c - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [open]);

  useEffect(() => {
    if (count === 0 && open) {
      onOpenChange(false);
      router.push("/onboarding/admin");
    }
  }, [count, open, onOpenChange, router]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="text-center">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-2">Success!</DialogTitle>
        </DialogHeader>
        <p className="mb-4">
          You will be redirected in <span className="font-semibold">{count}</span> second{count !== 1 && "s"}...
        </p>
      </DialogContent>
    </Dialog>
  );
}