"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, TrendingDown, Minus, CheckCircle, AlertCircle } from "lucide-react"

export function ESGDashboard() {
  const esgScores = {
    environmental: {
      score: 82,
      trend: "up",
      change: 5,
      metrics: [
        { name: "Carbon Emissions", score: 85, status: "good" },
        { name: "Debris Mitigation", score: 90, status: "excellent" },
        { name: "Resource Efficiency", score: 78, status: "good" },
        { name: "Waste Management", score: 75, status: "fair" },
      ],
    },
    social: {
      score: 78,
      trend: "up",
      change: 3,
      metrics: [
        { name: "Safety Standards", score: 92, status: "excellent" },
        { name: "Community Impact", score: 70, status: "fair" },
        { name: "Transparency", score: 85, status: "good" },
        { name: "Stakeholder Engagement", score: 65, status: "fair" },
      ],
    },
    governance: {
      score: 88,
      trend: "stable",
      change: 0,
      metrics: [
        { name: "Compliance", score: 95, status: "excellent" },
        { name: "Risk Management", score: 88, status: "good" },
        { name: "Ethics & Integrity", score: 90, status: "excellent" },
        { name: "Reporting Quality", score: 80, status: "good" },
      ],
    },
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-500" />
      default:
        return <Minus className="h-4 w-4 text-yellow-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "text-green-500"
      case "good":
        return "text-blue-500"
      case "fair":
        return "text-yellow-500"
      default:
        return "text-red-500"
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-green-500"
    if (score >= 70) return "text-blue-500"
    if (score >= 60) return "text-yellow-500"
    return "text-red-500"
  }

  const overallScore = Math.round(
    (esgScores.environmental.score + esgScores.social.score + esgScores.governance.score) / 3,
  )

  return (
    <div className="space-y-6">
      <Card className="border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">ESG Performance Dashboard</CardTitle>
              <CardDescription>Environmental, Social, and Governance metrics</CardDescription>
            </div>
            <div className="text-right">
              <div className={`text-5xl font-bold ${getScoreColor(overallScore)}`}>{overallScore}</div>
              <div className="text-sm text-muted-foreground">Overall Score</div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {Object.entries(esgScores).map(([category, data]) => (
              <Card key={category}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium capitalize">{category}</span>
                    <div className="flex items-center gap-1">
                      {getTrendIcon(data.trend)}
                      {data.change !== 0 && <span className="text-xs font-mono">{Math.abs(data.change)}%</span>}
                    </div>
                  </div>
                  <div className={`text-3xl font-bold ${getScoreColor(data.score)}`}>{data.score}</div>
                  <Progress value={data.score} className="h-2 mt-2" />
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="environmental" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="environmental">Environmental</TabsTrigger>
              <TabsTrigger value="social">Social</TabsTrigger>
              <TabsTrigger value="governance">Governance</TabsTrigger>
            </TabsList>

            {Object.entries(esgScores).map(([category, data]) => (
              <TabsContent key={category} value={category} className="mt-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.metrics.map((metric) => (
                    <Card key={metric.name}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="font-semibold text-sm">{metric.name}</div>
                            <div className={`text-xs capitalize ${getStatusColor(metric.status)}`}>{metric.status}</div>
                          </div>
                          <div className={`text-2xl font-bold ${getScoreColor(metric.score)}`}>{metric.score}</div>
                        </div>
                        <Progress value={metric.score} className="h-2" />
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Key Initiatives</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {category === "environmental" && (
                      <>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-accent/30">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                          <div>
                            <div className="font-semibold text-sm">Zero Debris Policy</div>
                            <div className="text-xs text-muted-foreground">
                              Committed to leaving no debris in operational orbits
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-accent/30">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                          <div>
                            <div className="font-semibold text-sm">Sustainable Materials</div>
                            <div className="text-xs text-muted-foreground">
                              Using recyclable and eco-friendly satellite components
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {category === "social" && (
                      <>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-accent/30">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                          <div>
                            <div className="font-semibold text-sm">Public Data Access</div>
                            <div className="text-xs text-muted-foreground">
                              Making orbital and climate data freely available
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-accent/30">
                          <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
                          <div>
                            <div className="font-semibold text-sm">Community Outreach</div>
                            <div className="text-xs text-muted-foreground">Expanding educational programs</div>
                          </div>
                        </div>
                      </>
                    )}

                    {category === "governance" && (
                      <>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-accent/30">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                          <div>
                            <div className="font-semibold text-sm">ISO Compliance</div>
                            <div className="text-xs text-muted-foreground">
                              Full compliance with ISO 24113 standards
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-accent/30">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                          <div>
                            <div className="font-semibold text-sm">Transparent Reporting</div>
                            <div className="text-xs text-muted-foreground">Quarterly ESG performance reports</div>
                          </div>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Carbon Credit Verification</CardTitle>
          <CardDescription>Independent validation of environmental initiatives</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                project: "Satellite Deorbiting Program",
                credits: 150,
                status: "verified",
                date: "2024-09-15",
              },
              {
                project: "Green Launch Initiative",
                credits: 200,
                status: "verified",
                date: "2024-08-20",
              },
              {
                project: "Debris Removal Mission",
                credits: 300,
                status: "pending",
                date: "2024-09-25",
              },
            ].map((project, index) => (
              <div key={index} className="p-4 rounded-lg border border-border">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="font-semibold">{project.project}</div>
                    <div className="text-xs text-muted-foreground">{new Date(project.date).toLocaleDateString()}</div>
                  </div>
                  <Badge
                    variant={project.status === "verified" ? "default" : "secondary"}
                    className={
                      project.status === "verified"
                        ? "bg-green-500/10 text-green-500 border-green-500/20"
                        : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                    }
                  >
                    {project.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Carbon Credits</span>
                  <span className="text-lg font-bold">{project.credits} MT</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
