import express from "express";
import { addDocumentAccessMaster, deleteDocumentAccessMaster, getDocumentAccessMaster, updateDocumentAccessMaster, getDocumentAccessMasterById } from "../../controllers/documentAccessMaster.controller";
const router = express.Router();
import { authorize, protect } from "../../middleware/auth.middleware";
import roleConstants from "../../constants/role.constants";

// @route    POST /autDocument
// @desc     Add the location master details
// @access   Public
router.get("/documentAccessMaster", protect, authorize(roleConstants.VIEW_MASTER), getDocumentAccessMaster);

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.get("/documentAccessMaster/:id", protect, authorize(roleConstants.VIEW_MASTER), getDocumentAccessMasterById);

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.post("/documentAccessMaster", protect, authorize(roleConstants.EDIT_MASTER), addDocumentAccessMaster);

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.put("/documentAccessMaster/:id", protect, authorize(roleConstants.EDIT_MASTER), updateDocumentAccessMaster);

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.delete("/documentAccessMaster/:id", protect, authorize(roleConstants.EDIT_MASTER), deleteDocumentAccessMaster);

export default router;
