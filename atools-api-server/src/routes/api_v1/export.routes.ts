import express from "express";
import { exportEmployeeBasicInfo, niiAuditReport, emailAuditReport, exportStartersLeavers, exportContractAmends, exportRight, exportJob, exportUserName, exportEmailAudit } from "../../controllers/export.controller";

const router = express.Router();

router.get("/excel/employee-basic-info", exportEmployeeBasicInfo);
router.get("/excel/payroll/ni-audit-report", niiAuditReport);
// router.get("/excel/payroll/email-audit-report", exportEmailAudit);
router.get("/excel/starters-leavers-report", exportStartersLeavers);
router.get("/excel/contact-amends-report", exportContractAmends);
router.get("/excel/right-to-work-report", exportRight);
router.get("/excel/job-documents-report", exportJob);
router.get("/excel/usernames-report", exportUserName);

router.get("/excel/payroll/email-audit-report", exportEmailAudit);

router.get("/excel/test", emailAuditReport);

export default router;
