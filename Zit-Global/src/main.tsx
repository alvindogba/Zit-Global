import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Load your Stripe publishable key
const stripePromise = loadStripe('pk_test_51QlCfNCGF0Nfp7XGSv4FGtuubZAOBVtK6A1GqEbMhsZH419dkaUL7WJdbjASc0vNTbe28wR73hmpiadQfeoI3RA500GxgtmAIJ');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
  </StrictMode>,
)





