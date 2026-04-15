import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import prisma from "../prisma/client";
import { signToken } from "../utils/jwt";

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { email, password: hashed }
  });

  res.json(user);
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) return res.status(401).json({ error: "Invalid credentials" });

  const token = signToken({ id: user.id });

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax"
  });

  res.json({ message: "Logged in" });
};
