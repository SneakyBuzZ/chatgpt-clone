import { getSignature } from "@chatgpt/cloudinary";
import { NextResponse } from "next/server";

export async function GET() {
  const response = getSignature();
  return NextResponse.json(response);
}
