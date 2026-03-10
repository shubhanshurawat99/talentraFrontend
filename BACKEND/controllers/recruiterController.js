const Recruiter = require('../models/Recruiter');
const { addRecruiterEmailJob } = require('../services/emailQueue');

const recruiterController = {
  async createRecruiter(req, res) {
    try {
          const recruiter = new Recruiter(req.body);
    await recruiter.save();  // ← This saves to database
    
    console.log('Recruiter saved to database:', recruiter);
      const recruiterData = {
        ...req.body,
        createdAt: new Date() // Add timestamp for email
      };
      
      console.log('Recruiter data received:', recruiterData);
      
      // Send email notification
      await addRecruiterEmailJob(recruiterData, process.env.ADMIN_EMAIL);
      
      res.status(201).json({
        success: true,
        message: 'Employer form submitted successfully',
        data: { ...recruiterData, id: 'temp-id-' + Date.now() }
      });
    } catch (error) {
      console.error('Error submitting recruiter form:', error);
      res.status(500).json({
        success: false,
        message: 'Error submitting employer form',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  } 
};

module.exports = recruiterController;
