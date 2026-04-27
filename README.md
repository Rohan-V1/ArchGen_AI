# Requirement to System Architecture Generator

An AI-powered web application that converts raw business requirements into a professional system architecture recommendation using **Groq API + Llama 3**, **React**, **Node.js**, and **Express**, with a **Google Gemini review agent** for second-pass validation.

## What it does

Users enter a plain-language product idea such as:

> "I want a food delivery app with customer login, restaurant dashboard, payment gateway, and live order tracking."

The application returns a structured software architect-style report covering:

- Suggested system architecture
- Recommended tech stack
- Database design suggestion
- APIs and core modules
- Security recommendations
- Scaling suggestions
- Deployment recommendations
- Google agent review verdict

## Project goals

- Keep the scope realistic for a student prototype
- Make the experience look professional and startup-grade
- Avoid unnecessary complexity like auth, admin panels, and paid infrastructure
- Showcase AI-assisted architecture generation in a clean, impressive format

## Monorepo structure

```text
Archgen_AI/
├── client/
├── server/
└── docs/
```

## Tech stack

- Frontend: React + Vite
- Backend: Node.js + Express
- AI Model: Groq API with Llama 3
- Google Agent Layer: Gemini review agent
- Styling: Custom CSS
- Deployment:
  - Frontend: Vercel
  - Backend: Render

## Local setup

### 1. Clone and install

```bash
git clone <your-repo-url>
cd Archgen_AI
cd server && npm install
cd ../client && npm install
```

### 2. Configure environment variables

Create `server/.env` from `server/.env.example`:

```env
PORT=5000
GROQ_API_KEY=your_groq_api_key_here
CLIENT_ORIGIN=http://localhost:5173
GROQ_MODEL=llama3-70b-8192
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.0-flash
VERCEL_PROJECT_NAME=your-vercel-project-name
```

### 3. Run the backend

```bash
cd server
npm run dev
```

### 4. Run the frontend

```bash
cd client
npm run dev
```

## Environment variables

### Server

- `PORT`: Express server port
- `GROQ_API_KEY`: Your Groq API key
- `CLIENT_ORIGIN`: Allowed frontend origin for CORS
- `GROQ_MODEL`: Groq model name, default `llama3-70b-8192`
- `GEMINI_API_KEY`: Google Gemini API key for the review agent
- `GEMINI_MODEL`: Gemini model name, default `gemini-2.0-flash`
- `VERCEL_PROJECT_NAME`: Optional Vercel project slug for preview deployment CORS support

### Client

Create `client/.env.example` if you want a custom backend URL:

```env
VITE_API_BASE_URL=http://localhost:5000
```

## API endpoint

### `POST /api/architecture/generate`

Request:

```json
{
  "requirement": "I want a food delivery app with customer login, restaurant dashboard, payment gateway, and live order tracking."
}
```

Response:

```json
{
  "success": true,
  "data": {
    "title": "Food Delivery Platform Architecture Blueprint",
    "summary": "...",
    "architecture": {
      "pattern": "...",
      "overview": "...",
      "components": ["...", "..."],
      "dataFlow": ["...", "..."]
    },
    "techStack": {
      "frontend": ["React", "Vite"],
      "backend": ["Node.js", "Express"],
      "database": ["PostgreSQL"],
      "infra": ["Render", "Vercel"]
    },
    "databaseDesign": {
      "overview": "...",
      "entities": ["User", "Order", "Restaurant"]
    },
    "apisAndModules": ["Auth module", "Order service"],
    "security": ["JWT validation", "Input sanitization"],
    "scaling": ["Introduce Redis caching"],
    "deployment": ["Vercel for frontend", "Render for backend"],
    "productNotes": ["Good for hackathon MVP"],
    "deliveryChecklist": ["Create wireframe", "Configure Groq key"],
    "googleAgentReview": {
      "verdict": "Hackathon-ready with a few targeted refinements.",
      "summary": "...",
      "mvpRisks": ["..."],
      "missingModules": ["..."],
      "securityGaps": ["..."],
      "refinements": ["..."]
    },
    "agentPipeline": {
      "primaryGenerator": "Groq Llama architecture generator",
      "secondaryReviewer": "Google Gemini review agent"
    }
  }
}
```

## Deployment

### Frontend on Vercel

1. Import the `client` folder as a project
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add env variable:

```env
VITE_API_BASE_URL=https://your-render-backend.onrender.com
```

### Backend on Render

1. Create a new Web Service
2. Point it to the `server` folder
3. Build command:

```bash
npm install
```

4. Start command:

```bash
npm start
```

5. Add environment variables:

```env
GROQ_API_KEY=your_key
CLIENT_ORIGIN=https://your-vercel-app.vercel.app
GROQ_MODEL=llama3-70b-8192
GEMINI_API_KEY=your_key
GEMINI_MODEL=gemini-2.0-flash
VERCEL_PROJECT_NAME=your-vercel-project-name
```

## Hackathon angle

This prototype now uses a two-stage AI pipeline:

1. **Groq Llama generator** creates the architecture blueprint from raw requirements.
2. **Google Gemini review agent** performs a second-pass MVP validation for risks, missing modules, security gaps, and refinements.

## Submission assets

- PPT content: [`docs/presentation-outline.md`](docs/presentation-outline.md)
- Demo script: [`docs/demo-script.md`](docs/demo-script.md)
- Product positioning: [`docs/product-summary.md`](docs/product-summary.md)

## Future upgrades

- Download architecture report as PDF
- Add architecture diagram generation
- Export database schema suggestions
- Save architecture history locally
- Compare multiple tech stack options
