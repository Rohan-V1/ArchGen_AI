import Groq from "groq-sdk";
import { buildArchitecturePrompt } from "../prompts/architecturePrompt.js";
import { normalizeReport } from "../utils/normalizeReport.js";

function extractJson(text) {
  const jsonMatch = text.match(/\{[\s\S]*\}/);

  if (!jsonMatch) {
    throw new Error("AI response did not contain valid JSON.");
  }

  return JSON.parse(jsonMatch[0]);
}

export async function generateArchitectureReport(requirement) {
  const apiKey = process.env.GROQ_API_KEY;
  const model = process.env.GROQ_MODEL || "openai/gpt-oss-120b";

  if (!apiKey) {
    const error = new Error("Missing GROQ_API_KEY in server environment.");
    error.statusCode = 500;
    throw error;
  }

  const groq = new Groq({ apiKey });
  const prompt = buildArchitecturePrompt(requirement);

  const completion = await groq.chat.completions.create({
    model,
    temperature: 0.35,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content:
          "You produce structured, implementation-aware architecture recommendations for realistic student and startup prototypes."
      },
      {
        role: "user",
        content: prompt
      }
    ]
  });

  const content = completion.choices?.[0]?.message?.content;

  if (!content) {
    const error = new Error("Groq returned an empty response.");
    error.statusCode = 502;
    throw error;
  }

  const parsedReport = extractJson(content);
  return normalizeReport(parsedReport);
}
