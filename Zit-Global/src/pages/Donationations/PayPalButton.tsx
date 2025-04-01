import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useEffect, useState } from "react";

interface PayPalOrderResponse {
  id: string;
  status: string;
  payer?: {
    name?: { given_name?: string; surname?: string };
    email_address?: string;
  };
}

interface PayPalButtonProps {
  amount: number;
  currency?: string;
  onSuccess?: (transactionId: string) => void;
  onError?: (error: string) => void;
}

const PayPalButton = ({
  amount,
  currency = "USD",
  onSuccess,
  onError,
}: PayPalButtonProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [{ isPending }] = usePayPalScriptReducer();

  useEffect(() => {
    if (isNaN(amount) || amount <= 0) {
      onError?.("Invalid payment amount");
    }
  }, [amount]);

  if (isPending) return <div>Loading PayPal...</div>;

  return (
    <PayPalButtons
      style={{
        layout: "vertical",
        color: "gold",
        shape: "sharp",
        height: 45,
        label: "paypal",
      }}
      disabled={isProcessing}
      createOrder={(_data, actions) => {
        return actions.order.create({
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: {
                value: amount.toFixed(2),
                currency_code: currency,
              },
            },
          ],
        });
      }}
      onApprove={async (_data, actions) => {
        setIsProcessing(true);
        try {
          if (!actions.order) {
            throw new Error("PayPal order actions unavailable");
          }

          const order = await actions.order.capture() as PayPalOrderResponse;
          if (order?.id) {
            onSuccess?.(order.id);
          } else {
            throw new Error("Order capture failed");
          }
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : "Payment failed";
          onError?.(errorMessage);
        } finally {
          setIsProcessing(false);
        }
      }}
      onError={(err: Record<string, unknown>) => {
        const errorMessage = err.message?.toString() || "Unknown PayPal error";
        onError?.(errorMessage);
      }}
    />
  );
};

export default PayPalButton;