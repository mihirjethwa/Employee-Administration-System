import express from "express";
import { addEmployeePayroll, deleteEmployeePayroll, getEmployeePayroll, updateEmployeePayroll, getEmployeePayrollById } from "../../controllers/employeePayroll.controller";
import { authorize, protect } from "../../middleware/auth.middleware";
import roleConstants from "../../constants/role.constants";


const router = express.Router();

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.get("/payroll", protect, authorize(roleConstants.VIEW_EMPLOYEE), getEmployeePayroll);

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.get("/payroll/:id", protect, authorize(roleConstants.VIEW_EMPLOYEE), getEmployeePayrollById);

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
// router.post("/payroll", protect, authorize(roleConstants.EDIT_EMPLOYEE),upload.fields([{ name: 'niProof', maxCount: 1 },{ name: 'payeDoc', maxCount: 1 }, { name: 'banKDeclaration', maxCount: 1 }]), addEmployeePayroll);

router.post("/payroll", protect, authorize(roleConstants.EDIT_EMPLOYEE), addEmployeePayroll);

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.put("/payroll/:id", protect, authorize(roleConstants.EDIT_EMPLOYEE), updateEmployeePayroll);

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.delete("/payroll/:id", protect, authorize(roleConstants.EDIT_EMPLOYEE), deleteEmployeePayroll);

export default router;
