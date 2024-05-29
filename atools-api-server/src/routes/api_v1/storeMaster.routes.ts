import express from "express";
import { addStoreMaster, deleteStoreMaster, getStoreMaster, updateStoreMaster } from "../../controllers/storeMaster.controller";
const router = express.Router();
import { authorize, protect } from "../../middleware/auth.middleware";
import roleConstants from "../../constants/role.constants";

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.get("/storeMaster", protect, authorize(roleConstants.VIEW_MASTER), getStoreMaster);

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.post("/storeMaster", protect, authorize(roleConstants.EDIT_MASTER), addStoreMaster);

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.put("/storeMaster/:id", protect, authorize(roleConstants.EDIT_MASTER), updateStoreMaster);

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.delete("/storeMaster/:id", protect, authorize(roleConstants.EDIT_MASTER), deleteStoreMaster);

export default router;
