import { NextResponse } from "next/server"
import { fetchNEO } from "@/lib/nasa-api"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const startDate = searchParams.get("start_date") || undefined
    const endDate = searchParams.get("end_date") || undefined

    const data = await fetchNEO(startDate, endDate)
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch NEO data" }, { status: 500 })
  }
}
