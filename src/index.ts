import { userService } from "@/services";
import { getParam } from "@/utils/url";
import type { NextFunction, Request, Response } from "express";
import express from "express";
import { z } from "zod";

const app = express();
app.use(express.json());

const userSchema = z.object({
  firstName: z.string().trim().min(2, "First name is required"),
  lastName: z.string().trim().min(2, "Last name is required"),
  email: z.email("Email is required"),
  /* email in my experience is kinda iffy to validate with regexp,
  so i would prefer to do it with a solid lib, but otherwise i would do
  something like 
  const emailRegex /^[\w.-]+@([\w-]+\.)+[\w-]{2,}$/;
  abd to check it: emailRegex.test("someEmail@email.com") */
});

type AsyncRoute = (req: Request, res: Response, next: NextFunction) => Promise<any>;

const asyncHandler = (fn: AsyncRoute) =>
  (req: Request, res: Response, next: NextFunction) =>
    fn(req, res, next).catch(next)

app.post(
  "/users",
  asyncHandler(async (req, res) => {
    const body = userSchema.parse(req.body);
    const user = userService.create(body);
    res.status(201).json(user);
  })
)

app.delete<{ id: string }>(
  "user/:id",
  asyncHandler(async (req, res) => {
    const id = getParam(req.params.id);
    userService.deleteById(id);
    res.sendStatus(204);
  })
)

app.get(
  "/users",
  asyncHandler(async (_req, res) => {
    res.json(userService.list());
  })
);