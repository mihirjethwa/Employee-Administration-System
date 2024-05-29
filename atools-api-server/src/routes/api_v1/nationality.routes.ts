import express from "express";
import { addNationality, deleteNationality, getNationality, updateNationality, getNationalityById } from "../../controllers/nationality.controller";
const router = express.Router();
import { authorize, protect } from "../../middleware/auth.middleware";
import roleConstants from "../../constants/role.constants";

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.get("/", protect, authorize(roleConstants.VIEW_MASTER), getNationality);

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.get("/:id", protect, authorize(roleConstants.VIEW_MASTER), getNationalityById);

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.post("/", protect, authorize(roleConstants.EDIT_MASTER), addNationality);

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.put("/:id", protect, authorize(roleConstants.EDIT_MASTER), updateNationality);

// @route    POST /auth/check
// @desc     Add the location master details
// @access   Public
router.delete("/:id", protect, authorize(roleConstants.EDIT_MASTER), deleteNationality);

export default router;
