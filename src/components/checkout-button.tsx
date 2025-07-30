"use client";

import { Button } from "@/components/ui/button";

interface CheckoutButtonProps {
  checkoutUrl: string;
}

export function CheckoutButton({ checkoutUrl }: CheckoutButtonProps) {
  const handleCheckout = () => {
    window.location.href = checkoutUrl;
  };

  return (
    <Button onClick={handleCheckout} className="w-full" size="lg">
      Upgrade to Premium
    </Button>
  );
} 