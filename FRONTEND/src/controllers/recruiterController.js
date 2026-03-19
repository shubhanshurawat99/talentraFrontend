// ─────────────────────────────────────────────────────────
// CONTROLLER: recruiterController.js
// Business logic for the Employer Contact form.
// ─────────────────────────────────────────────────────────
import { API_BASE_URL } from '../config/api';
import { useState, useCallback } from 'react';
import { createRecruiter, validateRecruiter } from '../models/recruiterModel';

/**
 * useRecruiterController — custom hook (Controller layer).
 */
export function useRecruiterController() {
  const [fields, setFields] = useState({
    company: '', contactPerson: '', email: '', phone: '', message: '',
  });
  const [errors, setErrors]     = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]   = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFields(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    const recruiter = createRecruiter(fields);
    const validationErrors = validateRecruiter(recruiter);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch(`${API_BASE_URL}/recruiters`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recruiter),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      const data = await response.json();
      console.log('Form submitted successfully:', data);
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ submit: 'Failed to submit form. Please try again.' });
      return;
    }
    
    setLoading(false);
    setSubmitted(true);
  }, [fields]);

  const handleReset = useCallback(() => {
    setFields({ company: '', contactPerson: '', email: '', phone: '', message: '' });
    setErrors({});
    setSubmitted(false);
  }, []);

  return { fields, errors, submitted, loading, handleChange, handleSubmit, handleReset };
}
