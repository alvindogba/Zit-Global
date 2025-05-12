import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import ScrollToTop from './components/common/ScrollToTop';
import DefaultSkeletion from './components/DefaultSkeletion';

const Header = lazy(() => import('./components/Header'));
const Footer = lazy(() => import('./components/Footer/index'))


// Lazy load pages
const HomePage = lazy(() => import('./pages/HomePage'))
const DonationPage = lazy(() => import('./pages/Donationations/DonationPage'));
const DonationSuccess = lazy(() => import('./pages/Donationations/DonationSuccess'));
const PaypalDonationSuccess = lazy(() => import('./pages/Donationations/PaypalSucess'));
const StripMonthlyDonationSuccess= lazy(() => import('./pages/Donationations/StripMonthlySucess'));
const Admission = lazy(() => import('./pages/Admission/AdmissionPage'));
const HowToApply = lazy(() => import('./pages/Admission/HowToApply'));
const Motivation = lazy(() => import('./pages/MotivationPage'));
const Contact = lazy(() => import('./pages/ContactPage'));
const Courses = lazy(() => import('./pages/CoursesPage'))
const Cohort = lazy(() => import('./pages/CohortPage'))
const BeADonor = lazy(() => import('./pages/MakeImpact/BeADonor'))
const Mentorship = lazy(() => import('./pages/MakeImpact/Mentorship'))
const GetTutorShip = lazy(() => import('./pages/MakeImpact/Tutorship'))
const TeachingAtZit = lazy(() => import('./pages/MakeImpact/TeachingAtZit'))
const AdmissionSuccess = lazy(() => import('./pages/Admission/AdminssionSuccessPage'));
const GuidingHandingProgram = lazy(() => import('./pages/MakeImpact/GuidingHandingProgram'))
//Each course offer page
const Fullstack = lazy(() => import('./pages/CoursesDetails/FullStackDevelopment'))
const UIUXDesign = lazy(() => import('./pages/CoursesDetails/UIUXDesign'))
const GraphicDesign = lazy(() => import('./pages/CoursesDetails/GraphicDesign'))
const CyberSecurity = lazy(() => import('./pages/CoursesDetails/CyberSercurity'))
const MicrosoftOffice = lazy(() => import('./pages/CoursesDetails/MicrosoftOfficeDetailPage'))
const DatabaseAdmin = lazy(() => import('./pages/CoursesDetails/DatabaseAdminDetailPage'))

//form Models 
import StudentModel from './components/Models/StudentModel';
import ParentModel from './components/Models/ParentModel';
import AdministrationModel from './components/Models/AdministrationModel';
import MentorModel from './components/Models/MentorModel'
import TutorModel from './components/Models/TutorModel';
import TeacherModel from './components/Models/TeacherModel'
import MenteeModel from './components/Models/MenteeModel'
const IccSucessPage = lazy(() => import("./pages/IccSucessPage"))

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

function App() {
  return (
    <PayPalScriptProvider options={{
      clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
      currency: "USD",
      components: "buttons,funding-eligibility"
    }}>
      <Elements stripe={stripePromise}>
        <BrowserRouter>
          <Suspense fallback={<DefaultSkeletion />}>
            <div className="min-h-screen flex flex-col">
              <Header />
              
              <main className="flex-grow pt-20">
                <ScrollToTop />

                <Routes>
                <Route path="/" element={ <HomePage />}/>
                <Route path="/cohorts" element={<Cohort />}/>
                <Route path="/how-to-apply"element={<HowToApply />}/>
                <Route path="/courses"element={<Courses />}/>
                <Route path="/motivation" element={<Motivation />}/>
                <Route path="/impact-connect-center"element={<GuidingHandingProgram /> }/>
                <Route path="/mentorship-program" element={<Mentorship />}/>
                <Route path="/teaching-at-zit" element={<TeachingAtZit />}/>
                <Route path="/tutorship-program"element={<GetTutorShip />}/>
                <Route path="/be-a-donor" element={<BeADonor /> }/>
                <Route path="/admission"element={<Admission />} />
                <Route path="/admission-success" element={<AdmissionSuccess />}/>
                <Route path="/contact"element={ <Contact />}/>
                {/* The Donation route */}
                <Route path="/donate" element={<DonationPage />} />
                <Route path="/success" element={<DonationSuccess />}/>
                <Route path="/paypal-success" element={<PaypalDonationSuccess />}/>
                <Route path="/stripe-monthly-success" element={<StripMonthlyDonationSuccess />}/>
                {/* The Couses Page route */}
                <Route path="/courses/ui-ux-design"element={<UIUXDesign />}/>
                <Route path="/courses/graphic-design" element={<GraphicDesign />}/>
                <Route path="/courses/cybersecurity" element={<CyberSecurity />}/>
                <Route path="/courses/full-stack-development"element={<Fullstack />}/>
                <Route path="/courses/microsoft-office"element={<MicrosoftOffice />}/>
                <Route path="/courses/database-admin"element={<DatabaseAdmin />}/>
                
                {/* The impact and connect center route */}
                <Route path="/icc-student"element={<StudentModel />}/>
                <Route path="/icc/teacher"element={<TeacherModel />}/>
                <Route path="/icc/parent-guardian"element={<ParentModel />}/>
                <Route path="/icc/mentor"element={<MentorModel />}/>
                <Route path="/icc/tutor"element={<TutorModel />}/>
                <Route path="/icc/mentee"element={<MenteeModel />}/>
                <Route path="/icc/administration"element={<AdministrationModel />}/>
                <Route path='/icc-success'element={<IccSucessPage />} />

              </Routes>
              </main>

              <Footer />
            </div>
          </Suspense>
        </BrowserRouter>
      </Elements>
    </PayPalScriptProvider>
  );
}

export default App;




