
import LandingSection from "./LandingSection";
import WhyDonate from "./WhyDonate"
import WaysToGive from "./WaysToGive"
import DonationForm from "./Form"
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe('pk_test_51QlCfNCGF0Nfp7XGSv4FGtuubZAOBVtK6A1GqEbMhsZH419dkaUL7WJdbjASc0vNTbe28wR73hmpiadQfeoI3RA500GxgtmAIJ');

const DonationPage = ()=>{
    return (
        <>
        <LandingSection />
        <WhyDonate />
        <WaysToGive />
        <Elements stripe={stripePromise}>
        <DonationForm />
        </Elements>
        </>
    )
}

export default DonationPage;