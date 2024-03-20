import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const GET = async (req, res) => {
  try {
    const { id } = res.params;
    const comments = await prisma.comment.findMany({
      where: {
        postId: id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json({ success: true, comments });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
};

export const POST = async (req, res) => {
  try {
    const { text } = await req.json();
     const { id } = res.params;
    if (!text) {
      return NextResponse.json({
        success: false,
        error: "Text is required",
      });
    }
    const comment = await prisma.comment.create({
      data: {
        text,
        postId: id,
      },
    });
    return NextResponse.json({ success: true, comment });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
};
