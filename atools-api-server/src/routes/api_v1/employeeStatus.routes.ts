import express from "express";
import { addEmployeeStatus, deleteEmployeeStatus, getEmployeeStatus, updateEmployeeStatus, getEmployeeStatusById } from "../../controllers/employeeStatus.controller";
import { authorize, protect } from "../../middleware/auth.middleware";
import roleConstants from "../../constants/role.constants";

const router = express.Router();

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.get("/status", protect, authorize(roleConstants.VIEW_EMPLOYEE), getEmployeeStatus);

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.get("/status/:id", protect, authorize(roleConstants.VIEW_EMPLOYEE), getEmployeeStatusById);

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.post("/status", protect, authorize(roleConstants.EDIT_EMPLOYEE), addEmployeeStatus);

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.put("/status/:id", protect, authorize(roleConstants.EDIT_EMPLOYEE), updateEmployeeStatus);

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.delete("/status/:id", protect, authorize(roleConstants.EDIT_EMPLOYEE), deleteEmployeeStatus);
export default router;
