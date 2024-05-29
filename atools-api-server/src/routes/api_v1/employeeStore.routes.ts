import express from "express";
import { addEmployeeStore, deleteEmployeeStore, getEmployeeStore, updateEmployeeStore, getEmployeeStoreById } from "../../controllers/employeeStore.controller";
import { authorize, protect } from "../../middleware/auth.middleware";
import roleConstants from "../../constants/role.constants";


const router = express.Router();

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.get("/employeestore", protect, authorize(roleConstants.VIEW_EMPLOYEE), getEmployeeStore);

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.get("/employeestore/:id", protect, authorize(roleConstants.VIEW_EMPLOYEE), getEmployeeStoreById);

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.post("/employeestore", protect, authorize(roleConstants.EDIT_EMPLOYEE), addEmployeeStore);

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.put("/employeestore/:id", protect, authorize(roleConstants.EDIT_EMPLOYEE), updateEmployeeStore);

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.delete("/employeestore/:id", protect, authorize(roleConstants.EDIT_EMPLOYEE), deleteEmployeeStore);

export default router;
