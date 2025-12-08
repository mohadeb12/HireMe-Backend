import Job from './job.model.js';
import User from '../user/user.model.js';
import { JOB_STATUS } from '../../utils/constants.js';

export const createJob = async (recruiterId, data) => {
  const recruiter = await User.findById(recruiterId);
  if (!recruiter) {
    const error = new Error('Recruiter not found');
    error.statusCode = 404;
    throw error;
  }
  const companyName = recruiter.companyName || data.companyName || recruiter.name;
  const job = await Job.create({
    title: data.title,
    description: data.description,
    companyName,
    recruiter: recruiterId,
    location: data.location,
    salaryRange: data.salaryRange,
    status: JOB_STATUS.OPEN
  });
  return job;
};

export const getAllJobs = async () => {
  const jobs = await Job.find({ status: JOB_STATUS.OPEN }).populate('recruiter', 'name email companyName role');
  return jobs;
};

export const getJobById = async id => {
  const job = await Job.findById(id).populate('recruiter', 'name email companyName role');
  return job;
};

export const getJobsByRecruiter = async recruiterId => {
  const jobs = await Job.find({ recruiter: recruiterId }).populate('recruiter', 'name email companyName role');
  return jobs;
};

export const updateJob = async (jobId, recruiterId, data) => {
  const job = await Job.findOneAndUpdate(
    { _id: jobId, recruiter: recruiterId },
    data,
    { new: true }
  );
  return job;
};

export const deleteJob = async (jobId, recruiterId) => {
  const job = await Job.findOneAndDelete({
    _id: jobId,
    recruiter: recruiterId
  });
  return job;
};