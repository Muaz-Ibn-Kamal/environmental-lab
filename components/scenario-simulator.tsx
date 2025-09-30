"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"

export function ScenarioSimulator() {
  const [satelliteCount, setSatelliteCount] = useState([50])
  const [debrisCount, setDebrisCount] = useState([100])
  const [maneuverFrequency, setManeuverFrequency] = useState([5])
  const [simulationResult, setSimulationResult] = useState<any>(null)

  const runSimulation = () => {
    // Simulate collision risk calculation
    const baseProbability = 0.01
    const satelliteFactor = satelliteCount[0] / 50
    const debrisFactor = debrisCount[0] / 100
    const maneuverReduction = 1 - maneuverFrequency[0] / 20

    const collisionProbability = baseProbability * satelliteFactor * debrisFactor * maneuverReduction
    const score = Math.max(0, Math.min(100, 100 - collisionProbability * 5000))

    let riskLevel: "low" | "medium" | "high" | "critical"
    if (score >= 80) riskLevel = "low"
    else if (score >= 60) riskLevel = "medium"
    else if (score >= 40) riskLevel = "high"
    else riskLevel = "critical"

    setSimulationResult({
      score: Math.round(score),
      collisionProbability: (collisionProbability * 100).toFixed(3),
      riskLevel,
      satelliteCount: satelliteCount[0],
      debrisCount: debrisCount[0],
      maneuverFrequency: maneuverFrequency[0],
      recommendation:
        riskLevel === "critical"
          ? "Immediate action required: Reduce satellite density or increase collision avoidance maneuvers"
          : riskLevel === "high"
            ? "High risk detected: Consider implementing additional safety measures"
            : riskLevel === "medium"
              ? "Moderate risk: Continue monitoring and maintain current protocols"
              : "Low risk: Current operations within safe parameters",
    })
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "bg-green-500"
      case "medium":
        return "bg-yellow-500"
      case "high":
        return "bg-orange-500"
      case "critical":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Scenario Simulator</CardTitle>
        <CardDescription>Test different orbital scenarios and assess collision risks</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Satellite Count</Label>
              <span className="text-sm font-mono font-semibold">{satelliteCount[0]}</span>
            </div>
            <Slider value={satelliteCount} onValueChange={setSatelliteCount} min={10} max={200} step={10} />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Debris Objects</Label>
              <span className="text-sm font-mono font-semibold">{debrisCount[0]}</span>
            </div>
            <Slider value={debrisCount} onValueChange={setDebrisCount} min={50} max={500} step={50} />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Collision Avoidance Maneuvers (per month)</Label>
              <span className="text-sm font-mono font-semibold">{maneuverFrequency[0]}</span>
            </div>
            <Slider value={maneuverFrequency} onValueChange={setManeuverFrequency} min={0} max={20} step={1} />
          </div>
        </div>

        <Button onClick={runSimulation} className="w-full">
          Run Simulation
        </Button>

        {simulationResult && (
          <div className="space-y-4 pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Simulation Results</span>
              <Badge className={getRiskColor(simulationResult.riskLevel)}>
                {simulationResult.riskLevel.toUpperCase()}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-accent/30">
                <div className="text-sm text-muted-foreground">Health Score</div>
                <div className="text-2xl font-bold">{simulationResult.score}</div>
              </div>
              <div className="p-3 rounded-lg bg-accent/30">
                <div className="text-sm text-muted-foreground">Collision Probability</div>
                <div className="text-2xl font-bold">{simulationResult.collisionProbability}%</div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <div className="text-sm font-semibold mb-2">Recommendation</div>
              <p className="text-sm text-muted-foreground">{simulationResult.recommendation}</p>
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs">
              <div>
                <span className="text-muted-foreground">Satellites:</span>{" "}
                <span className="font-mono font-semibold">{simulationResult.satelliteCount}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Debris:</span>{" "}
                <span className="font-mono font-semibold">{simulationResult.debrisCount}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Maneuvers:</span>{" "}
                <span className="font-mono font-semibold">{simulationResult.maneuverFrequency}/mo</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
