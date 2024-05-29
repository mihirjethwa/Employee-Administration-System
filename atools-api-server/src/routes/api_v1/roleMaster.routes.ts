import express from "express";
import { addRoleMaster, deleteRoleMaster, getRoleMaster, updateRoleMaster, getRoleMasterById } from "../../controllers/roleMaster.controller";
const router = express.Router();
import { authorize, protect } from "../../middleware/auth.middleware";
import roleConstants from "../../constants/role.constants";

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.get("/roleMaster", protect, getRoleMaster);

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.get("/roleMaster/:id", protect, authorize(roleConstants.VIEW_MASTER), getRoleMasterById);

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.post("/roleMaster", protect, authorize(roleConstants.EDIT_MASTER), addRoleMaster);

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.put("/roleMaster/:id", protect, authorize(roleConstants.EDIT_MASTER), updateRoleMaster);

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.delete("/roleMaster/:id", protect, authorize(roleConstants.EDIT_MASTER), deleteRoleMaster);

export default router;
