"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface ClimateMetrics {
  country: string
  countryCode: string
  co2Emissions: number
  deforestation: number
  carbonStock: number
  waterStress: number
  urbanEmissions: number
  lastUpdated: string
}

export function ClimateAnalytics() {
  const [metrics, setMetrics] = useState<ClimateMetrics[]>([])
  const [selectedCountry, setSelectedCountry] = useState<ClimateMetrics | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchClimateData() {
      try {
        const response = await fetch("/api/climate")
        const data = await response.json()
        setMetrics(data)
        setSelectedCountry(data[0])
        setLoading(false)
      } catch (error) {
        console.error("Error fetching climate data:", error)
        setLoading(false)
      }
    }

    fetchClimateData()
    const interval = setInterval(fetchClimateData, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Climate Analytics</CardTitle>
          <CardDescription>Loading climate data...</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  const chartConfig = {
    co2Emissions: {
      label: "CO₂ Emissions",
      color: "hsl(var(--chart-1))",
    },
    deforestation: {
      label: "Deforestation",
      color: "hsl(var(--chart-2))",
    },
    carbonStock: {
      label: "Carbon Stock",
      color: "hsl(var(--chart-3))",
    },
    waterStress: {
      label: "Water Stress",
      color: "hsl(var(--chart-4))",
    },
    urbanEmissions: {
      label: "Urban Emissions",
      color: "hsl(var(--chart-5))",
    },
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Climate Analytics Dashboard</CardTitle>
          <CardDescription>AI-powered environmental monitoring and analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="emissions">Emissions</TabsTrigger>
              <TabsTrigger value="deforestation">Deforestation</TabsTrigger>
              <TabsTrigger value="water">Water Resources</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardDescription>Global CO₂ Emissions</CardDescription>
                    <CardTitle className="text-3xl font-bold">
                      {(metrics.reduce((sum, m) => sum + m.co2Emissions, 0) / 1000).toFixed(1)}B
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xs text-muted-foreground">Metric tons annually</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardDescription>Deforestation Rate</CardDescription>
                    <CardTitle className="text-3xl font-bold">
                      {(metrics.reduce((sum, m) => sum + m.deforestation, 0) / metrics.length).toFixed(1)}%
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xs text-muted-foreground">Average annual loss</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardDescription>Water Stress Index</CardDescription>
                    <CardTitle className="text-3xl font-bold">
                      {(metrics.reduce((sum, m) => sum + m.waterStress, 0) / metrics.length).toFixed(0)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xs text-muted-foreground">Global average score</div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Country Selector</CardTitle>
                  <CardDescription>Select a country to view detailed metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                    {metrics.map((metric) => (
                      <button
                        key={metric.countryCode}
                        onClick={() => setSelectedCountry(metric)}
                        className={`p-3 rounded-lg border text-left transition-colors ${
                          selectedCountry?.countryCode === metric.countryCode
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50 hover:bg-accent/50"
                        }`}
                      >
                        <div className="font-semibold text-sm">{metric.country}</div>
                        <div className="text-xs text-muted-foreground mt-1">{metric.countryCode}</div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {selectedCountry && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{selectedCountry.country} Metrics</span>
                      <Badge variant="outline">{selectedCountry.countryCode}</Badge>
                    </CardTitle>
                    <CardDescription>Detailed environmental indicators</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">CO₂ Emissions</div>
                        <div className="text-2xl font-bold">{selectedCountry.co2Emissions.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">MT/year</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">Deforestation</div>
                        <div className="text-2xl font-bold">{selectedCountry.deforestation.toFixed(1)}%</div>
                        <div className="text-xs text-muted-foreground">Annual rate</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">Carbon Stock</div>
                        <div className="text-2xl font-bold">{selectedCountry.carbonStock.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">MT stored</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">Water Stress</div>
                        <div className="text-2xl font-bold">{selectedCountry.waterStress}</div>
                        <div className="text-xs text-muted-foreground">Index score</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">Urban Emissions</div>
                        <div className="text-2xl font-bold">{selectedCountry.urbanEmissions.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">MT/year</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">Last Updated</div>
                        <div className="text-sm font-mono">
                          {new Date(selectedCountry.lastUpdated).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(selectedCountry.lastUpdated).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="emissions" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>CO₂ Emissions by Country</CardTitle>
                  <CardDescription>Annual carbon dioxide emissions in metric tons</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={metrics}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="countryCode" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="co2Emissions" fill="var(--color-co2Emissions)" name="CO₂ Emissions" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Urban vs Total Emissions</CardTitle>
                  <CardDescription>Comparison of urban and total emissions</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={metrics}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="countryCode" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="co2Emissions"
                          stroke="var(--color-co2Emissions)"
                          name="Total Emissions"
                        />
                        <Line
                          type="monotone"
                          dataKey="urbanEmissions"
                          stroke="var(--color-urbanEmissions)"
                          name="Urban Emissions"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="deforestation" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Deforestation Rates</CardTitle>
                  <CardDescription>Annual forest loss percentage by country</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={metrics}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="country" angle={-45} textAnchor="end" height={100} />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="deforestation" fill="var(--color-deforestation)" name="Deforestation Rate %" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Carbon Stock Analysis</CardTitle>
                  <CardDescription>Total carbon stored in forests (metric tons)</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={metrics}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="countryCode" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="carbonStock" fill="var(--color-carbonStock)" name="Carbon Stock" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="water" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Water Stress Index</CardTitle>
                  <CardDescription>Water scarcity and stress levels by country</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={metrics}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="country" angle={-45} textAnchor="end" height={100} />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="waterStress" fill="var(--color-waterStress)" name="Water Stress Index" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Low Stress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-500">
                      {metrics.filter((m) => m.waterStress < 33).length}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">Countries</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Medium Stress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-yellow-500">
                      {metrics.filter((m) => m.waterStress >= 33 && m.waterStress < 66).length}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">Countries</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">High Stress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-500">
                      {metrics.filter((m) => m.waterStress >= 66).length}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">Countries</div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
