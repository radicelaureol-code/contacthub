import api from './api';

export const fetchRequests = (params) => {
  return api.get('/requests', { params }).then((res) => res.data);
};

export const fetchRequestById = (id) => {
  return api.get(`/requests/${id}`).then((res) => res.data);
};

export const updateRequestStatus = (id, status) => {
  return api.patch(`/requests/${id}/status`, { status }).then((res) => res.data);
};

export const addRequestNote = (id, content) => {
  return api.post(`/requests/${id}/notes`, { content }).then((res) => res.data);
};

export const fetchStats = () => {
  return api.get('/requests/stats').then((res) => res.data);
};