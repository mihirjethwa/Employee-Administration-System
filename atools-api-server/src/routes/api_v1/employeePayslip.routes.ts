import express from "express";
import { addEmployeePayslip, deleteEmployeePayslip, getEmployeePayslip, updateEmployeePayslip, getEmployeePayslipById } from "../../controllers/employeePayslip.controller";
import { authorize, protect } from "../../middleware/auth.middleware";
import roleConstants from "../../constants/role.constants";

const router = express.Router();

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.get("/payslip/get/:id", protect, authorize(roleConstants.VIEW_EMPLOYEE), getEmployeePayslip);

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.get("/payslip/:id", protect, authorize(roleConstants.VIEW_EMPLOYEE), getEmployeePayslipById);

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.post("/payslip", protect, authorize(roleConstants.EDIT_EMPLOYEE), addEmployeePayslip);

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.put("/payslip/:id", protect, authorize(roleConstants.EDIT_EMPLOYEE), updateEmployeePayslip);

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.delete("/payslip/:id", protect, authorize(roleConstants.EDIT_EMPLOYEE), deleteEmployeePayslip);
export default router;
