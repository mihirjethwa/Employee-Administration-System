import express from "express";
import { GenerateContractPdf,GenerateSummaryPdf } from "../../controllers/documentGenerator.controller";
import { authorize, protect } from "../../middleware/auth.middleware";
import roleConstants from "../../constants/role.constants";


const router = express.Router();





router.get("/contractGenerator/:id", protect, authorize(roleConstants.EDIT_EMPLOYEE), GenerateContractPdf);
router.get("/summaryGenerator/:id", protect, authorize(roleConstants.EDIT_EMPLOYEE), GenerateSummaryPdf);


export default router;
