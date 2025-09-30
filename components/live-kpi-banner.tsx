"use client"

import { useEffect, useState } from "react"
import { TrendingUp, Activity, Shield, Satellite } from "lucide-react"

export function LiveKPIBanner() {
  const [kpis, setKpis] = useState({
    activeSatellites: 48,
    orbitHealth: 87,
    complianceScore: 94,
    dataPoints: 125000,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setKpis((prev) => ({
        activeSatellites: prev.activeSatellites + Math.floor(Math.random() * 3) - 1,
        orbitHealth: Math.min(100, Math.max(80, prev.orbitHealth + Math.floor(Math.random() * 5) - 2)),
        complianceScore: Math.min(100, Math.max(90, prev.complianceScore + Math.floor(Math.random() * 3) - 1)),
        dataPoints: prev.dataPoints + Math.floor(Math.random() * 100),
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-accent/10 border-y border-border py-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Satellite className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold font-mono">{kpis.activeSatellites}</div>
              <div className="text-xs text-muted-foreground">Active Satellites</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-500/10">
              <Activity className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <div className="text-2xl font-bold font-mono">{kpis.orbitHealth}%</div>
              <div className="text-xs text-muted-foreground">Orbit Health</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/10">
              <Shield className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <div className="text-2xl font-bold font-mono">{kpis.complianceScore}%</div>
              <div className="text-xs text-muted-foreground">Compliance</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-500/10">
              <TrendingUp className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <div className="text-2xl font-bold font-mono">{kpis.dataPoints.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Data Points</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
