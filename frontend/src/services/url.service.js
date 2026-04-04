import api from './api';

const shorten = (url) => {
    return api.post('/url/shorten', { url });
};

const getMyUrls = () => {
    return api.get('/url/my-urls');
};

const deleteUrl = (id) => {
    return api.delete(`/url/${id}`);
};

const getAllUrls = () => {
    return api.get('/admin/urls');
};

const getAllUsers = () => {
    return api.get('/admin/users');
};

const getStats = () => {
    return api.get('/admin/stats');
};

const UrlService = {
    shorten,
    getMyUrls,
    deleteUrl,
    getAllUrls,
    getAllUsers,
    getStats,
};

export default UrlService;
