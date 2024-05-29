import express from "express";
import { addEmployeeGD, deleteEmployeeGD, getEmployeeGD, updateEmployeeGD, getEmployeeGDById, getEmployeeGDForDownload } from "../../controllers/employeeGeneral.controller";
import { authorize, protect } from "../../middleware/auth.middleware";
import roleConstants from "../../constants/role.constants";

const router = express.Router();

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.get("/general", protect, getEmployeeGD);

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.get("/general/:id", protect, authorize(roleConstants.VIEW_EMPLOYEE), getEmployeeGDById);

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.post("/general", protect, authorize(roleConstants.EDIT_EMPLOYEE), addEmployeeGD);

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.put("/general/:id", protect, authorize(roleConstants.EDIT_EMPLOYEE), updateEmployeeGD);

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.delete("/general/:id", protect, authorize(roleConstants.EDIT_EMPLOYEE), deleteEmployeeGD);

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.get("/general/download", protect, authorize(roleConstants.VIEW_EMPLOYEE), getEmployeeGDForDownload);

export default router;
