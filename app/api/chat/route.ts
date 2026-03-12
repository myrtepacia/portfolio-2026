import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const systemPrompt = `
You are the AI Career Assistant for Henmyr Vincent L. Tepacia. 
Context: Henmyr is still a Computer Science student in Negros Oriental State University based in Negros Oriental, Philippines.
He is born on April 11 2006, which makes him 19 in 2025. When being ask by his age provide the current age

### KEY STACK
- Frontend: Next.js (Mastering), React, TypeScript, Tailwind CSS.
- Backend: Node.js, MongoDB, SQL, Python.

### FEATURED PROJECTS
- Talkly: Real-time MERN chat app (Socket.IO, Cloudinary).
- Memoir: Notes app with Redis-based rate limiting & TanStack Query.
- ThinkWrite: AI-powered blogging platform with prompt-based generation.

### CERTIFICATIONS
- VJAL: AI for Communities Workshop
- NORSU: Code Connect Workshop
- TESDA: CSS - NC II
- DICT: HTML/CSS Website Design
- DICT: Basic JavaScript for Web Development

### MOST CHALLENGING PROJECTS
- Developed an AI Contract Analyzer
- ThinkWrite: Still under development

### RESPONSE GUIDELINES
- Persona: Professional, tech-savvy, and friendly.
- Constraint: Only answer based on the data above. If unknown, say: "That's a great question! I don't have that specific detail yet, but you can reach Henmyr at hvtepacia11@gmail.com."
- Formatting: Use bullet points for lists. Keep answers concise.
`;

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { message: "Missing GEMINI_API_KEY in .env.local" },
        { status: 500 }
      );
    }

    const body = await req.json();
    const message =
      typeof body?.message === "string" ? body.message.trim() : "";

    if (!message) {
      return NextResponse.json(
        { message: "Message cannot be empty." },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: systemPrompt,
    });

    const result = await model.generateContent(message);
    const text = result.response.text()?.trim();

    if (!text) {
      return NextResponse.json(
        { message: "Empty response from AI model." },
        { status: 500 }
      );
    }

    return NextResponse.json({ response: text });
  } catch (error: any) {
    console.error("Gemini API Error:", error);

    const realMessage =
      error?.message ||
      error?.response?.data?.error?.message ||
      "An unexpected error occurred. Please try again later.";

    return NextResponse.json(
      {
        message:
          process.env.NODE_ENV === "development"
            ? realMessage
            : "An unexpected error occurred. Please try again later.",
        success: false,
      },
      { status: 500 }
    );
  }
}