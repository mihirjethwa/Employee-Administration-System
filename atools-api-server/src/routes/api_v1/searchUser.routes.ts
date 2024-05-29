import express from "express";
import { getSearchUser } from "../../controllers/searchUser.controller";
import { authorize, protect } from "../../middleware/auth.middleware";
const router = express.Router();

// @route    GET /master/count
// @desc     Get all the master's data count
// @access   Private
router.get("/", protect, getSearchUser);

export default router;
