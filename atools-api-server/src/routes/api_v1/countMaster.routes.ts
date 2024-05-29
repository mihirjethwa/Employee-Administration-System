import express from "express";
import { getCountMaster } from "../../controllers/countMaster.controller";
import { authorize, protect } from "../../middleware/auth.middleware";

const router = express.Router();

// @route    GET /master/count
// @desc     Get all the master's data count
// @access   Private
router.get("/count", protect, getCountMaster);

export default router;
