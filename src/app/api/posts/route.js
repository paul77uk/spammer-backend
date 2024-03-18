import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const GET = async (req, res) => {
  await nextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "http://localhost:3000", // or '*' to allow any origin
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });
  const posts = await prisma.post.findMany();
  return NextResponse.json({
    success: true,
    posts,
  });
};

export const POST = async (req) => {
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
