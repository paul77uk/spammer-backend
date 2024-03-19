import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const GET = async () => {
  const posts = await prisma.post.findMany();
  return NextResponse.json({
    success: true,
    posts,
  });
};

export const POST = async (req) => {
  const origin = req.headers.get("origin");
  try {
    const { text } = await req.json();
    if (!text) {
      return NextResponse.json({
        success: false,
        error: "Text is required",
      });
    }
    const post = await prisma.post.create({
      data: {
        text,
      },
    });
    return NextResponse.json({ success: true, post, headers: {
      "Access-Control-Allow-Origin":origin || "*",
      "Content-Type":"application/json"
    }});
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
};
