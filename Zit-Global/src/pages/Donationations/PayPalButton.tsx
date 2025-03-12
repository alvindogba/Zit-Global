import { PayPalButtons } from "@paypal/react-paypal-js";

interface PayPalButtonProps {
  amount: number;
  onSuccess?: (transactionId: string) => void;
  onError?: (error: string) => void;
}

const PayPalButton = ({ amount, onSuccess, onError }: PayPalButtonProps) => {
  return (
    <PayPalButtons
      style={{ layout: "vertical" }}
      createOrder={(data, actions) => {
        return actions.order.create({
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: {
                value: amount.toFixed(2),
                currency_code: "USD"
              }
            }
          ]
        });
      }}
      onApprove={async (data, actions) => {
        if (!actions.order) {
          onError?.("Failed to process PayPal payment");
          return;
        }

        try {
          const order = await actions.order.capture();
          if (order?.id) {
            onSuccess?.(order.id);
          } else {
            throw new Error("Failed to capture order");
          }
        } catch (err) {
          console.error("PayPal capture failed:", err);
          onError?.("Failed to process PayPal payment");
        }
      }}
      onError={(err) => {
        console.error("PayPal error:", err);
        onError?.("PayPal payment failed");
      }}
    />
  );
};

export default PayPalButton;
