import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import ScrollToTopButton from '../../components/ScrollToTopButton';

interface AdmissionDetails {
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  desiredProgram: string;
  applicationNumber: string;
  applicantImage: string;
  createdAt: string;
}

const AdmissionSuccess = () => {
  const [searchParams] = useSearchParams();
  const [admission, setAdmission] = useState<AdmissionDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAdmissionDetails = async () => {
      try {
        const id = searchParams.get('id');
        if (!id) {
          throw new Error('Admission ID not found');
        }

        const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admission/status/${id}`);
        setAdmission(data.data);
      } catch (err) {
        console.error('Error fetching admission details:', err);
        setError('Unable to load admission details');
      } finally {
        setLoading(false);
      }
    };

    fetchAdmissionDetails();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (error || !admission) {
    return (
      <>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full mx-auto p-8 bg-white rounded-lg shadow-lg text-center">
          <div className="text-secondary mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-noto font-bold text-dparacolor mb-4">Something went wrong</h2>
          <p className="text-gray-600 font-roboto mb-6">{error || 'Unable to load admission details'}</p>
          <Link
            to="/"
            className="inline-block bg-secondary font-sans text-white px-3 py-2 rounded-md font-medium hover:bg-primary transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
      <ScrollToTopButton />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="mx-auto h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="text-center mt-4">
              <p className="text-sm font-roboto text-dparacolor mb-2">Application Photo:</p>
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/${admission.applicantImage}`}
                alt="Applicant"
                className="w-32 h-32 rounded-lg object-cover mx-auto border"
              />
            </div>
            <h1 className="text-3xl font-bold font-noto text-primary mb-2">Admission Submitted Successfully!</h1>
            <p className="text-dparacolor font-roboto">
              Congratulations, {admission.firstName}! Your application has been successfully received.
            </p>
          </div>

          <div className="bg-blue-50 border-l-4 border-primary rounded-lg p-6 mb-8">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg 
                  className="h-6 w-6 text-primary" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                  />
                </svg>
              </div>
              <div className="ml-4">
             
                <h3 className="text-lg font-noto font-semibold text-primary mb-2">Next Steps</h3>
                <ul className="list-disc pl-4 space-y-2 text-dparacolor">
                  <li className='font-roboto'>
                    We've sent a confirmation email to <span className="font-medium">{admission.email}</span>. 
                    Please check your inbox <strong>(including spam folder)</strong>.
                  </li>
                  <li className='font-roboto'>
                    You'll receive your login credentials via email once your application 
                    has been reviewed and your interview process is completed.
                  </li>
                  <li className='font-roboto'>
                    Keep an eye on your email for updates regarding your interview schedule 
                    and further instructions.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium font-noto text-primary mb-2">Admission Details</h3>
                <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-roboto">Applicant</span>
                    <span className="text-dparacolor font-medium font-roboto">
                      {admission.firstName} {admission.lastName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-roboto">Application Number</span>
                    <span className="text-dparacolor font-medium font-roboto">{admission.applicationNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-roboto">Program</span>
                    <span className="text-dparacolor font-medium font-roboto">{admission.desiredProgram}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-roboto">Date Applied</span>
                    <span className="text-dparacolor font-medium">
                      {new Date(admission.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-center pt-6">
                <Link
                  to="/"
                  className="inline-block bg-secondary text-white px-3 py-2 rounded-md font-sans font-medium hover:bg-primary transition-colors"
                >
                  Go to Home Page
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmissionSuccess;