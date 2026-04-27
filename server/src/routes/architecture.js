import { Router } from "express";
import { generateArchitectureReport } from "../services/groqService.js";
import { generateGoogleAgentReview, isGoogleAgentConfigured } from "../services/googleReviewService.js";

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
    let googleAgentReview = null;

    if (isGoogleAgentConfigured()) {
      try {
        googleAgentReview = await generateGoogleAgentReview(requirement, report);
      } catch (reviewError) {
        const reviewSummary =
          reviewError.statusCode === 429
            ? "Google Gemini quota is exhausted or unavailable for the configured API project. Add a working Gemini key or enable quota/billing, then retry."
            : reviewError.message;

        googleAgentReview = {
          verdict: "Google review agent unavailable",
          summary: reviewSummary,
          mvpRisks: [],
          missingModules: [],
          securityGaps: [],
          refinements: []
        };
      }
    }

    response.json({
      success: true,
      data: {
        ...report,
        googleAgentReview,
        agentPipeline: {
          primaryGenerator: "Groq Llama architecture generator",
          secondaryReviewer: googleAgentReview ? "Google Gemini review agent" : "Google review agent not configured"
        }
      }
    });
  } catch (error) {
    next(error);
  }
});

export default router;
