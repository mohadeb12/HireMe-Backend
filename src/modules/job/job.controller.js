import * as jobService from './job.service.js';

export const createJob = async (req, res, next) => {
  try {
    const job = await jobService.createJob(req.user.id, req.body);
    res.status(201).json({
      success: true,
      data: job
    });
  } catch (err) {
    next(err);
  }
};

export const getAllJobs = async (req, res, next) => {
  try {
    const jobs = await jobService.getAllJobs();
    res.json({
      success: true,
      data: jobs
    });
  } catch (err) {
    next(err);
  }
};

export const getJobById = async (req, res, next) => {
  try {
    const job = await jobService.getJobById(req.params.id);
    if (!job) {
      const error = new Error('Job not found');
      error.statusCode = 404;
      return next(error);
    }
    res.json({
      success: true,
      data: job
    });
  } catch (err) {
    next(err);
  }
};

export const getMyJobs = async (req, res, next) => {
  try {
    const jobs = await jobService.getJobsByRecruiter(req.user.id);
    res.json({
      success: true,
      data: jobs
    });
  } catch (err) {
    next(err);
  }
};

export const updateJob = async (req, res, next) => {
  try {
    const job = await jobService.updateJob(req.params.id, req.user.id, req.body);
    if (!job) {
      const error = new Error('Job not found or not authorized');
      error.statusCode = 404;
      return next(error);
    }
    res.json({
      success: true,
      data: job
    });
  } catch (err) {
    next(err);
  }
};

export const deleteJob = async (req, res, next) => {
  try {
    const job = await jobService.deleteJob(req.params.id, req.user.id);
    if (!job) {
      const error = new Error('Job not found or not authorized');
      error.statusCode = 404;
      return next(error);
    }
    res.json({
      success: true,
      data: job
    });
  } catch (err) {
    next(err);
  }
};