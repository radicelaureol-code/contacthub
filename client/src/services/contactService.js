import api from './api';

export const submitContactRequest = (data) => {
  return api.post('/contact', data).then((res) => res.data);
};

export const getTicketStatus = (ticketNumber) => {
  return api.get(`/contact/status/${ticketNumber}`).then((res) => res.data);
};