import EmployeeFeedback, { IEmployeeFeedback } from "../models/EmployeeFeedback";

export const createEmployeeFeedback = async (data: any): Promise<IEmployeeFeedback> => {
  const newEmployeeFeedback = new EmployeeFeedback({
    employeeId: data.employeeId,
    dateOfIssue: data.dateOfIssue,
    dateOfSubmission: data.dateOfSubmission,
    feedbackType: data.feedbackType,
    feedbackCriteria: data.feedbackCriteria,
    observation: data.observation,
    feedbackGiven: data.feedbackGiven,
    oer: data.oer,
    followupRequest: data.followupRequest,
    feedbackFormFile: data.feedbackFormFile,
    understandImplicaton: data.understandImplicaton,
    managerName: data.managerName,
    createdBy: data.employee.id,
  });

  return newEmployeeFeedback;
};
