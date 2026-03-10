const Candidate = require('../models/Candidate');

const candidateController = {
  async createCandidate(req, res) {
    try {
      const candidate = new Candidate(req.body);
      await candidate.save();
      
      console.log('Candidate saved to database:', candidate);
      
      res.status(201).json({
        success: true,
        message: 'Candidate application submitted successfully',
        data: candidate
      });
    } catch (error) {
      console.error('Error creating candidate:', error);
      
      if (error.code === 11000) {
        return res.status(400).json({
          success: false,
          message: 'Email already exists'
        });
      }

      res.status(500).json({
        success: false,
        message: 'Error submitting application',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

}
module.exports = candidateController;
