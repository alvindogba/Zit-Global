import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const SuccessPage = () => {
  const { state } = useLocation();
  console.log(state)
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to home after 10 seconds
    const timer = setTimeout(() => {
      navigate('/');
    }, 50000);

    return () => clearTimeout(timer);
  }, [navigate]);

  if (!state || !state.student) {
    return <p>No student data available.</p>;
  }

  const { student } = state;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
    <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
      <div className="text-center">
        <svg
          className="mx-auto h-16 w-16 text-primary"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m0 0l-4-4m4 4H7"
          />
        </svg>
        <h1 className="text-2xl font-bold text-primary mt-4">
          Registration Successful!
        </h1>
        <p className="mt-2 text-gray-600">
          Thank you, <span className="font-medium">{student.fullName}</span>,
          for registering for our Tutoring Program.
        </p>
        <p className="mt-2 text-gray-600">
          A confirmation email has been sent to{' '}
          <span className="font-medium">{student.email}</span> for futher instructions.
        </p>
        {/* Additional student details can be displayed here */}
      </div>
    </div>
  </div>
  );
};

export default SuccessPage;
