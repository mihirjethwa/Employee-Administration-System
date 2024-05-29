import express from "express";
import { checkAuthentication, forgotPassword, resetPassword, employeeLogin, employeeRegister, updateEmployee, deleteEmployee } from "../../controllers/auth.controller";

const router = express.Router();

// @route    POST /auth/check
// @desc     Check the auth route
// @access   Public
router.get("/check", checkAuthentication);

// @route    POST /auth/register
// @desc     Register a user
// @access   Public
router.post("/register", employeeRegister);

// @route    POST /auth/login
// @desc     Login user & get token
// @access   Public
router.post("/login", employeeLogin);

// @route    POST /auth/forgotPassword
// @desc     Send reset password link with code
// @access   Public
router.post("/forgotPassword", forgotPassword);

// @route    POST /auth/resetPassword
// @desc     Change user password through email and code
// @access   Public
router.post("/resetPassword", resetPassword);

// @route    POST /auth/resetPassword
// @desc     Change user password through email and code
// @access   Public
router.put("/updateEmployee/:employeeId", updateEmployee);

// @route    POST /auth/resetPassword
// @desc     Change user password through email and code
// @access   Public
router.delete("/deleteEmployee/:id", deleteEmployee);

export default router;
