import { NavLink, useNavigate } from 'react-router-dom';
import { Home, Link as LinkIcon, Users, Settings, LogOut, BarChart2 } from 'lucide-react';
import AuthService from '../services/auth.service';

const Sidebar = () => {
    const navigate = useNavigate();
    const user = AuthService.getCurrentUser();
    const isAdmin = user?.roles.includes('ROLE_ADMIN');

    const handleLogout = () => {
        AuthService.logout();
        navigate('/login');
    };

    return (
        <aside className="sidebar">
            <div className="sidebar-logo">
                <LinkIcon className="logo-icon" />
                <span className="logo-text" style={{ color: 'white' }}>Shortify</span>
            </div>

            <nav className="sidebar-nav">
                <NavLink to="/dashboard" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                    <Home size={20} />
                    <span>Dashboard</span>
                </NavLink>

                <NavLink to="/my-urls" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                    <LinkIcon size={20} />
                    <span>My URLs</span>
                </NavLink>

                {isAdmin && (
                    <>
                        <div style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase' }}>Admin</div>
                        <NavLink to="/admin/analytics" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                            <BarChart2 size={20} />
                            <span>Global Analytics</span>
                        </NavLink>
                        <NavLink to="/admin/users" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                            <Users size={20} />
                            <span>Users Management</span>
                        </NavLink>
                    </>
                )}
            </nav>

            <button onClick={handleLogout} className="nav-link" style={{ background: 'transparent', width: '100%', marginTop: 'auto' }}>
                <LogOut size={20} />
                <span>Logout</span>
            </button>
        </aside>
    );
};

export default Sidebar;
