import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const PUT = async (req, res) => {
  try {
    const { id } = res.params;
    const { likes } = await req.json();

    const post = await prisma.post.update({
      where: { id },
      data: { likes: likes + 1 },
    });
    return NextResponse.json({ success: true, post });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
};
