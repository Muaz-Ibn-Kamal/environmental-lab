"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

interface EnvironmentalEvent {
  id: string
  title: string
  description: string
  categories: { id: string; title: string }[]
  geometry: { date: string; type: string; coordinates: number[] }[]
  link: string
}

export function EnvironmentalEvents() {
  const [events, setEvents] = useState<EnvironmentalEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>("all")

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch("/api/nasa/eonet")
        const data = await response.json()
        if (data?.events) {
          setEvents(data.events.slice(0, 20))
        }
        setLoading(false)
      } catch (error) {
        console.error("Error fetching environmental events:", error)
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  const categories = ["all", "wildfires", "storms", "floods", "volcanoes", "drought"]

  const filteredEvents =
    filter === "all"
      ? events
      : events.filter((event) => event.categories.some((cat) => cat.title.toLowerCase().includes(filter)))

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Environmental Events</CardTitle>
          <CardDescription>Loading event data...</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Natural Events Tracker</CardTitle>
        <CardDescription>Real-time environmental events from NASA EONET</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                filter === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-3">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="p-4 rounded-lg border border-border hover:border-primary/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-sm">{event.title}</h4>
                  <div className="flex flex-wrap gap-1">
                    {event.categories.map((cat) => (
                      <Badge key={cat.id} variant="secondary" className="text-xs">
                        {cat.title}
                      </Badge>
                    ))}
                  </div>
                </div>
                {event.description && <p className="text-sm text-muted-foreground mb-2">{event.description}</p>}
                {event.geometry && event.geometry.length > 0 && (
                  <div className="text-xs text-muted-foreground">
                    <span className="font-mono">
                      {new Date(event.geometry[0].date).toLocaleDateString()} -{" "}
                      {event.geometry[0].coordinates.join(", ")}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
