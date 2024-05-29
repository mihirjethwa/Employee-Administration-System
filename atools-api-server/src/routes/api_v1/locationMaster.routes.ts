import express from "express";
import { addLocationMaster, deleteLocationMaster, getLocationMaster, updateLocationMaster, getLocationMasterById } from "../../controllers/locationMaster.controller";
const router = express.Router();
import { authorize, protect } from "../../middleware/auth.middleware";
import roleConstants from "../../constants/role.constants";

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.get("/locationMaster", protect, authorize(roleConstants.VIEW_MASTER), getLocationMaster);

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.get("/locationMaster/:id", protect, authorize(roleConstants.VIEW_MASTER), getLocationMasterById);

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.post("/locationMaster", protect, authorize(roleConstants.EDIT_MASTER), addLocationMaster);

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.put("/locationMaster/:id", protect, authorize(roleConstants.EDIT_MASTER), updateLocationMaster);

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.delete("/locationMaster/:id", protect, authorize(roleConstants.EDIT_MASTER), deleteLocationMaster);

export default router;
