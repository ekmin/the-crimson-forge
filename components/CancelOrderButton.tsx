"use client";

import { cancelOrder } from "../app/(store)/orders/actions";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

const CancelOrderButton = ({ orderId, disabled }: { orderId: string, disabled: boolean }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleCancel = () => {
    startTransition(async () => {
      await cancelOrder(orderId);
    });
    router.refresh(); 
  };

  return (
    <button
      onClick={handleCancel}
      disabled={isPending || disabled}
      className="button-secondary w-full mt-4 py-2 px-2 text-sm lg:text-base disabled:opacity-50 disabled:pointer-events-none"
    >
      {isPending ? "Canceling..." : "Cancel Order"}{disabled ? " (Already Canceled)" : ""}
    </button>
  );
}

export default CancelOrderButton;