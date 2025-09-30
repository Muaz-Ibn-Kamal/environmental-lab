import { NextResponse } from "next/server"

// Mock satellite data - in production, this would fetch from a real satellite tracking API
function generateSatelliteData() {
  const satellites = []
  const operators = ["SpaceX", "NASA", "ESA", "ISRO", "JAXA", "Commercial"]
  const types = ["Communication", "Earth Observation", "Navigation", "Scientific", "Weather"]
  const purposes = [
    "Global internet coverage and connectivity",
    "Climate monitoring and environmental research",
    "GPS and navigation services",
    "Space exploration and research",
    "Weather forecasting and disaster monitoring",
  ]

  for (let i = 0; i < 50; i++) {
    const lat = (Math.random() - 0.5) * 180
    const lon = (Math.random() - 0.5) * 360
    const alt = 400 + Math.random() * 600 // LEO altitude range
    const typeIndex = Math.floor(Math.random() * types.length)

    satellites.push({
      id: `SAT-${String(i + 1).padStart(3, "0")}`,
      name: `${types[typeIndex]}-${i + 1}`,
      OBJECT_NAME: `${types[typeIndex].toUpperCase()}-${i + 1}`,
      operator: operators[Math.floor(Math.random() * operators.length)],
      type: types[typeIndex],
      purpose: purposes[typeIndex],
      position: {
        latitude: lat,
        longitude: lon,
        altitude: alt,
      },
      velocity: 7.5 + Math.random() * 0.5,
      INCLINATION: 45 + Math.random() * 60,
      status: Math.random() > 0.1 ? "operational" : "degraded",
      launchDate: new Date(2020 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 12), 1).toISOString(),
    })
  }

  return satellites
}

export async function GET() {
  try {
    const satellites = generateSatelliteData()
    return NextResponse.json(satellites, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
      },
    })
    // </CHANGE>
  } catch (error) {
    console.error("[v0] Error generating satellite data:", error)
    return NextResponse.json([], {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=30",
      },
    })
    // </CHANGE>
  }
}
