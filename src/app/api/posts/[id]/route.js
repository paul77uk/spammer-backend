import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const GET = async (req, res) => {
  try {
    const { id } = res.params;
    const post = await prisma.post.findUnique({ where: { id } });
    if (!post) {
      return NextResponse.json({
        success: false,
        status: 404,
        message: "Post not found",
      });
    }
    return NextResponse.json({ success: true, post });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
};

// could use findFirst instead of findUnique to return null if not found, but findUnique is more explicit, and it's better to return a 404 if the post is not found. findUnique is also more efficient, as it will only return one result, and it will throw an error if more than one result is found. findFirst will return the first result found, and it will not throw an error if more than one result is found. findUnique is the best choice for this use case.

export const PUT = async (req, res) => {
  try {
    const { id } = res.params;
    const { text } = await req.json();
    if (!text) {
      return NextResponse.json({ success: false, error: "Text is required" });
    }
    const post = await prisma.post.update({
      where: { id },
      data: { text },
    });
    return NextResponse.json({ success: true, post });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
};

export const DELETE = async (req, res) => {
  try {
    const { id } = res.params;
    const post = await prisma.post.delete({ where: { id } });
    return NextResponse.json({ success: true, post });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
};
