import express from "express";
import { getEmployeeDetailsById } from "../../controllers/employeeMain.controller";
import { authorize, protect } from "../../middleware/auth.middleware";
import roleConstants from "../../constants/role.constants";

const router = express.Router();

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
// router.get("/general", protect, authorize(roleConstants.VIEW_EMPLOYEE), getEmployeeGD);

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.get("/details/:id", protect, authorize(roleConstants.VIEW_EMPLOYEE), getEmployeeDetailsById);

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
// router.post("/general", protect, authorize(roleConstants.EDIT_EMPLOYEE), addEmployeeGD);

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
// router.put("/general/:id", protect, authorize(roleConstants.EDIT_EMPLOYEE), updateEmployeeGD);

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
// router.delete("/general/:id", protect, authorize(roleConstants.EDIT_EMPLOYEE), deleteEmployeeGD);

export default router;
