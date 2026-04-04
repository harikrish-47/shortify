import { Navigate } from 'react-router-dom';
import AuthService from '../services/auth.service';

const ProtectedRoute = ({ children, adminOnly = false }) => {
    const user = AuthService.getCurrentUser();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (adminOnly && !user.roles.includes('ROLE_ADMIN')) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default ProtectedRoute;
