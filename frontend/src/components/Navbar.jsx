import AuthService from '../services/auth.service';
import { User, Bell } from 'lucide-react';

const Navbar = () => {
    const user = AuthService.getCurrentUser();

    return (
        <div className="top-bar">
            <div className="welcome-msg">
                <h2 style={{ fontSize: '1.25rem' }}>Welcome back, {user?.name} 👋</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Here's what's happening with your links today.</p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                <button style={{ background: 'white', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>
                    <Bell size={18} color="#64748b" />
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.25rem 0.75rem', background: 'white', borderRadius: '0.75rem', border: '1px solid var(--border-color)' }}>
                    <div style={{ background: 'var(--primary-blue)', color: 'white', width: '2rem', height: '2rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyCenter: 'center', fontWeight: 'bold' }}>
                        <span style={{ margin: 'auto' }}>{user?.name?.charAt(0)}</span>
                    </div>
                    <div style={{ textAlign: 'left' }}>
                        <p style={{ fontSize: '0.875rem', fontWeight: '600' }}>{user?.name}</p>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{user?.roles[0].replace('ROLE_', '')}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
