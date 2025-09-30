"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, DollarSign, Users, Target, AlertTriangle, CheckCircle2 } from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

export function InvestorDashboard() {
  // TAM/SAM/SOM Data
  const marketData = [
    { name: "TAM", value: 12500, label: "Total Addressable Market", color: "#8b5cf6" },
    { name: "SAM", value: 4200, label: "Serviceable Available Market", color: "#6366f1" },
    { name: "SOM", value: 850, label: "Serviceable Obtainable Market", color: "#00ff88" },
  ]

  // Unit Economics
  const unitEconomics = {
    cac: 15000, // Customer Acquisition Cost
    ltv: 125000, // Lifetime Value
    ltvCacRatio: 8.3,
    paybackPeriod: 14, // months
    grossMargin: 72, // percentage
    churnRate: 8, // percentage annually
  }

  // Revenue Projections
  const revenueProjections = [
    { year: "2025", revenue: 2.5, customers: 15 },
    { year: "2026", revenue: 8.2, customers: 48 },
    { year: "2027", revenue: 22.5, customers: 135 },
    { year: "2028", revenue: 48.3, customers: 290 },
    { year: "2029", revenue: 95.7, customers: 575 },
  ]

  // Customer Segments
  const customerSegments = [
    { name: "Satellite Operators", value: 45, color: "#8b5cf6" },
    { name: "Insurance Companies", value: 25, color: "#6366f1" },
    { name: "Government Agencies", value: 20, color: "#00ff88" },
    { name: "Investment Firms", value: 10, color: "#00ddff" },
  ]

  // Key Metrics
  const keyMetrics = [
    { label: "ARR Target", value: "$8.2M", change: "+285%", icon: DollarSign, color: "text-green-500" },
    { label: "Active Customers", value: "48", change: "+220%", icon: Users, color: "text-blue-500" },
    { label: "Market Share", value: "12.5%", change: "+8.2%", icon: Target, color: "text-purple-500" },
    { label: "Gross Margin", value: "72%", change: "+5%", icon: TrendingUp, color: "text-cyan-500" },
  ]

  // Risk Factors
  const riskFactors = [
    { category: "Market Risk", level: "Medium", mitigation: "Diversified customer base across 4 segments" },
    { category: "Technical Risk", level: "Low", mitigation: "Proven NASA API integration, 99.9% uptime" },
    { category: "Regulatory Risk", level: "Low", mitigation: "Full ISO 24113 & NASA-STD 8719.14A compliance" },
    {
      category: "Competition Risk",
      level: "Medium",
      mitigation: "First-mover advantage in ESG-focused orbital analytics",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-balance">Investor Dashboard</h2>
          <p className="text-muted-foreground mt-1">Business metrics, market analysis & growth projections</p>
        </div>
        <Badge variant="outline" className="text-lg px-4 py-2">
          <TrendingUp className="w-4 h-4 mr-2" />
          Series A Ready
        </Badge>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {keyMetrics.map((metric) => (
          <Card key={metric.label}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <metric.icon className={`w-8 h-8 ${metric.color}`} />
                <Badge variant="secondary" className="text-xs">
                  {metric.change}
                </Badge>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className="text-sm text-muted-foreground">{metric.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="market" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="market">Market Size</TabsTrigger>
          <TabsTrigger value="economics">Unit Economics</TabsTrigger>
          <TabsTrigger value="projections">Projections</TabsTrigger>
          <TabsTrigger value="risks">Risk Analysis</TabsTrigger>
        </TabsList>

        {/* TAM/SAM/SOM */}
        <TabsContent value="market" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Market Opportunity</CardTitle>
                <CardDescription>Total addressable market analysis (USD Millions)</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={marketData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="name" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }}
                      labelStyle={{ color: "#fff" }}
                    />
                    <Bar dataKey="value" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {marketData.map((item) => (
                    <div key={item.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span>{item.label}</span>
                      </div>
                      <span className="font-mono font-semibold">${item.value}M</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customer Segments</CardTitle>
                <CardDescription>Revenue distribution by customer type</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={customerSegments}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {customerSegments.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }}
                      labelStyle={{ color: "#fff" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Unit Economics */}
        <TabsContent value="economics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">LTV:CAC Ratio</CardTitle>
                <CardDescription>Lifetime Value to Customer Acquisition Cost</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-green-500">{unitEconomics.ltvCacRatio}:1</div>
                <div className="mt-2 text-sm text-muted-foreground">Target: &gt;3:1 (Excellent: &gt;5:1)</div>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>LTV:</span>
                    <span className="font-mono">${(unitEconomics.ltv / 1000).toFixed(0)}K</span>
                  </div>
                  <div className="flex justify-between">
                    <span>CAC:</span>
                    <span className="font-mono">${(unitEconomics.cac / 1000).toFixed(0)}K</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Payback Period</CardTitle>
                <CardDescription>Time to recover customer acquisition cost</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-blue-500">{unitEconomics.paybackPeriod} mo</div>
                <div className="mt-2 text-sm text-muted-foreground">Target: &lt;18 months (Excellent: &lt;12)</div>
                <div className="mt-4">
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${(unitEconomics.paybackPeriod / 18) * 100}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Gross Margin</CardTitle>
                <CardDescription>Revenue minus cost of goods sold</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-purple-500">{unitEconomics.grossMargin}%</div>
                <div className="mt-2 text-sm text-muted-foreground">Target: &gt;60% (SaaS benchmark: 70-80%)</div>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Annual Churn:</span>
                    <span className="font-mono">{unitEconomics.churnRate}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Revenue Projections */}
        <TabsContent value="projections" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>5-Year Revenue Projections</CardTitle>
              <CardDescription>Projected ARR growth and customer acquisition (USD Millions)</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={revenueProjections}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="year" stroke="#888" />
                  <YAxis yAxisId="left" stroke="#888" />
                  <YAxis yAxisId="right" orientation="right" stroke="#888" />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }}
                    labelStyle={{ color: "#fff" }}
                  />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="revenue"
                    stroke="#8b5cf6"
                    strokeWidth={3}
                    name="Revenue ($M)"
                    dot={{ fill: "#8b5cf6", r: 6 }}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="customers"
                    stroke="#00ff88"
                    strokeWidth={3}
                    name="Customers"
                    dot={{ fill: "#00ff88", r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className="mt-6 grid grid-cols-5 gap-4">
                {revenueProjections.map((proj) => (
                  <div key={proj.year} className="text-center">
                    <div className="text-sm text-muted-foreground">{proj.year}</div>
                    <div className="text-lg font-bold text-purple-500">${proj.revenue}M</div>
                    <div className="text-xs text-muted-foreground">{proj.customers} customers</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Risk Analysis */}
        <TabsContent value="risks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Risk Assessment & Mitigation</CardTitle>
              <CardDescription>Comprehensive risk analysis with mitigation strategies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {riskFactors.map((risk) => (
                  <div key={risk.category} className="border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{risk.category}</h4>
                      <Badge
                        variant={risk.level === "Low" ? "secondary" : "outline"}
                        className={
                          risk.level === "Low" ? "bg-green-500/20 text-green-500" : "bg-yellow-500/20 text-yellow-500"
                        }
                      >
                        {risk.level === "Low" ? (
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                        ) : (
                          <AlertTriangle className="w-3 h-3 mr-1" />
                        )}
                        {risk.level} Risk
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{risk.mitigation}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
