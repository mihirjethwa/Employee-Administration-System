import express from "express";
import { ApiResponse } from "../../models/ApiResponse";
import authRouter from "./auth.routes";
import locationMasterRouter from "./locationMaster.routes";
import roleMasterRouter from "./roleMaster.routes";
import holidayMasterRouter from "./holidayMaster.routes";
import documentMasterRouter from "./documentMaster.routes";
import storeMasterRouter from "./storeMaster.routes";
import accessMasterRouter from "./accessMaster.routes";
import countMasterRouter from "./countMaster.routes";
import nationalityMasterRouter from "./nationalityMaster.routes";
import documentAccessMasterRouter from "./documentAccessMaster.routes"
import employeeGDRouter from "./employeeGeneral.routes";
import employeePayrollRouter from "./employeePayroll.routes";
import employeeRightRouter from "./employeeRight.routes";
import employeeStatusRouter from "./employeeStatus.routes";
import employeeFeedbackRouter from "./employeeFeedback.routes";
import employeePayslipRouter from "./employeePayslip.routes";
import employeeDocsRouter from "./employeeDocs.routes";
import employeeStoreRouter from "./employeeStore.routes";
import searchUserRouter from "./searchUser.routes";
import employeeSummaryRouter from "./employeeSummary.routes";
import nationalityRouter from "./nationality.routes";
import employeeDetailsRouter from "./employeeDetail.routes";
import fileManagerRouter from "./fileManager.routes";
import exportRouter from "./export.routes";
import contractGenerator from "./contractGenerator.routes"
import { protect } from "../../middleware/auth.middleware";

import employeeContractRouter from "./employeeContract.routes";
const router = express.Router();

router.get("/", protect, (req, res) => {
  const response = new ApiResponse();
  response.data = { message: "V1 API is running" };
  res.status(200).send(response);
});

router.use("/auth", authRouter);
router.use("/master", locationMasterRouter);
router.use("/master", roleMasterRouter);
router.use("/master", holidayMasterRouter);
router.use("/master", documentMasterRouter);
router.use("/master", storeMasterRouter);
router.use("/master", accessMasterRouter);
router.use("/master", countMasterRouter);
router.use("/master", nationalityMasterRouter);
router.use("/master", documentAccessMasterRouter);
router.use("/employee", employeeDetailsRouter);
router.use("/employee", employeeContractRouter);
router.use("/employee", employeeStoreRouter);
router.use("/employee", employeeGDRouter);
router.use("/employee", employeePayrollRouter);
router.use("/employee", employeeRightRouter);
router.use("/employee", employeeStatusRouter);
router.use("/employee", employeeDocsRouter);
router.use("/employee", employeeFeedbackRouter);
router.use("/employee", employeePayslipRouter);
router.use("/search", searchUserRouter);
router.use("/employee", employeeSummaryRouter);
router.use("/nationality", nationalityRouter);
router.use("/file-manager", fileManagerRouter);
router.use("/export", contractGenerator);
router.use("/export", exportRouter);

export default router;
