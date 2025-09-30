"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle, AlertTriangle, XCircle } from "lucide-react"

interface OrbitHealthData {
  score: number
  shortTermRisk: "low" | "medium" | "high" | "critical"
  longTermRisk: "low" | "medium" | "high" | "critical"
  collisionProbability: number
  debrisProximity: number
  complianceGrade: string
  lastCalculated: string
}

export function OrbitHealthIndex() {
  const [healthData, setHealthData] = useState<OrbitHealthData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchHealthData() {
      try {
        const response = await fetch("/api/orbit-health")
        const data = await response.json()
        setHealthData(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching orbit health data:", error)
        setLoading(false)
      }
    }

    fetchHealthData()
    const interval = setInterval(fetchHealthData, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [])

  if (loading || !healthData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Orbit Health Index</CardTitle>
          <CardDescription>Loading health data...</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "text-green-500"
      case "medium":
        return "text-yellow-500"
      case "high":
        return "text-orange-500"
      case "critical":
        return "text-red-500"
      default:
        return "text-gray-500"
    }
  }

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case "low":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "medium":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
      case "high":
        return <AlertTriangle className="h-5 w-5 text-orange-500" />
      case "critical":
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return null
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500"
    if (score >= 60) return "text-yellow-500"
    if (score >= 40) return "text-orange-500"
    return "text-red-500"
  }

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "A":
        return "bg-green-500"
      case "B":
        return "bg-yellow-500"
      case "C":
        return "bg-orange-500"
      case "D":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Orbit Health Index</CardTitle>
              <CardDescription>Real-time LEO environmental assessment</CardDescription>
            </div>
            <div className="text-right">
              <div className={`text-5xl font-bold ${getScoreColor(healthData.score)}`}>{healthData.score}</div>
              <div className="text-sm text-muted-foreground">out of 100</div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Progress
            value={healthData.score}
            className="h-4 mb-6"
            style={
              {
                "--progress-background":
                  healthData.score >= 80
                    ? "rgb(34, 197, 94)"
                    : healthData.score >= 60
                      ? "rgb(234, 179, 8)"
                      : healthData.score >= 40
                        ? "rgb(249, 115, 22)"
                        : "rgb(239, 68, 68)",
              } as React.CSSProperties
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg border border-border bg-card">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Short-Term Risk</span>
                {getRiskIcon(healthData.shortTermRisk)}
              </div>
              <div className={`text-2xl font-bold capitalize ${getRiskColor(healthData.shortTermRisk)}`}>
                {healthData.shortTermRisk}
              </div>
              <div className="text-xs text-muted-foreground mt-1">Next 30 days</div>
            </div>

            <div className="p-4 rounded-lg border border-border bg-card">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Long-Term Risk</span>
                {getRiskIcon(healthData.longTermRisk)}
              </div>
              <div className={`text-2xl font-bold capitalize ${getRiskColor(healthData.longTermRisk)}`}>
                {healthData.longTermRisk}
              </div>
              <div className="text-xs text-muted-foreground mt-1">Next 12 months</div>
            </div>

            <div className="p-4 rounded-lg border border-border bg-card">
              <div className="text-sm font-medium mb-2">Collision Probability</div>
              <div className="text-2xl font-bold">{(healthData.collisionProbability * 100).toFixed(2)}%</div>
              <Progress value={healthData.collisionProbability * 100} className="h-2 mt-2" />
            </div>

            <div className="p-4 rounded-lg border border-border bg-card">
              <div className="text-sm font-medium mb-2">Debris Proximity</div>
              <div className="text-2xl font-bold">{(healthData.debrisProximity * 100).toFixed(1)}%</div>
              <Progress value={healthData.debrisProximity * 100} className="h-2 mt-2" />
            </div>
          </div>

          <div className="mt-6 p-4 rounded-lg bg-accent/30 border border-primary/20">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-muted-foreground">Compliance Grade</div>
                <div className="text-xs text-muted-foreground mt-1">ISO 24113 & NASA-STD 8719.14A</div>
              </div>
              <div className={`text-4xl font-bold px-4 py-2 rounded-lg ${getGradeColor(healthData.complianceGrade)}`}>
                {healthData.complianceGrade}
              </div>
            </div>
          </div>

          <div className="mt-4 text-xs text-muted-foreground text-right">
            Last updated: {new Date(healthData.lastCalculated).toLocaleString()}
          </div>
        </CardContent>
      </Card>

      {healthData.shortTermRisk === "critical" || healthData.longTermRisk === "critical" ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Critical Risk Detected</AlertTitle>
          <AlertDescription>
            Immediate action required. High collision probability detected in LEO. Review satellite trajectories and
            implement collision avoidance maneuvers.
          </AlertDescription>
        </Alert>
      ) : healthData.shortTermRisk === "high" || healthData.longTermRisk === "high" ? (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>High Risk Warning</AlertTitle>
          <AlertDescription>
            Elevated collision risk detected. Monitor satellite positions closely and prepare contingency plans.
          </AlertDescription>
        </Alert>
      ) : null}
    </div>
  )
}
