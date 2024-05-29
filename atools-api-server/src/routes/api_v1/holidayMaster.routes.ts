import express from "express";
import { addHolidayMaster, deleteHolidayMaster, getHolidayMaster, updateHolidayMaster, getHolidayMasterById } from "../../controllers/holidayMaster.controller";
import { authorize, protect } from "../../middleware/auth.middleware";
import roleConstants from "../../constants/role.constants";

const router = express.Router();

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.get("/holidayMaster", protect, authorize(roleConstants.VIEW_MASTER), getHolidayMaster);

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.get("/holidayMaster/:id", protect, authorize(roleConstants.VIEW_MASTER), getHolidayMasterById);

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.post("/holidayMaster", protect, authorize(roleConstants.EDIT_MASTER), addHolidayMaster);

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.put("/holidayMaster/:id", protect, authorize(roleConstants.EDIT_MASTER), updateHolidayMaster);

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.delete("/holidayMaster/:id", protect, authorize(roleConstants.EDIT_MASTER), deleteHolidayMaster);

export default router;
