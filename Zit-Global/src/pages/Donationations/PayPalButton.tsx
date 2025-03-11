import { useEffect } from "react";
import { PayPalNamespace } from "@paypal/paypal-js";

interface PayPalButtonProps {
  amount: number;
  onSuccess?: (transactionId: string) => void;
  onError?: (error: string) => void;
}

const PayPalButton = ({ amount, onSuccess, onError }: PayPalButtonProps) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${import.meta.env.VITE_PAYPAL_CLIENT_ID}&currency=USD`;
    script.async = true;
    script.onload = () => {
      const paypal = (window as any).paypal as PayPalNamespace;
      if (!paypal?.Buttons) {
        const error = "PayPal SDK failed to load";
        console.error(error);
        onError?.(error);
        return;
      }

      try {
        paypal.Buttons({
          createOrder: (data, actions) => {
            if (!actions.order) {
              const error = "PayPal actions not available";
              onError?.(error);
              throw new Error(error);
            }
            return actions.order.create({
              intent: "CAPTURE",
              purchase_units: [{ 
                amount: { 
                  value: amount.toFixed(2),
                  currency_code: "USD"
                } 
              }],
            });
          },
          onApprove: (data, actions) => {
            if (!actions.order) {
              const error = "PayPal actions not available";
              console.error(error);
              onError?.(error);
              return Promise.reject(error);
            }
            return actions.order.capture().then((details) => {
              const transactionId = details.id;
              if (transactionId) {
                onSuccess?.(transactionId);
              } else {
                const error = "Failed to get transaction ID from PayPal";
                onError?.(error);
              }
            });
          },
          onError: (err) => {
            const error = "PayPal Checkout Error: " + (err.message || String(err));
            console.error(error);
            onError?.(error);
          },
        }).render("#paypal-button-container");
      } catch (error) {
        const errorMsg = "Failed to render PayPal buttons: " + String(error);
        console.error(errorMsg);
        onError?.(errorMsg);
      }
    };

    document.body.appendChild(script);

    return () => {
      const container = document.getElementById("paypal-button-container");
      if (container) {
        container.innerHTML = "";
      }
      // Also remove the script tag
      const paypalScript = document.querySelector(`script[src*="paypal.com/sdk/js"]`);
      if (paypalScript) {
        paypalScript.remove();
      }
    };
  }, [amount, onSuccess, onError]);

  return <div id="paypal-button-container" className="mt-4"></div>;
};

export default PayPalButton;