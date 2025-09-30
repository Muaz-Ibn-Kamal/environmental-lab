import { NextResponse } from "next/server"
import { fetchAPOD } from "@/lib/nasa-api"

export async function GET() {
  try {
    const data = await fetchAPOD()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch APOD data" }, { status: 500 })
  }
}
