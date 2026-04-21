import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { v4 as uuidv4 } from "uuid";
import path from "path";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const ext = path.extname(file.name) || ".png";
  const filename = `${uuidv4()}${ext}`;

  // Prefer Vercel Blob when configured; otherwise fall back to a data URL so
  // submissions still work in local/dev environments without a blob token.
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const blob = await put(filename, file, { access: "public" });
      return NextResponse.json({ url: blob.url });
    } catch (err) {
      console.warn(
        "[api/upload] Vercel Blob upload failed, falling back to data URL:",
        err instanceof Error ? err.message : err
      );
    }
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const mime = file.type || "application/octet-stream";
  const dataUrl = `data:${mime};base64,${buffer.toString("base64")}`;
  return NextResponse.json({ url: dataUrl });
}
