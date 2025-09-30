import { NextResponse } from "next/server"

// Mock debris data - in production, this would fetch from a real space debris tracking API
function generateDebrisData() {
  const debris = []
  const sources = ["Rocket Body", "Satellite Fragment", "Collision Debris", "Mission-Related", "Unknown"]

  for (let i = 0; i < 100; i++) {
    const lat = (Math.random() - 0.5) * 180
    const lon = (Math.random() - 0.5) * 360
    const alt = 300 + Math.random() * 800

    debris.push({
      id: `DEB-${String(i + 1).padStart(4, "0")}`,
      source: sources[Math.floor(Math.random() * sources.length)],
      position: {
        latitude: lat,
        longitude: lon,
        altitude: alt,
      },
      size: Math.random() * 10, // Size in cm
      velocity: 7 + Math.random() * 1,
      riskLevel: Math.random() > 0.7 ? "high" : Math.random() > 0.4 ? "medium" : "low",
      trackingConfidence: 0.6 + Math.random() * 0.4,
    })
  }

  return debris
}

export async function GET() {
  try {
    const debris = generateDebrisData()
    return NextResponse.json(debris)
  } catch (error) {
    console.error("Error generating debris data:", error)
    return NextResponse.json({ error: "Failed to fetch debris data" }, { status: 500 })
  }
}
