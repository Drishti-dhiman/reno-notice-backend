import { Router } from "express";
import {
  createNotice,
  deleteNotice,
  getNoticeById,
  getNotices,
  updateNotice,
} from "../controllers/notice.controller.js";

const noticeRouter = Router();

noticeRouter.get("/", getNotices);
noticeRouter.get("/:id", getNoticeById);
noticeRouter.post("/", createNotice);
noticeRouter.put("/:id", updateNotice);
noticeRouter.delete("/:id", deleteNotice);

export default noticeRouter;
