import { useState, useEffect, useCallback } from 'react';
import { fetchRequestById, updateRequestStatus, addRequestNote } from '../services/requestService';

export function useRequestDetail(id) {
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionError, setActionError] = useState(null);
  const [updating, setUpdating] = useState(false);

  const load = useCallback(() => {
    setLoading(true);
    fetchRequestById(id)
      .then(setRequest)
      .catch((err) => setError(err.response?.data?.message || 'Demande introuvable'))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  const changeStatus = async (status) => {
    setActionError(null);
    setUpdating(true);
    try {
      const updated = await updateRequestStatus(id, status);
      setRequest(updated);
    } catch (err) {
      setActionError(err.response?.data?.message || 'Transition impossible');
    } finally {
      setUpdating(false);
    }
  };

  const addNote = async (content) => {
    setActionError(null);
    setUpdating(true);
    try {
      const updated = await addRequestNote(id, content);
      setRequest(updated);
    } catch (err) {
      setActionError(err.response?.data?.message || "Erreur lors de l'ajout de la note");
    } finally {
      setUpdating(false);
    }
  };

  return { request, loading, error, actionError, updating, changeStatus, addNote };
}