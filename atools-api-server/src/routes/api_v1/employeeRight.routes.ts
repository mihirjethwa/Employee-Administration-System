import express from "express";
import { addEmployeeRight, deleteEmployeeRight, getEmployeeRight, updateEmployeeRight, getEmployeeRightById } from "../../controllers/employeeRight.controller";
import { authorize, protect } from "../../middleware/auth.middleware";
import roleConstants from "../../constants/role.constants";


const router = express.Router();

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.get("/right", protect, authorize(roleConstants.VIEW_EMPLOYEE), getEmployeeRight);

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.get("/right/:id", protect, authorize(roleConstants.VIEW_EMPLOYEE), getEmployeeRightById);

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.post("/right", protect, authorize(roleConstants.EDIT_EMPLOYEE), addEmployeeRight);

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.put("/right/:id", protect, authorize(roleConstants.EDIT_EMPLOYEE), updateEmployeeRight);

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.delete("/right/:id", protect, authorize(roleConstants.EDIT_EMPLOYEE), deleteEmployeeRight);
export default router;
