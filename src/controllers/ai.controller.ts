import { Request, Response } from "express";
import { AICoachService } from "../services/aiCoach.service";

const aiService = new AICoachService();

export const chat = async (req: Request, res: Response) => {
  const userId = (req as any).user?.id || "demo-user";
  const { message } = req.body;

  const response = await aiService.handleMessage(userId, message);

  res.json({ response });
};
