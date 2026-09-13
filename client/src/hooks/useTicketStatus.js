import { useState, useEffect } from 'react';
import { getTicketStatus } from '../services/contactService';

export function useTicketStatus(ticketNumber) {
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!ticketNumber) return;

    setLoading(true);
    getTicketStatus(ticketNumber)
      .then(setTicket)
      .catch((err) => setError(err.response?.data?.message || 'Ticket introuvable'))
      .finally(() => setLoading(false));
  }, [ticketNumber]);

  return { ticket, loading, error };
}