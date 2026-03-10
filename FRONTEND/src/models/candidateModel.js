// ─────────────────────────────────────────────────────────
// MODEL: candidateModel.js
// Defines the Candidate data schema and all validation rules.
// To add a new field: add it to SCHEMA and validate() below.
// ─────────────────────────────────────────────────────────

export const CANDIDATE_SCHEMA = {
  name: '',
  email: '',
  phone: '',
  location: '',
  currentCompany: '',
  currentCTC: '',
  skills: [],
  experience: '',
  resumeLink: '',
};

export function createCandidate(data = {}) {
  return { ...CANDIDATE_SCHEMA, ...data };
}

export function validateCandidate(data) {
  const errors = {};

  if (!data.name?.trim())
    errors.name = 'Full name is required.';
  else if (data.name.trim().length < 2)
    errors.name = 'Name must be at least 2 characters.';
  else if (data.name.trim().length > 100)
    errors.name = 'Name must not exceed 100 characters.';

  if (!data.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = 'A valid email address is required.';

  if (!data.phone?.trim())
    errors.phone = 'Contact number is required.';
  else if (data.phone.trim().length < 10)
    errors.phone = 'Phone number must be at least 10 characters.';
  else if (data.phone.trim().length > 20)
    errors.phone = 'Phone number must not exceed 20 characters.';

  if (!data.location?.trim())
    errors.location = 'Location is required.';
  else if (data.location.trim().length < 2)
    errors.location = 'Location must be at least 2 characters.';
  else if (data.location.trim().length > 100)
    errors.location = 'Location must not exceed 100 characters.';

  if (!data.currentCompany?.trim())
    errors.currentCompany = 'Current company is required.';
  else if (data.currentCompany.trim().length < 2)
    errors.currentCompany = 'Company name must be at least 2 characters.';
  else if (data.currentCompany.trim().length > 100)
    errors.currentCompany = 'Company name must not exceed 100 characters.';

  if (!data.currentCTC?.trim())
    errors.currentCTC = 'Current CTC is required.';
  else if (data.currentCTC.trim().length < 1)
    errors.currentCTC = 'Current CTC is required.';
  else if (data.currentCTC.trim().length > 50)
    errors.currentCTC = 'CTC must not exceed 50 characters.';

  if (!data.skills?.length)
    errors.skills = 'Please add at least one skill.';

  if (!data.experience)
    errors.experience = 'Please select your experience level.';
  else if (!['0-1', '1-3', '3-5', '5-8', '8-12', '12+'].includes(data.experience))
    errors.experience = 'Please select a valid experience level.';

  if (data.resumeLink && data.resumeLink.trim() && !isValidUrl(data.resumeLink))
    errors.resumeLink = 'Please enter a valid Google Drive link.';

  return errors;
}

function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

export const EXPERIENCE_OPTIONS = [
  { value: '',     label: 'Select experience level' },
  { value: '0-1',  label: '0 – 1 year (Fresher)' },
  { value: '1-3',  label: '1 – 3 years' },
  { value: '3-5',  label: '3 – 5 years' },
  { value: '5-8',  label: '5 – 8 years' },
  { value: '8-12', label: '8 – 12 years' },
  { value: '12+',  label: '12+ years (Senior)' },
];
