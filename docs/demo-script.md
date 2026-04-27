# Demo Explanation Script

## Intro

"This project is called Requirement to System Architecture Generator. It transforms plain-language business ideas into a structured software architecture recommendation using Groq API and Llama 3, then validates the result with a Google Gemini review agent."

## Problem

"Usually, when a client says they want an app, developers still need to manually decide the architecture, tech stack, database, APIs, security, and deployment plan. That conversion takes time and can create confusion."

## Solution

"Our application solves that by allowing a user to enter a project requirement in simple English. First, the system generates a professional architecture report. Then a Google review agent checks the result for MVP risks, missing modules, security concerns, and refinement opportunities."

## Live demo flow

1. "Here I enter a sample requirement for a food delivery app."
2. "When I click generate, the frontend sends the requirement to our Express backend."
3. "The backend uses a carefully designed prompt and sends it to Groq's Llama 3 model."
4. "A Google Gemini review agent performs a second-pass validation on the generated architecture."
5. "The frontend presents the result in sections like architecture, tech stack, database design, APIs, security, scaling, deployment, and Google agent verdict."

## Why Groq

"We used Groq because it offers fast inference, which makes the product feel interactive and practical for real-time idea exploration."

## Prototype positioning

"This is intentionally designed as a strong working prototype. Instead of building unnecessary complexity like authentication or admin dashboards, we focused on delivering one core workflow extremely well."

## Closing

"The result is a startup-style prototype that is practical, visually polished, and highly relevant for students, freelancers, and early-stage product teams."
