import { GoogleGenAI } from "@google/genai";
import { buildGoogleReviewPrompt } from "../prompts/googleReviewPrompt.js";

function extractJson(text) {
  const jsonMatch = text.match(/\{[\s\S]*\}/);

  if (!jsonMatch) {
    throw new Error("Google review agent did not return valid JSON.");
  }

  return JSON.parse(jsonMatch[0]);
}

function toArray(value, fallback = []) {
  return Array.isArray(value) ? value.filter(Boolean).map(String) : fallback;
}

function toString(value, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function normalizeGoogleReview(review) {
  return {
    verdict: toString(review?.verdict, "Hackathon-ready with a few targeted refinements."),
    summary: toString(
      review?.summary,
      "The Google review agent validated the architecture and suggested practical MVP improvements."
    ),
    mvpRisks: toArray(review?.mvpRisks),
    missingModules: toArray(review?.missingModules),
    securityGaps: toArray(review?.securityGaps),
    refinements: toArray(review?.refinements)
  };
}

export function isGoogleAgentConfigured() {
  return Boolean(process.env.GEMINI_API_KEY);
}

export async function generateGoogleAgentReview(requirement, report) {
  const apiKey = process.env.GEMINI_API_KEY;
  const model = process.env.GEMINI_MODEL || "gemini-2.0-flash";

  if (!apiKey) {
    const error = new Error("Missing GEMINI_API_KEY in server environment.");
    error.statusCode = 500;
    throw error;
  }

  const ai = new GoogleGenAI({ apiKey });
  const response = await ai.models.generateContent({
    model,
    contents: buildGoogleReviewPrompt(requirement, report),
    config: {
      temperature: 0.3,
      responseMimeType: "application/json"
    }
  });

  return normalizeGoogleReview(extractJson(response.text || ""));
}

