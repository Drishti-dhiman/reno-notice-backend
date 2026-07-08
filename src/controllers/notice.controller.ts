import type { Request, Response } from "express";
import { NoticeCategory, NoticePriority } from "../../generated/prisma/client.js";
import { prisma } from "../config/prisma.js";
import { validateNoticeInput } from "../lib/validateNotic.js";

export async function getNotices(_req: Request, res: Response) {
  try {
    const notices = await prisma.notice.findMany({
      orderBy: [{ priority: "desc" }, { publishDate: "desc" }],
    });

    res.json({ data: notices });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch notices" });
  }
}

export async function getNoticeById(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).json({ message: "Invalid notice id" });
    }

    const notice = await prisma.notice.findUnique({
      where: { id },
    });

    if (!notice) {
      return res.status(404).json({ message: "Notice not found" });
    }

    res.json({ data: notice });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch notice" });
  }
}

export async function createNotice(req: Request, res: Response) {
  try {
    const validation = validateNoticeInput(req.body);

    if (!validation.isValid) {
      return res.status(400).json({ errors: validation.errors });
    }

    const data = {
      ...validation.values,
      category: validation.values.category as NoticeCategory,
      priority: validation.values.priority as NoticePriority,
    };

    const notice = await prisma.notice.create({ data });

    res.status(201).json({ data: notice });
  } catch (error) {
    res.status(500).json({ message: "Failed to create notice" });
  }
}

export async function updateNotice(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).json({ message: "Invalid notice id" });
    }

    const validation = validateNoticeInput(req.body);

    if (!validation.isValid) {
      return res.status(400).json({ errors: validation.errors });
    }

    const data = {
      ...validation.values,
      category: validation.values.category as NoticeCategory,
      priority: validation.values.priority as NoticePriority,
    };

    const notice = await prisma.notice.update({
      where: { id },
      data,
    });

    res.status(200).json({ message: "Notice updated successfully", data: notice });
  } catch (error: any) {
    if (error?.code === "P2025") {
      return res.status(404).json({ message: "Notice not found" });
    }

    res.status(500).json({ message: "Failed to update notice" });
  }
}

export async function deleteNotice(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).json({ message: "Invalid notice id" });
    }

    await prisma.notice.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error: any) {
    if (error?.code === "P2025") {
      return res.status(404).json({ message: "Notice not found" });
    }

    res.status(500).json({ message: "Failed to delete notice" });
  }
}
