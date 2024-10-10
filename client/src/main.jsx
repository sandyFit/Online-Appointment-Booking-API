import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home.jsx';
import { Provider, useSelector } from 'react-redux';
import store from './redux/store.js';
import ProtectedRoutes from './routes/ProtectedRoutes.jsx';
import PublicRoute from './routes/PublicRoute.jsx';
import Dashboard from './components/ui/Dashboard.jsx';

// Create a Loader component to use useSelector inside
const Loader = () => {
  const { loading } = useSelector((state) => state.alerts);
  
  return (
    loading && (
      <div className="loader-parent">
        <div className="loader" role="status">
          <span className="sr-only">Loading ...</span>
        </div>
      </div>
    )
  );
};

const container = document.getElementById('root');
const root = createRoot(container); // Create the root once here

root.render(
  <Provider store={store}>
    <Router>
      <Loader /> {/* Add the Loader component here */}
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<ProtectedRoutes><Home /></ProtectedRoutes>} />
        </Route>
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
      </Routes>
    </Router>
  </Provider>
);
