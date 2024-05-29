import express from "express";
import { addEmployeeFeedback, deleteEmployeeFeedback, getEmployeeFeedback, updateEmployeeFeedback, getEmployeeFeedbackById } from "../../controllers/employeeFeedback.contoller";
import { authorize, protect } from "../../middleware/auth.middleware";
const router = express.Router();
import roleConstants from "../../constants/role.constants";

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.get("/feedback/get/:id", protect, authorize(roleConstants.VIEW_EMPLOYEE), getEmployeeFeedback);

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.get("/feedback/:id", protect, authorize(roleConstants.VIEW_EMPLOYEE), getEmployeeFeedbackById);

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.post("/feedback", protect, authorize(roleConstants.EDIT_EMPLOYEE), addEmployeeFeedback);

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.put("/feedback/:id", protect, authorize(roleConstants.EDIT_EMPLOYEE), updateEmployeeFeedback);

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.delete("/feedback/:id", protect, authorize(roleConstants.EDIT_EMPLOYEE), deleteEmployeeFeedback);
export default router;
