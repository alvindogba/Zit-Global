import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import "@fontsource/roboto"; // Default Roboto font
import "@fontsource/noto-serif"; // Default Noto Serif
import "@fontsource/noto-serif/700.css"; // Noto Serif Bold for headings


// Load your Stripe publishable key safely
const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY

if (!stripePublicKey) {
  throw new Error("Missing Stripe public key. Please check your .env file.")
}

const stripePromise = loadStripe(stripePublicKey)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
  </StrictMode>
)
