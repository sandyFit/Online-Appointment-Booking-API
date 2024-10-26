import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginUser from './pages/LoginUser';
import RegisterUser from './pages/RegisterUser';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home.jsx';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import ProtectedRoutes from './routes/ProtectedRoutes.jsx';
import PublicRoute from './routes/PublicRoute.jsx';
import Dashboard from './components/ui/Dashboard.jsx';
import Loader from './components/ui/Loader.jsx'; // Assuming you moved Loader to a separate component
import RegisterDoc from './pages/RegisterDoc.jsx';
import RegisterPatient from './pages/RegisterPatient.jsx';
import ManageDoctors from './pages/ManageDoctors.jsx';
import ManagePatients from './pages/ManagePatients.jsx';

const container = document.getElementById('root');
const root = createRoot(container); // Create the root once here

root.render(
  <Provider store={store}>
    <Router>
      <Toaster position="top-center" reverseOrder={false} />
      <Loader />
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<ProtectedRoutes><Home /></ProtectedRoutes>} />
          <Route path='/register-doctor' element={<ProtectedRoutes><RegisterDoc /></ProtectedRoutes>} />
          <Route path='/manage-doctors' element={<ProtectedRoutes><ManageDoctors /></ProtectedRoutes>} />
          <Route path='/register-patient' element={<ProtectedRoutes><RegisterPatient /></ProtectedRoutes>} />
          <Route path='/manage-patients' element={<ProtectedRoutes><ManagePatients /></ProtectedRoutes>} />
        </Route>
        <Route path="/login" element={<PublicRoute><LoginUser /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><RegisterUser /></PublicRoute>} />
      </Routes>
    </Router>
  </Provider>
);
