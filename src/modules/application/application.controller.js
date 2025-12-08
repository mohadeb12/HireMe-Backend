import * as applicationService from './application.service.js';

export const applyToJob = async (req, res, next) => {
  try {
    if (!req.file) {
      const error = new Error('CV file is required');
      error.statusCode = 400;
      return next(error);
    }
    const jobId = req.params.jobId;
    const cvUrl = `/uploads/cv/${req.file.filename}`;
    const result = await applicationService.applyToJob({
      jobId,
      applicantId: req.user.id,
      cvUrl
    });
    res.status(201).json({
      success: true,
      data: {
        application: result.application,
        payment: result.payment
      }
    });
  } catch (err) {
    next(err);
  }
};

export const getApplicationsForJob = async (req, res, next) => {
  try {
    const applications = await applicationService.getApplicationsForJob({
      jobId: req.params.jobId,
      recruiterId: req.user.id
    });
    res.json({
      success: true,
      data: applications
    });
  } catch (err) {
    next(err);
  }
};

export const updateApplicationStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const application = await applicationService.updateApplicationStatus({
      applicationId: req.params.id,
      actor: { id: req.user.id, role: req.user.role },
      status
    });
    res.json({
      success: true,
      data: application
    });
  } catch (err) {
    next(err);
  }
};

export const getMyApplications = async (req, res, next) => {
  try {
    const applications = await applicationService.getApplicationsForApplicant(
      req.user.id
    );
    res.json({
      success: true,
      data: applications
    });
  } catch (err) {
    next(err);
  }
};