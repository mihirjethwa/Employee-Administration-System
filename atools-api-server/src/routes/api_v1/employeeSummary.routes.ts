import express from "express";
import { getEmployeeSummary, getEmployeeSummaryById } from "../../controllers/employeeSummary.controller";
import { authorize, protect } from "../../middleware/auth.middleware";
import roleConstants from "../../constants/role.constants";

const router = express.Router();

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.get("/employeesummary", protect, authorize(roleConstants.VIEW_EMPLOYEE), getEmployeeSummary);

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.get("/employeesummary/:id", protect, authorize(roleConstants.VIEW_EMPLOYEE), getEmployeeSummaryById);

export default router;
