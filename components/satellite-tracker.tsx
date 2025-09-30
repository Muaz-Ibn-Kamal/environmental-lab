"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Satellite {
  OBJECT_NAME: string
  NORAD_CAT_ID: number
  altitude: number
  latitude: number
  longitude: number
  velocity: number
  INCLINATION: number
}

export function SatelliteTracker() {
  const [satellites, setSatellites] = useState<Satellite[]>([])
  const [selectedSatellite, setSelectedSatellite] = useState<Satellite | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchSatellites() {
      try {
        const response = await fetch("/api/satellites?count=20")
        const data = await response.json()
        setSatellites(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching satellites:", error)
        setLoading(false)
      }
    }

    fetchSatellites()
    const interval = setInterval(fetchSatellites, 10000) // Update every 10 seconds

    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Satellite Tracker</CardTitle>
          <CardDescription>Loading satellite data...</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Active Satellites</span>
          <Badge variant="outline" className="font-mono">
            {satellites.length} tracked
          </Badge>
        </CardTitle>
        <CardDescription>Real-time Low Earth Orbit satellite tracking</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-2">
            {satellites.map((sat) => (
              <button
                key={sat.NORAD_CAT_ID}
                onClick={() => setSelectedSatellite(sat)}
                className="w-full text-left p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="font-semibold text-sm">{sat.OBJECT_NAME}</div>
                    <div className="text-xs text-muted-foreground font-mono mt-1">ID: {sat.NORAD_CAT_ID}</div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {Math.round(sat.altitude)} km
                  </Badge>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-2 text-xs">
                  <div>
                    <span className="text-muted-foreground">Lat:</span>{" "}
                    <span className="font-mono">{sat.latitude.toFixed(2)}°</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Lon:</span>{" "}
                    <span className="font-mono">{sat.longitude.toFixed(2)}°</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Vel:</span>{" "}
                    <span className="font-mono">{sat.velocity.toFixed(2)} km/s</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>

        {selectedSatellite && (
          <div className="mt-4 p-4 rounded-lg bg-accent/30 border border-primary/20">
            <h4 className="font-semibold mb-3">Selected: {selectedSatellite.OBJECT_NAME}</h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-muted-foreground">NORAD ID:</span>
                <div className="font-mono">{selectedSatellite.NORAD_CAT_ID}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Altitude:</span>
                <div className="font-mono">{Math.round(selectedSatellite.altitude)} km</div>
              </div>
              <div>
                <span className="text-muted-foreground">Inclination:</span>
                <div className="font-mono">{selectedSatellite.INCLINATION.toFixed(2)}°</div>
              </div>
              <div>
                <span className="text-muted-foreground">Velocity:</span>
                <div className="font-mono">{selectedSatellite.velocity.toFixed(2)} km/s</div>
              </div>
              <div>
                <span className="text-muted-foreground">Latitude:</span>
                <div className="font-mono">{selectedSatellite.latitude.toFixed(4)}°</div>
              </div>
              <div>
                <span className="text-muted-foreground">Longitude:</span>
                <div className="font-mono">{selectedSatellite.longitude.toFixed(4)}°</div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
