import api from './api';

const signup = (name, email, password) => {
    return api.post('/auth/signup', { name, email, password });
};

const login = async (email, password) => {
    const response = await api.post('/auth/signin', { email, password });
    if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

const logout = () => {
    localStorage.removeItem('user');
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

const AuthService = {
    signup,
    login,
    logout,
    getCurrentUser,
};

export default AuthService;
