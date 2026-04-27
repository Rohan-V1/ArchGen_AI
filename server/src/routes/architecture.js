import { Router } from "express";
import { generateArchitectureReport } from "../services/groqService.js";

const router = Router();

router.post("/generate", async (request, response, next) => {
  try {
    const requirement = request.body?.requirement?.trim();

    if (!requirement) {
      const error = new Error("Project requirement is required.");
      error.statusCode = 400;
      throw error;
    }

    const report = await generateArchitectureReport(requirement);

    response.json({
      success: true,
      data: report
    });
  } catch (error) {
    next(error);
  }
});

export default router;

