import { useEffect } from 'react';

const storeReferralCode = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref');
    if (ref) {
      document.cookie = `referral=${ref}; path=/; max-age=${60 * 60 * 24 * 30}`; // expires in 30 days
    }
  }, []);
};

const getReferralCode = () => {
  const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith("referral="));
  return cookieValue?.split("=")[1] || null;
};

export { storeReferralCode, getReferralCode };

