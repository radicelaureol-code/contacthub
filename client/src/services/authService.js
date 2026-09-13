import api from './api';

export const login = (email, password) => {
  return api.post('/auth/login', { email, password }).then((res) => res.data);
};

export const logout = () => {
  return api.post('/auth/logout').then((res) => res.data);
};

export const getMe = () => {
  return api.get('/auth/me').then((res) => res.data);
};