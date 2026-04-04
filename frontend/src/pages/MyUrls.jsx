import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import UrlService from '../services/url.service';
import { Copy, Trash2, ArrowUpRight, Search, Filter } from 'lucide-react';

const MyUrls = () => {
    const [urls, setUrls] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchUrls();
    }, []);

    const fetchUrls = async () => {
        try {
            const response = await UrlService.getMyUrls();
            setUrls(response.data);
        } catch (err) {
            console.error('Failed to fetch URLs', err);
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

    const filteredUrls = urls.filter(u =>
        u.originalUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.shortCode.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="app-layout">
            <Sidebar />
            <main className="main-content">
                <Navbar />

                <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                        <h3 style={{ fontWeight: '600' }}>My Shortened Links</h3>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <div style={{ position: 'relative' }}>
                                <Search size={18} style={{ position: 'absolute', top: '50%', left: '12px', transform: 'translateY(-50%)', color: '#64748b' }} />
                                <input
                                    type="text"
                                    placeholder="Search links..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    style={{ paddingLeft: '40px', background: '#f8fafc', border: '1px solid var(--border-color)', height: '40px' }}
                                />
                            </div>
                            <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0 1rem', background: 'white', border: '1px solid var(--border-color)', borderRadius: '0.5rem', color: '#64748b' }}>
                                <Filter size={18} />
                                Filter
                            </button>
                        </div>
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
                            {filteredUrls.map((u) => (
                                <tr key={u.id}>
                                    <td>
                                        <div style={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
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
                            {filteredUrls.length === 0 && (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>No links found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

export default MyUrls;
