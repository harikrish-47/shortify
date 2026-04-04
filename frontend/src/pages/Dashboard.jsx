import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import UrlService from '../services/url.service';
import { Link as LinkIcon, Plus, Copy, Trash2, ArrowUpRight, BarChart, MousePointer2, Calendar } from 'lucide-react';

const Dashboard = () => {
    const [url, setUrl] = useState('');
    const [myUrls, setMyUrls] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [stats, setStats] = useState({ total: 0, clicks: 0 });

    useEffect(() => {
        fetchUrls();
    }, []);

    const fetchUrls = async () => {
        try {
            const response = await UrlService.getMyUrls();
            setMyUrls(response.data);
            const totalClicks = response.data.reduce((acc, curr) => acc + curr.clickCount, 0);
            setStats({ total: response.data.length, clicks: totalClicks });
        } catch (err) {
            console.error('Failed to fetch URLs', err);
        }
    };

    const handleShorten = async (e) => {
        e.preventDefault();
        if (!url) return;
        setIsLoading(true);
        try {
            await UrlService.shorten(url);
            setUrl('');
            fetchUrls();
        } catch (err) {
            console.error('Failed to shorten url', err);
        } finally {
            setIsLoading(false);
        }
    };

    const copyToClipboard = (code) => {
        const shortUrl = `${window.location.protocol}//${window.location.host.split(':')[0]}:8080/${code}`;
        navigator.clipboard.writeText(shortUrl);
        alert('Copied to clipboard!');
    };

    const deleteUrl = async (id) => {
        if (window.confirm('Are you sure you want to delete this link?')) {
            try {
                await UrlService.deleteUrl(id);
                fetchUrls();
            } catch (err) {
                console.error('Failed to delete url', err);
            }
        }
    };

    return (
        <div className="app-layout">
            <Sidebar />
            <main className="main-content">
                <Navbar />

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                    <div className="card" style={{ borderLeft: '4px solid var(--primary-blue)' }}>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Total Links</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>{stats.total}</h3>
                            <div style={{ background: 'rgba(37, 99, 235, 0.1)', color: 'var(--primary-blue)', padding: '0.5rem', borderRadius: '0.5rem' }}>
                                <LinkIcon size={20} />
                            </div>
                        </div>
                    </div>
                    <div className="card" style={{ borderLeft: '4px solid var(--primary-green)' }}>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Total Clicks</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>{stats.clicks}</h3>
                            <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--primary-green)', padding: '0.5rem', borderRadius: '0.5rem' }}>
                                <MousePointer2 size={20} />
                            </div>
                        </div>
                    </div>
                    <div className="card" style={{ borderLeft: '4px solid #f59e0b' }}>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Active Links</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>{stats.total}</h3>
                            <div style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', padding: '0.5rem', borderRadius: '0.5rem' }}>
                                <LinkIcon size={20} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card" style={{ marginBottom: '2.5rem' }}>
                    <h3 style={{ marginBottom: '1rem', fontWeight: '600' }}>Shorten a New Link</h3>
                    <form onSubmit={handleShorten} style={{ display: 'flex', gap: '1rem' }}>
                        <div style={{ flex: 1, position: 'relative' }}>
                            <LinkIcon size={18} style={{ position: 'absolute', top: '50%', left: '12px', transform: 'translateY(-50%)', color: '#64748b' }} />
                            <input
                                type="url"
                                placeholder="Paste your long URL here (e.g. https://example.com/very/long/path...)"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                required
                                style={{ width: '100%', paddingLeft: '40px', height: '48px' }}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ width: 'auto', padding: '0 2rem', height: '48px' }} disabled={isLoading}>
                            {isLoading ? 'Creating...' : <>
                                <Plus size={20} />
                                Shorten Link
                            </>}
                        </button>
                    </form>
                </div>

                <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h3 style={{ fontWeight: '600' }}>Recent Links</h3>
                        <button style={{ color: 'var(--primary-blue)', fontSize: '0.875rem', fontWeight: '600' }}>View All</button>
                    </div>

                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Original URL</th>
                                <th>Short Link</th>
                                <th>Clicks</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myUrls.slice(0, 5).map((u) => (
                                <tr key={u.id}>
                                    <td>
                                        <div style={{ maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            {u.originalUrl}
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ color: 'var(--primary-blue)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            {u.shortCode}
                                            <Copy size={14} style={{ cursor: 'pointer' }} onClick={() => copyToClipboard(u.shortCode)} />
                                        </div>
                                    </td>
                                    <td>
                                        <div className="badge badge-green">{u.clickCount} clicks</div>
                                    </td>
                                    <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '1rem' }}>
                                            <a href={`http://localhost:8080/${u.shortCode}`} target="_blank" rel="noreferrer" style={{ color: '#64748b' }}><ArrowUpRight size={18} /></a>
                                            <button onClick={() => deleteUrl(u.id)} style={{ background: 'transparent', color: '#ef4444' }}><Trash2 size={18} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {myUrls.length === 0 && (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>No links created yet.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
