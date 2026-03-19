const Queue = require('bull');
const { createTransporter, emailTemplates } = require('../config/email');

const emailQueue = new Queue('email queue', {
  redis: {
    port: process.env.REDIS_PORT || 6379,
    host: process.env.REDIS_HOST || 'localhost',
    password: process.env.REDIS_PASSWORD || undefined
  }
});

emailQueue.process('send-recruiter-email', async (job) => {
  try {
    const { data, adminEmail } = job.data;
    const transporter = createTransporter();
    const emailContent = emailTemplates.recruiterSubmission(data);
    
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: adminEmail || process.env.ADMIN_EMAIL,
      ...emailContent
    });
    
    console.log('Recruiter email sent successfully');
  } catch (error) {
    console.error('Error sending recruiter email:', error);
    throw error;
  }
});

emailQueue.on('completed', (job, result) => {
  console.log(`Email job ${job.id} completed`);
});

emailQueue.on('failed', (job, err) => {
  console.error(`Email job ${job.id} failed:`, err);
});

const addRecruiterEmailJob = (data, adminEmail) => {
  return emailQueue.add('send-recruiter-email', { data, adminEmail }, {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 2000
    }
  });
};

module.exports = {
  emailQueue,
  addRecruiterEmailJob
};
