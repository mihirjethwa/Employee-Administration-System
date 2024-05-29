import express from "express";
import { addEmployeeDocs, deleteEmployeeDocs, getEmployeeDocs, updateEmployeeDocs, getEmployeeDocsById, getDocumentList, getZipFile } from "../../controllers/employeeDocs.controller";
import { authorize, protect } from "../../middleware/auth.middleware";
import roleConstants from "../../constants/role.constants";

const router = express.Router();

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.get("/docs", protect, authorize(roleConstants.VIEW_EMPLOYEE), getEmployeeDocs);

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.get("/docs/:id", protect, authorize(roleConstants.VIEW_EMPLOYEE), getEmployeeDocsById);

// @route    GET /auth/check
// @desc     Get employee documents list
// @access   Public
router.get("/getEmployeeDocumentList/:id", protect, authorize(roleConstants.VIEW_EMPLOYEE), getDocumentList);

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public"
// router.post("/docs", protect, authorize(roleConstants.EDIT_EMPLOYEE), multer({ dest: 'temp/', limits: { fieldSize: 8 * 1024 * 1024 } }).single('additionalDocuments'), addEmployeeDocs);
router.post("/docs", protect, authorize(roleConstants.EDIT_EMPLOYEE), addEmployeeDocs);

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.put("/docs/:id", protect, authorize(roleConstants.EDIT_EMPLOYEE), updateEmployeeDocs);

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.delete("/docs/:id", protect, authorize(roleConstants.EDIT_EMPLOYEE), deleteEmployeeDocs);

// @route    GET /auth/check
// @desc     Get employee documents list
// @access   Public
router.get("/getZipFile/:id", getZipFile);

export default router;
