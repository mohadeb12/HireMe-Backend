import Application from './application.model.js';
import Job from '../job/job.model.js';
import * as paymentService from '../payment/payment.service.js';
import { APPLICATION_STATUS, PAYMENT_STATUS, ROLES, JOB_STATUS } from '../../utils/constants.js';

const APPLICATION_FEE = 100;

export const applyToJob = async ({ jobId, applicantId, cvUrl }) => {
  const job = await Job.findById(jobId);
  if (!job) {
    const error = new Error('Job not found');
    error.statusCode = 404;
    throw error;
  }
  if (job.status !== JOB_STATUS.OPEN) {
    const error = new Error('Job is not open');
    error.statusCode = 400;
    throw error;
  }
  const existing = await Application.findOne({
    job: jobId,
    applicant: applicantId
  });
  if (existing) {
    const error = new Error('You have already applied to this job');
    error.statusCode = 400;
    throw error;
  }
  const payment = await paymentService.fakeCharge({
    userId: applicantId,
    jobId,
    amount: APPLICATION_FEE
  });
  const application = await Application.create({
    job: jobId,
    applicant: applicantId,
    cvUrl,
    status: APPLICATION_STATUS.PENDING,
    paymentStatus: PAYMENT_STATUS.SUCCESS,
    payment: payment._id
  });
  await paymentService.attachApplicationToPayment(payment._id, application._id);
  return { application, payment };
};

export const getApplicationsForJob = async ({ jobId, recruiterId }) => {
  const job = await Job.findById(jobId);
  if (!job) {
    const error = new Error('Job not found');
    error.statusCode = 404;
    throw error;
  }
  if (job.recruiter.toString() !== recruiterId) {
    const error = new Error('Not authorized to view applications for this job');
    error.statusCode = 403;
    throw error;
  }
  const applications = await Application.find({ job: jobId })
    .populate('applicant', 'name email');
  return applications;
};

export const updateApplicationStatus = async ({ applicationId, actor, status }) => {
  if (!Object.values(APPLICATION_STATUS).includes(status)) {
    const error = new Error('Invalid status');
    error.statusCode = 400;
    throw error;
  }
  const application = await Application.findById(applicationId).populate('job');
  if (!application) {
    const error = new Error('Application not found');
    error.statusCode = 404;
    throw error;
  }
  if (actor.role !== ROLES.ADMIN) {
    if (application.job.recruiter.toString() !== actor.id) {
      const error = new Error('Not authorized to update this application');
      error.statusCode = 403;
      throw error;
    }
  }
  application.status = status;
  await application.save();
  return application;
};

export const getApplicationsForApplicant = async applicantId => {
  const applications = await Application.find({ applicant: applicantId })
    .populate('job', 'title companyName location')
    .sort({ createdAt: -1 });
  return applications;
};