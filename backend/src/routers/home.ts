import { Router } from "express";

export const homeRouter = Router();

homeRouter.get("/", async (req, res) => {
  res.redirect("/postgres");
});
