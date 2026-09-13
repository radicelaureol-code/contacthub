import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitContactRequest } from '../services/contactService';

const INITIAL_STATE = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  subject: '',
  category: '',
  message: '',
  consentGiven: false
};

export function useContactForm() {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(null);
    setSubmitting(true);

    try {
      const result = await submitContactRequest(formData);
      navigate(`/confirmation/${result.ticketNumber}`);
    } catch (err) {
      setErrors(err.response?.data?.message || 'Une erreur est survenue, veuillez réessayer.');
    } finally {
      setSubmitting(false);
    }
  };

  return { formData, updateField, handleSubmit, errors, submitting };
}