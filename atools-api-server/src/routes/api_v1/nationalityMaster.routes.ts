import express from "express";
import { addNationalityMaster, deleteNationalityMaster, getNationalityMaster, updateNationalityMaster, getNationalityMasterById } from "../../controllers/nationalityMaster.controller";
const router = express.Router();
import { authorize, protect } from "../../middleware/auth.middleware";
import roleConstants from "../../constants/role.constants";

// @route    POST /autDocument
// @desc     Add the location master details
// @access   Public
router.get("/nationalityMaster", protect, authorize(roleConstants.VIEW_MASTER), getNationalityMaster);

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.get("/nationalityMaster/:id", protect, authorize(roleConstants.VIEW_MASTER), getNationalityMasterById);

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.post("/nationalityMaster", protect, authorize(roleConstants.EDIT_MASTER), addNationalityMaster);

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.put("/nationalityMaster/:id", protect, authorize(roleConstants.EDIT_MASTER), updateNationalityMaster);

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.delete("/nationalityMaster/:id", protect, authorize(roleConstants.EDIT_MASTER), deleteNationalityMaster);

export default router;
