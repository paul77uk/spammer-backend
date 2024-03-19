import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers.js";

export const GET = async () => {
  const posts = await prisma.post.findMany();
  return NextResponse.json({
    success: true,
    posts,
  });
};

export const POST = async (req) => {
  options = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  };
  try {
    const { text } = await req.json();
    if (!text) {
      return NextResponse.json({ success: false, error: "Text is required" });
    }
    const post = await prisma.post.create({
      data: {
        text,
      },
    });
    return NextResponse.json({ success: true, post });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
};
