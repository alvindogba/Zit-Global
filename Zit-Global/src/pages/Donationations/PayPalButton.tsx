import { useEffect } from "react";

const PayPalButton = ({ amount }: { amount: number }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${import.meta.env.VITE_PAYPAL_CLIENT_ID}&currency=USD`;
    script.async = true;
    script.onload = () => {
      if (window.paypal) {
        window.paypal.Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [{ amount: { value: amount.toString() } }],
            });
          },
          onApprove: (data, actions) => {
            return actions.order.capture().then((details) => {
              console.log("Transaction completed by ", details.payer.name.given_name);
              // Here you can send transaction details to your backend
            });
          },
          onError: (err) => {
            console.error("PayPal Checkout Error: ", err);
          },
        }).render("#paypal-button-container");
      }
    };
    document.body.appendChild(script);
  }, [amount]);

  return <div id="paypal-button-container" className="mt-4"></div>;
};

export default PayPalButton;
