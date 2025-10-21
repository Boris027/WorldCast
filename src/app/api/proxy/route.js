// app/api/proxy/route.js
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const target = searchParams.get("url"); // ?url=https://example.com/api

  if (!target) {
    return NextResponse.json({ error: "Missing ?url parameter" }, { status: 400 });
  }

  try {
    const response = await fetch(target, {
      headers: { "User-Agent": "Next.js Proxy" },
      cache: "no-store",
    });

    const contentType = response.headers.get("content-type") || "application/json";
    const data = await response.text();

    return new NextResponse(data, {
      status: response.status,
      headers: {
        "Content-Type": contentType,
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
