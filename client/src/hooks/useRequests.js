import { useState, useEffect, useCallback } from 'react';
import { fetchRequests } from '../services/requestService';

const INITIAL_FILTERS = { status: '', category: '', search: '', page: 1 };

export function useRequests() {
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [requests, setRequests] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(() => {
    setLoading(true);
    const params = { page: filters.page, limit: 20 };
    if (filters.status) params.status = filters.status;
    if (filters.category) params.category = filters.category;
    if (filters.search) params.search = filters.search;

    fetchRequests(params)
      .then((res) => {
        setRequests(res.data);
        setPagination(res.pagination);
      })
      .catch((err) => setError(err.response?.data?.message || 'Erreur de chargement'))
      .finally(() => setLoading(false));
  }, [filters]);

  useEffect(() => {
    load();
  }, [load]);

  // Toute modification de filtre retourne à la page 1, sauf changement de page lui-même
  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: key === 'page' ? value : 1 }));
  };

  return { requests, pagination, filters, updateFilter, loading, error, reload: load };
}