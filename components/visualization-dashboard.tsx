"use client"

import { useEffect, useState } from "react"
import { EarthGlobe } from "./earth-globe"
import { SatelliteTracker } from "./satellite-tracker"
import { DebrisMonitor } from "./debris-monitor"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function VisualizationDashboard() {
  const [satellites, setSatellites] = useState([])
  const [debris, setDebris] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const [satResponse, debrisResponse] = await Promise.all([
          fetch("/api/satellites?count=50"),
          fetch("/api/debris?count=100"),
        ])

        const satData = await satResponse.json()
        const debrisData = await debrisResponse.json()

        setSatellites(satData)
        setDebris(debrisData)
      } catch (error) {
        console.error("Error fetching visualization data:", error)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 10000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6">
      <Tabs defaultValue="globe" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="globe">3D Globe</TabsTrigger>
          <TabsTrigger value="satellites">Satellites</TabsTrigger>
          <TabsTrigger value="debris">Debris</TabsTrigger>
        </TabsList>

        <TabsContent value="globe" className="mt-6">
          <EarthGlobe satellites={satellites} debris={debris} />
        </TabsContent>

        <TabsContent value="satellites" className="mt-6">
          <SatelliteTracker />
        </TabsContent>

        <TabsContent value="debris" className="mt-6">
          <DebrisMonitor />
        </TabsContent>
      </Tabs>
    </div>
  )
}
