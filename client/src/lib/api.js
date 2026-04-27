const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://archgen-ai-pwg3.onrender.com";

export async function generateArchitecture(requirement) {
  const response = await fetch(`${API_BASE_URL}/api/architecture/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ requirement })
  });

  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload.message || "Failed to generate architecture.");
  }

  return payload.data;
}

