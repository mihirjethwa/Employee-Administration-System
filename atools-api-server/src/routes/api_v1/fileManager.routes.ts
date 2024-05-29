import multer from "multer";
import express from "express";
import roleConstants from "../../constants/role.constants";
import { authorize, protect } from "../../middleware/auth.middleware";
import { download, upload, uploadBase64, deleteFile } from "../../controllers/fileManager.controller";

const router = express.Router();

/**
 * @route    POST /file-manager/download/s3://my-bucke/key or /file-manager/download?s3Path="s3://my-bucke/key"
 * @desc     Upload file to S3
 * @access   Restricted access to authorized user
 */
router.get("/download", protect, authorize(roleConstants.EDIT_EMPLOYEE), download);
router.get("/download/:s3Path", protect, authorize(roleConstants.EDIT_EMPLOYEE), download);

/**
 * @route    POST /file-manager/upload
 * @desc     Upload file to S3
 * @access   Restricted access to authorized user
 */
router.post("/upload", protect, authorize(roleConstants.EDIT_EMPLOYEE), multer({ dest: 'temp/', limits: { fieldSize: 8 * 1024 * 1024 } }).any(), upload);

/**
 * @route    POST /file-manager/uploadBase64
 * @desc     Upload file to S3
 * @access   Restricted access to authorized user
 */ 
router.post("/uploadBase64", protect, authorize(roleConstants.EDIT_EMPLOYEE), uploadBase64);

/**
 * @route    POST /file-manager/uploadBase64
 * @desc     Upload file to S3
 * @access   Restricted access to authorized user
 */ 
 router.delete("/deleteDoc", protect, authorize(roleConstants.EDIT_EMPLOYEE), deleteFile);

export default router;