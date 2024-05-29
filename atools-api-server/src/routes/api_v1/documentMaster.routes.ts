import express from "express";
import { addDocumentMaster, deleteDocumentMaster, getDocumentMaster, updateDocumentMaster, getDocumentMasterById } from "../../controllers/documentMaster.controller";
import { authorize, protect } from "../../middleware/auth.middleware";
import roleConstants from "../../constants/role.constants";

const router = express.Router();

// @route    POST /autDocument
// @desc     Add the location master details
// @access   Public
router.get("/documentMaster", protect, authorize(roleConstants.VIEW_MASTER), getDocumentMaster);

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.get("/documentMaster/:id", protect, authorize(roleConstants.VIEW_MASTER), getDocumentMasterById);

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.post("/documentMaster", protect, authorize(roleConstants.EDIT_MASTER), addDocumentMaster);

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.put("/documentMaster/:id", protect, authorize(roleConstants.EDIT_MASTER), updateDocumentMaster);

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.delete("/documentMaster/:id", protect, authorize(roleConstants.EDIT_MASTER), deleteDocumentMaster);

export default router;
