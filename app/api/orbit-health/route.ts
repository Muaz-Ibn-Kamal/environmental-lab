import { NextResponse } from "next/server"

// Calculate orbit health metrics
function calculateOrbitHealth() {
  const collisionProbability = Math.random() * 0.05
  const debrisProximity = Math.random() * 0.3
  const score = Math.max(0, Math.min(100, 100 - collisionProbability * 1000 - debrisProximity * 100))

  let shortTermRisk: "low" | "medium" | "high" | "critical"
  let longTermRisk: "low" | "medium" | "high" | "critical"

  if (score >= 80) {
    shortTermRisk = "low"
    longTermRisk = "low"
  } else if (score >= 60) {
    shortTermRisk = "medium"
    longTermRisk = "medium"
  } else if (score >= 40) {
    shortTermRisk = "high"
    longTermRisk = "high"
  } else {
    shortTermRisk = "critical"
    longTermRisk = "critical"
  }

  const complianceGrade = score >= 90 ? "A" : score >= 80 ? "B" : score >= 70 ? "C" : "D"

  return {
    score: Math.round(score),
    shortTermRisk,
    longTermRisk,
    collisionProbability,
    debrisProximity,
    complianceGrade,
    lastCalculated: new Date().toISOString(),
  }
}

export async function GET() {
  try {
    const healthData = calculateOrbitHealth()
    return NextResponse.json(healthData)
  } catch (error) {
    console.error("Error calculating orbit health:", error)
    return NextResponse.json({ error: "Failed to calculate orbit health" }, { status: 500 })
  }
}
