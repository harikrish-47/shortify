import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Link as LinkIcon, LogIn, Mail, Lock } from 'lucide-react';
import AuthService from '../services/auth.service';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await AuthService.login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid email or password');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <div className="logo-container">
                        <LinkIcon className="logo-icon" />
                        <span className="logo-text">Shortify</span>
                    </div>
                    <h1>Welcome back</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Login to manage your shortened links.</p>
                </div>

                {error && <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1.25rem', fontSize: '0.875rem' }}>{error}</div>}

                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={18} style={{ position: 'absolute', top: '50%', left: '12px', transform: 'translateY(-50%)', color: '#64748b' }} />
                            <input
                                type="email"
                                placeholder="you@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                style={{ width: '100%', paddingLeft: '40px' }}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{ position: 'absolute', top: '50%', left: '12px', transform: 'translateY(-50%)', color: '#64748b' }} />
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                style={{ width: '100%', paddingLeft: '40px' }}
                            />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">
                        <LogIn size={20} />
                        <span>Login</span>
                    </button>
                </form>

                <div className="auth-footer">
                    Don't have an account? <Link to="/signup">Get started now</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
