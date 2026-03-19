const nodemailer = require('nodemailer');

const createTransporter = () => {
  return nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

const emailTemplates = {
  recruiterSubmission: (data) => ({
    subject: 'New Employer Form Submission - Talentra',
    html: `
      <h2>New Employer Form Submission</h2>
      <p><strong>Company:</strong> ${data.company}</p>
      <p><strong>Contact Person:</strong> ${data.contactPerson}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message}</p>
      <p><strong>Submitted:</strong> ${data.createdAt ? new Date(data.createdAt).toLocaleString() : new Date().toLocaleString()}</p>
      <hr>
      <p><em>This is an automated notification from Talentra Recruitment Platform</em></p>
    `
  }),
  
  // Candidate email template (currently not used - no emails sent for candidate submissions)
  candidateSubmission: (data) => ({
    subject: 'New Candidate Application - Talentra',
    html: `
      <h2>New Candidate Application</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Current Company:</strong> ${data.currentCompany}</p>
      <p><strong>Current CTC:</strong> ${data.currentCTC}</p>
      <p><strong>Experience:</strong> ${data.experience} years</p>
      <p><strong>Skills:</strong> ${data.skills.join(', ')}</p>
      <p><strong>Resume Link:</strong> ${data.resumeLink ? `<a href="${data.resumeLink}" target="_blank">View Resume</a>` : 'Not provided'}</p>
      <p><strong>Submitted:</strong> ${data.createdAt ? new Date(data.createdAt).toLocaleString() : new Date().toLocaleString()}</p>
      <hr>
      <p><em>This is an automated notification from Talentra Recruitment Platform</em></p>
    `
  })
};

module.exports = {
  createTransporter,
  emailTemplates
};
