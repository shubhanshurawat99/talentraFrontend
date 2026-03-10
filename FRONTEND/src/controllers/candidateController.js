// ─────────────────────────────────────────────────────────
// CONTROLLER: candidateController.js
// Business logic for the Candidate submission form.
// Connects CandidateModel validation to View state.
// ─────────────────────────────────────────────────────────

import { useState, useCallback } from 'react';
import { createCandidate, validateCandidate } from '../models/candidateModel';

/**
 * useCandidateController — custom hook (Controller layer).
 * Returns form state, handlers, and errors to the View.
 */
export function useCandidateController() {
  const [fields, setFields] = useState({
    name: '', email: '', phone: '', location: '',
    currentCompany: '', currentCTC: '', experience: '',
  });
  const [skills, setSkills]     = useState([]);
  const [skillInput, setSkillInput] = useState('');
  const [resumeLink, setResumeLink] = useState('');
  const [errors, setErrors]     = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]   = useState(false);

  /** Update any text field */
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFields(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  }, []);

  /** Add a skill tag */
  const addSkill = useCallback((raw) => {
    const val = raw.trim();
    if (val && !skills.includes(val)) {
      setSkills(prev => [...prev, val]);
      setErrors(prev => ({ ...prev, skills: '' }));
    }
    setSkillInput('');
  }, [skills]);

  /** Remove a skill tag */
  const removeSkill = useCallback((val) => {
    setSkills(prev => prev.filter(s => s !== val));
  }, []);

  /** Handle skill input keydown (Enter / comma adds tag) */
  const handleSkillKeyDown = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addSkill(skillInput);
    }
  }, [skillInput, addSkill]);

  /** Handle CV file selection */
  const handleFileChange = useCallback((file) => {
    setCvFile(file);
    setErrors(prev => ({ ...prev, cvFile: '' }));
  }, []);

  /** Handle resume link update */
  const handleResumeLinkChange = useCallback((e) => {
    const value = e.target.value;
    setResumeLink(value);
    setErrors(prev => ({ ...prev, resumeLink: '' }));
  }, []);

  /** Submit handler — validates then simulates API call */
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    const candidate = createCandidate({ ...fields, skills, resumeLink });
    const validationErrors = validateCandidate(candidate);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/candidates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...fields, skills, resumeLink }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Backend validation error:', errorData);
        throw new Error(errorData.message || 'Failed to submit application');
      }

      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting application:', error);
      setErrors({ submit: 'Failed to submit application. Please try again.' });
      return;
    }
    
    setLoading(false);
  }, [fields, skills, resumeLink]);

  /** Reset the form */
  const handleReset = useCallback(() => {
    setFields({ name: '', email: '', phone: '', location: '', currentCompany: '', currentCTC: '', experience: '' });
    setSkills([]);
    setSkillInput('');
    setResumeLink('');
    setErrors({});
    setSubmitted(false);
  }, []);

  return {
    fields, errors, skills, skillInput, resumeLink,
    submitted, loading,
    handleChange, handleSkillKeyDown, addSkill, removeSkill,
    setSkillInput, handleResumeLinkChange, handleSubmit, handleReset,
  };
}
