import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';


const SERVER_URL = import.meta.env.VITE_APP_SERVER_URL
const FRONTEND_URL = import.meta.env.VITE_APP_FRONTEND_URL

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    async function logout() {
      try {
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        
        const response = await axios.post(
            `${SERVER_URL}/api/user/logout`,
            {},
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `${Cookies.get('refreshToken')}`,
              },
            }
          );
        if (response.status === 200) {
          window.alert('Logged out successfully');
        } else {
          window.alert('Some error occurred, try again later');
        }
      } catch (error) {
        console.error('Logout error:', error);
        window.alert('Some error occurred, try again later');
      } finally {
        window.location.href = FRONTEND_URL
      }
    }

    logout();
  }, [navigate]);

  return null;
};

export {Logout};