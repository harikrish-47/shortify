import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import UrlService from '../services/url.service';
import { Mail, Shield, User } from 'lucide-react';

const UsersManagement = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await UrlService.getAllUsers();
            setUsers(response.data);
        } catch (err) {
            console.error('Failed to fetch users', err);
        }
    };

    return (
        <div className="app-layout">
            <Sidebar />
            <main className="main-content">
                <Navbar />

                <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h3 style={{ fontWeight: '600' }}>Platform Users Management</h3>
                    </div>

                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email Address</th>
                                <th>Role</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((u) => (
                                <tr key={u.id}>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <div style={{ background: 'var(--primary-blue)', color: 'white', width: '2rem', height: '2rem', borderRadius: '50%', display: 'flex', justifyCenter: 'center', alignItems: 'center', fontWeight: 'bold' }}>
                                                <span style={{ margin: 'auto' }}>{u.name.charAt(0)}</span>
                                            </div>
                                            <span style={{ fontWeight: '600' }}>{u.name}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
                                            <Mail size={16} />
                                            {u.email}
                                        </div>
                                    </td>
                                    <td>
                                        <div className={`badge ${u.role === 'ROLE_ADMIN' ? 'badge-blue' : 'badge-green'}`} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', width: 'fit-content' }}>
                                            {u.role === 'ROLE_ADMIN' ? <Shield size={12} /> : <User size={12} />}
                                            {u.role.replace('ROLE_', '')}
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: '#10b981', fontWeight: '500' }}>
                                            <div style={{ width: '0.5rem', height: '0.5rem', background: '#10b981', borderRadius: '50%' }}></div>
                                            Active
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

export default UsersManagement;
