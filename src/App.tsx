import React, { useEffect } from 'react';
import AppRouter from './router/AppRouter';
import 'react-toastify/dist/ReactToastify.css';
import MyToastContainer from './ui/MyToast/MyToastContainer';
import { Route, Routes, useNavigate } from 'react-router';
import AuthPage from './pages/auth';
import { useAuth } from './hooks/useAuth';

function App() {
  const navigate = useNavigate()
  const {user} = useAuth()

  useEffect(() => {
   if(user) {
    navigate('/contact')
   }
  }, [])

  return (
    <div className='app'>
      <AppRouter />
      <MyToastContainer />
    </div>
  );
}

export default App;
