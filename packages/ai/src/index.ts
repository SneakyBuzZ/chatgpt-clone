import path from "path";
if (process.env.NODE_ENV !== "production") {
  import("dotenv").then((dotenv) => {
    dotenv.config({ path: path.resolve(process.cwd(), "../../.env") });
  });
}

import { GoogleGenerativeAI } from "@google/generative-ai";
export { streamText } from "ai";
export { google } from "@ai-sdk/google";
export { SYSTEM_PROMPT } from "./system-prompt";
export { memo, Message } from "./memo-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY!);

export const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});
