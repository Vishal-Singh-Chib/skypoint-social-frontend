import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';

export default function LogoutPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = () => {
          googleLogout(); // <-- this clears the Google session
      localStorage.clear();
      window.location.href = "/login";
    };

    handleLogout();
  }, [navigate]);  

  return null; // or a spinner/message if you want
}
