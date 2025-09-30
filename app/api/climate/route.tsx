import { NextResponse } from "next/server"

// Mock climate data - in production, this would integrate with real climate APIs
function generateClimateData() {
  const countries = [
    { name: "United States", code: "USA" },
    { name: "China", code: "CHN" },
    { name: "India", code: "IND" },
    { name: "Brazil", code: "BRA" },
    { name: "Russia", code: "RUS" },
    { name: "Indonesia", code: "IDN" },
    { name: "Japan", code: "JPN" },
    { name: "Germany", code: "DEU" },
    { name: "Canada", code: "CAN" },
    { name: "Australia", code: "AUS" },
  ]

  return countries.map((country) => ({
    country: country.name,
    countryCode: country.code,
    co2Emissions: Math.floor(1000000 + Math.random() * 9000000),
    deforestation: Math.random() * 5,
    carbonStock: Math.floor(50000 + Math.random() * 200000),
    waterStress: Math.floor(20 + Math.random() * 60),
    urbanEmissions: Math.floor(500000 + Math.random() * 4000000),
    lastUpdated: new Date().toISOString(),
  }))
}

export async function GET() {
  try {
    const climateData = generateClimateData()
    return NextResponse.json(climateData, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    })
    // </CHANGE>
  } catch (error) {
    console.error("[v0] Error generating climate data:", error)
    return NextResponse.json([], {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=30",
      },
    })
    // </CHANGE>
  }
}
