import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toastify CSS

// Lazy load components for better performance
const Home = lazy(() => import('./pages/Home/Home'));
const Products = lazy(() => import('./pages/Products/Products'));
const Contact = lazy(() => import('./pages/Contact/Contact'));
const Signup = lazy(() => import('./pages/Auths/Signup'));
const Login = lazy(() => import('./pages/Auths/Login'));

// Assuming ProtectedRoute is in the components folder
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      {/* Suspense for lazy loaded components */}
      <Suspense fallback={<div className="text-center mt-5">Loading...</div>}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* Protected routes */}
          {/* The screenshot shows a nested structure for /products,
              indicating it's a protected route. */}
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>

      {/* ToastContainer for displaying notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}

export default App;