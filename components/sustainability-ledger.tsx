"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Clock, AlertCircle, TrendingUp, TrendingDown } from "lucide-react"

interface SatelliteLifecycle {
  id: string
  name: string
  operator: string
  launchDate: string
  expectedEOL: string
  status: "active" | "deorbiting" | "compliant" | "warning"
  carbonFootprint: number
  disposalPlan: string
  complianceScore: number
}

export function SustainabilityLedger() {
  const [satellites] = useState<SatelliteLifecycle[]>([
    {
      id: "SAT-001",
      name: "STARLINK-2847",
      operator: "SpaceX",
      launchDate: "2023-01-15",
      expectedEOL: "2028-01-15",
      status: "active",
      carbonFootprint: 2.4,
      disposalPlan: "Controlled deorbit within 5 years",
      complianceScore: 95,
    },
    {
      id: "SAT-002",
      name: "TERRA-SAT-12",
      operator: "NASA",
      launchDate: "2021-06-20",
      expectedEOL: "2026-06-20",
      status: "compliant",
      carbonFootprint: 3.1,
      disposalPlan: "Atmospheric re-entry",
      complianceScore: 98,
    },
    {
      id: "SAT-003",
      name: "COMM-SAT-45",
      operator: "Commercial Operator",
      launchDate: "2020-03-10",
      expectedEOL: "2025-03-10",
      status: "warning",
      carbonFootprint: 4.2,
      disposalPlan: "Graveyard orbit transfer",
      complianceScore: 72,
    },
    {
      id: "SAT-004",
      name: "WEATHER-SAT-8",
      operator: "NOAA",
      launchDate: "2022-09-05",
      expectedEOL: "2032-09-05",
      status: "active",
      carbonFootprint: 2.8,
      disposalPlan: "Controlled deorbit",
      complianceScore: 92,
    },
    {
      id: "SAT-005",
      name: "GPS-III-07",
      operator: "US Space Force",
      launchDate: "2023-08-12",
      expectedEOL: "2038-08-12",
      status: "active",
      carbonFootprint: 3.5,
      disposalPlan: "Long-term operational",
      complianceScore: 88,
    },
  ])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "compliant":
        return <CheckCircle className="h-4 w-4 text-blue-500" />
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case "deorbiting":
        return <Clock className="h-4 w-4 text-orange-500" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: "default" | "secondary" | "outline"; className: string }> = {
      active: { variant: "default", className: "bg-green-500/10 text-green-500 border-green-500/20" },
      compliant: { variant: "default", className: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
      warning: { variant: "default", className: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" },
      deorbiting: { variant: "default", className: "bg-orange-500/10 text-orange-500 border-orange-500/20" },
    }

    const config = variants[status] || variants.active

    return (
      <Badge variant="outline" className={config.className}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const totalCarbonFootprint = satellites.reduce((sum, sat) => sum + sat.carbonFootprint, 0)
  const avgComplianceScore = satellites.reduce((sum, sat) => sum + sat.complianceScore, 0) / satellites.length

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sustainability Ledger</CardTitle>
        <CardDescription>Satellite lifecycle tracking and environmental impact assessment</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="satellites">Satellites</TabsTrigger>
            <TabsTrigger value="impact">Impact</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Total Satellites</CardDescription>
                  <CardTitle className="text-3xl">{satellites.length}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">Tracked in ledger</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Carbon Footprint</CardDescription>
                  <CardTitle className="text-3xl">{totalCarbonFootprint.toFixed(1)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">MT CO₂ equivalent</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Avg Compliance</CardDescription>
                  <CardTitle className="text-3xl">{avgComplianceScore.toFixed(0)}%</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">Sustainability score</div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Status Distribution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {["active", "compliant", "warning", "deorbiting"].map((status) => {
                  const count = satellites.filter((s) => s.status === status).length
                  const percentage = (count / satellites.length) * 100

                  return (
                    <div key={status} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="capitalize">{status}</span>
                        <span className="font-mono font-semibold">{count}</span>
                      </div>
                      <Progress value={percentage} className="h-2" />
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="satellites" className="mt-6">
            <div className="space-y-3">
              {satellites.map((sat) => (
                <Card key={sat.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(sat.status)}
                        <div>
                          <div className="font-semibold">{sat.name}</div>
                          <div className="text-xs text-muted-foreground">{sat.operator}</div>
                        </div>
                      </div>
                      {getStatusBadge(sat.status)}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                      <div>
                        <div className="text-muted-foreground text-xs">Launch Date</div>
                        <div className="font-mono">{new Date(sat.launchDate).toLocaleDateString()}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground text-xs">Expected EOL</div>
                        <div className="font-mono">{new Date(sat.expectedEOL).toLocaleDateString()}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground text-xs">Carbon Footprint</div>
                        <div className="font-mono">{sat.carbonFootprint} MT</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground text-xs">Compliance</div>
                        <div className="font-mono">{sat.complianceScore}%</div>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-border">
                      <div className="text-xs text-muted-foreground mb-1">Disposal Plan</div>
                      <div className="text-sm">{sat.disposalPlan}</div>
                    </div>

                    <Progress value={sat.complianceScore} className="h-2 mt-3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="impact" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Environmental Impact Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-accent/30">
                    <div className="text-sm text-muted-foreground mb-2">Total Carbon Emissions</div>
                    <div className="text-2xl font-bold">{totalCarbonFootprint.toFixed(2)} MT</div>
                    <div className="flex items-center gap-1 text-xs text-green-500 mt-1">
                      <TrendingDown className="h-3 w-3" />
                      <span>12% reduction from last quarter</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-accent/30">
                    <div className="text-sm text-muted-foreground mb-2">Disposal Compliance</div>
                    <div className="text-2xl font-bold">
                      {satellites.filter((s) => s.complianceScore >= 80).length}/{satellites.length}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-green-500 mt-1">
                      <TrendingUp className="h-3 w-3" />
                      <span>Above industry standard</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>Satellites with EOL plans</span>
                    <span className="font-mono font-semibold">{satellites.length}/5</span>
                  </div>
                  <Progress value={100} className="h-2" />

                  <div className="flex items-center justify-between text-sm">
                    <span>Compliance rate</span>
                    <span className="font-mono font-semibold">{avgComplianceScore.toFixed(0)}%</span>
                  </div>
                  <Progress value={avgComplianceScore} className="h-2" />

                  <div className="flex items-center justify-between text-sm">
                    <span>Carbon offset initiatives</span>
                    <span className="font-mono font-semibold">3/5</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Sustainability Initiatives</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  {
                    title: "Active Debris Removal Program",
                    status: "active",
                    impact: "High",
                    description: "Participating in international debris removal initiatives",
                  },
                  {
                    title: "Green Propulsion Systems",
                    status: "planning",
                    impact: "Medium",
                    description: "Transitioning to environmentally friendly propellants",
                  },
                  {
                    title: "Carbon Offset Credits",
                    status: "active",
                    impact: "Medium",
                    description: "Purchasing verified carbon credits for launch emissions",
                  },
                  {
                    title: "Extended Mission Life",
                    status: "active",
                    impact: "High",
                    description: "Optimizing satellite longevity to reduce launch frequency",
                  },
                ].map((initiative, index) => (
                  <div key={index} className="p-3 rounded-lg border border-border">
                    <div className="flex items-start justify-between mb-2">
                      <div className="font-semibold text-sm">{initiative.title}</div>
                      <Badge variant="secondary" className="text-xs">
                        {initiative.impact} Impact
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{initiative.description}</p>
                    <div className="flex items-center gap-2">
                      {initiative.status === "active" ? (
                        <CheckCircle className="h-3 w-3 text-green-500" />
                      ) : (
                        <Clock className="h-3 w-3 text-yellow-500" />
                      )}
                      <span className="text-xs capitalize">{initiative.status}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
