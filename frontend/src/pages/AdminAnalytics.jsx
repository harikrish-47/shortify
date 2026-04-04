import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import UrlService from '../services/url.service';
import { BarChart, Users, MousePointer2, Link as LinkIcon, Trash2, ExternalLink } from 'lucide-react';

const AdminAnalytics = () => {
    const [stats, setStats] = useState({ totalUsers: 0, totalUrls: 0, totalClicks: 0 });
    const [urls, setUrls] = useState([]);

    useEffect(() => {
        fetchStats();
        fetchUrls();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await UrlService.getStats();
            setStats(response.data);
        } catch (err) {
            console.error('Failed to fetch stats', err);
        }
    };

    const fetchUrls = async () => {
        try {
            const response = await UrlService.getAllUrls();
            setUrls(response.data);
        } catch (err) {
            console.error('Failed to fetch all urls', err);
        }
    };

    const deleteUrl = async (id) => {
        if (window.confirm('Delete this user link from the platform?')) {
            try {
                await UrlService.deleteUrl(id);
                fetchUrls();
                fetchStats();
            } catch (err) {
                console.error('Failed to delete url', err);
            }
        }
    };

    const formatShortUrl = (code) => {
        return `${window.location.protocol}//${window.location.host.split(':')[0]}:8080/${code}`;
    };

    return (
        <div className="app-layout">
            <Sidebar />
            <main className="main-content">
                <Navbar />

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                    <div className="card" style={{ borderLeft: '4px solid #3b82f6' }}>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Platform Users</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>{stats.totalUsers}</h3>
                            <div style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', padding: '0.5rem', borderRadius: '0.5rem' }}>
                                <Users size={20} />
                            </div>
                        </div>
                    </div>
                    <div className="card" style={{ borderLeft: '4px solid #10b981' }}>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Total Links Shrunk</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>{stats.totalUrls}</h3>
                            <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '0.5rem', borderRadius: '0.5rem' }}>
                                <LinkIcon size={20} />
                            </div>
                        </div>
                    </div>
                    <div className="card" style={{ borderLeft: '4px solid #f59e0b' }}>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Total Platform Clicks</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>{stats.totalClicks}</h3>
                            <div style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', padding: '0.5rem', borderRadius: '0.5rem' }}>
                                <MousePointer2 size={20} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <h3 style={{ marginBottom: '1.5rem', fontWeight: '600' }}>Global Links Management</h3>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Created By</th>
                                <th>Original URL</th>
                                <th>Short Link</th>
                                <th>Clicks</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {urls.map((u) => (
                                <tr key={u.id}>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <div style={{ width: '1.5rem', height: '1.5rem', background: '#e2e8f0', borderRadius: '50%', display: 'flex' }}>
                                                <span style={{ fontSize: '0.75rem', margin: 'auto' }}>{u.userName.charAt(0)}</span>
                                            </div>
                                            {u.userName}
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            {u.originalUrl}
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ color: 'var(--primary-blue)', fontWeight: '600' }}>{u.shortCode}</div>
                                    </td>
                                    <td>
                                        <div className="badge badge-green">{u.clickCount}</div>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '1rem' }}>
                                            <a href={formatShortUrl(u.shortCode)} target="_blank" rel="noreferrer" style={{ color: '#64748b' }}><ExternalLink size={18} /></a>
                                            <button onClick={() => deleteUrl(u.id)} style={{ background: 'transparent', color: '#ef4444' }}><Trash2 size={18} /></button>
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

export default AdminAnalytics;
