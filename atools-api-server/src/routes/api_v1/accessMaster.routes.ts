import express from "express";
import { addAccessMaster, deleteAccessMaster, getAccessMaster, updateAccessMaster } from "../../controllers/accessMaster.controller";
const router = express.Router();
import { authorize, protect } from "../../middleware/auth.middleware";
import roleConstants from "../../constants/role.constants";

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.get("/accessMaster", protect, authorize(roleConstants.VIEW_MASTER), getAccessMaster);

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.post("/accessMaster", protect, authorize(roleConstants.EDIT_MASTER), addAccessMaster);

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.put("/accessMaster/:id", protect, authorize(roleConstants.EDIT_MASTER), updateAccessMaster);

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.delete("/accessMaster/:id", protect, authorize(roleConstants.EDIT_MASTER), deleteAccessMaster);

export default router;
