"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface DebrisData {
  id: string
  altitude: number
  density: number
  riskLevel: "low" | "medium" | "high" | "critical"
}

export function DebrisMonitor() {
  const [debris, setDebris] = useState<DebrisData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchDebris() {
      try {
        const response = await fetch("/api/debris?count=100")
        const data = await response.json()
        setDebris(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching debris:", error)
        setLoading(false)
      }
    }

    fetchDebris()
    const interval = setInterval(fetchDebris, 15000) // Update every 15 seconds

    return () => clearInterval(interval)
  }, [])

  const riskCounts = {
    low: debris.filter((d) => d.riskLevel === "low").length,
    medium: debris.filter((d) => d.riskLevel === "medium").length,
    high: debris.filter((d) => d.riskLevel === "high").length,
    critical: debris.filter((d) => d.riskLevel === "critical").length,
  }

  const riskColors = {
    low: "bg-green-500",
    medium: "bg-yellow-500",
    high: "bg-orange-500",
    critical: "bg-red-500",
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Debris Monitor</CardTitle>
          <CardDescription>Loading debris data...</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Orbital Debris</span>
          <Badge variant="outline" className="font-mono">
            {debris.length} objects
          </Badge>
        </CardTitle>
        <CardDescription>Space debris tracking and risk assessment</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Low Risk</span>
              <span className="font-mono font-semibold">{riskCounts.low}</span>
            </div>
            <Progress value={(riskCounts.low / debris.length) * 100} className="h-2 bg-muted [&>div]:bg-green-500" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Medium Risk</span>
              <span className="font-mono font-semibold">{riskCounts.medium}</span>
            </div>
            <Progress
              value={(riskCounts.medium / debris.length) * 100}
              className="h-2 bg-muted [&>div]:bg-yellow-500"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">High Risk</span>
              <span className="font-mono font-semibold">{riskCounts.high}</span>
            </div>
            <Progress value={(riskCounts.high / debris.length) * 100} className="h-2 bg-muted [&>div]:bg-orange-500" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Critical Risk</span>
              <span className="font-mono font-semibold">{riskCounts.critical}</span>
            </div>
            <Progress value={(riskCounts.critical / debris.length) * 100} className="h-2 bg-muted [&>div]:bg-red-500" />
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <h4 className="text-sm font-semibold mb-3">Debris Distribution</h4>
          <div className="space-y-2">
            {[
              { range: "200-500 km", count: debris.filter((d) => d.altitude >= 200 && d.altitude < 500).length },
              { range: "500-1000 km", count: debris.filter((d) => d.altitude >= 500 && d.altitude < 1000).length },
              { range: "1000-1500 km", count: debris.filter((d) => d.altitude >= 1000 && d.altitude < 1500).length },
              { range: "1500+ km", count: debris.filter((d) => d.altitude >= 1500).length },
            ].map((item) => (
              <div key={item.range} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{item.range}</span>
                <div className="flex items-center gap-2">
                  <Progress value={(item.count / debris.length) * 100} className="w-32 h-2" />
                  <span className="font-mono font-semibold w-8 text-right">{item.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Average Density</span>
            <span className="font-mono font-semibold">
              {(debris.reduce((sum, d) => sum + d.density, 0) / debris.length).toFixed(3)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
