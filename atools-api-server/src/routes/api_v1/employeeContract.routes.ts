import express from "express";
import { addEmployeeContract, deleteEmployeeContract, getEmployeeContract, updateEmployeeContract, getEmployeeContractById } from "../../controllers/employeeContract.controller";
import { authorize, protect } from "../../middleware/auth.middleware";
import roleConstants from "../../constants/role.constants";


const router = express.Router();

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.get("/contract", protect, authorize(roleConstants.VIEW_EMPLOYEE), getEmployeeContract);

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.get("/contract/:id", protect, authorize(roleConstants.VIEW_EMPLOYEE), getEmployeeContractById);

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
// router.post("/contract", protect, authorize(roleConstants.EDIT_EMPLOYEE),upload.fields([{ name: 'niProof', maxCount: 1 },{ name: 'payeDoc', maxCount: 1 }, { name: 'banKDeclaration', maxCount: 1 }]), addEmployeeContract);

router.post("/contract", protect, authorize(roleConstants.EDIT_EMPLOYEE), addEmployeeContract);

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.put("/contract/:id", protect, authorize(roleConstants.EDIT_EMPLOYEE), updateEmployeeContract);

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.delete("/contract/:id", protect, authorize(roleConstants.EDIT_EMPLOYEE), deleteEmployeeContract);

export default router;
