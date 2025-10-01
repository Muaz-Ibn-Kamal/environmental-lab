import { NextResponse } from "next/server"
import { fetchEONETEvents } from "@/lib/nasa-api"

export async function GET() {
  try {
    const data = await fetchEONETEvents()
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    })
    // </CHANGE>
  } catch (error) {
    console.error(" Error in EONET API route:", error)
    return NextResponse.json(
      {
        events: [],
        message: "Using cached data due to API unavailability",
      },
      {
        status: 200, // Return 200 instead of 500 so the app doesn't break
        headers: {
          "Cache-Control": "public, s-maxage=60",
        },
      },
    )
    // </CHANGE>
  }
}
