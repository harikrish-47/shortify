import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import MyUrls from './pages/MyUrls';
import AdminAnalytics from './pages/AdminAnalytics';
import UsersManagement from './pages/UsersManagement';
import ProtectedRoute from './components/ProtectedRoute';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />

        <Route path="/my-urls" element={
          <ProtectedRoute>
            <MyUrls />
          </ProtectedRoute>
        } />

        {/* Admin Routes */}
        <Route path="/admin/analytics" element={
          <ProtectedRoute adminOnly={true}>
            <AdminAnalytics />
          </ProtectedRoute>
        } />

        <Route path="/admin/users" element={
          <ProtectedRoute adminOnly={true}>
            <UsersManagement />
          </ProtectedRoute>
        } />

        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
