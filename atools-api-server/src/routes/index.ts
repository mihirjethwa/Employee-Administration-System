import express from "express";
import routerV1 from "./api_v1/";

const router = express.Router();

router.use("/api/v1", routerV1);

router.get("/", (req, res) => {
  res.send("Express + TypeScript Server is running!!!");
});

export default router;