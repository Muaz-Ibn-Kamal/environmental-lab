"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, AlertTriangle, FileText, Shield, Award } from "lucide-react"

export function ComplianceDashboard() {
  const complianceStandards = [
    {
      name: "ISO 24113",
      fullName: "Space systems — Space debris mitigation requirements",
      score: 94,
      status: "Compliant",
      requirements: [
        { item: "Post-mission disposal planning", met: true },
        { item: "Debris release prevention", met: true },
        { item: "Collision avoidance procedures", met: true },
        { item: "End-of-life disposal within 25 years", met: true },
        { item: "Passivation of energy sources", met: true },
      ],
    },
    {
      name: "NASA-STD 8719.14A",
      fullName: "Process for Limiting Orbital Debris",
      score: 91,
      status: "Compliant",
      requirements: [
        { item: "Orbital debris assessment report (ODAR)", met: true },
        { item: "Probability of collision < 0.001", met: true },
        { item: "Casualty risk < 1:10,000", met: true },
        { item: "Trackable debris limitation", met: true },
        { item: "Tether and separation mechanism safety", met: false },
      ],
    },
    {
      name: "FCC Orbital Debris",
      fullName: "FCC Orbital Debris Mitigation Rules",
      score: 96,
      status: "Compliant",
      requirements: [
        { item: "Disclosure of orbital debris mitigation plans", met: true },
        { item: "Spacecraft maneuverability", met: true },
        { item: "Collision risk assessment", met: true },
        { item: "Post-mission disposal plan", met: true },
        { item: "Casualty risk assessment", met: true },
      ],
    },
    {
      name: "UN Space Debris Guidelines",
      fullName: "UN Committee on Peaceful Uses of Outer Space",
      score: 89,
      status: "Compliant",
      requirements: [
        { item: "Limit debris released during normal operations", met: true },
        { item: "Minimize breakup potential", met: true },
        { item: "Post-mission disposal", met: true },
        { item: "Prevent on-orbit collisions", met: true },
        { item: "Avoid intentional destruction", met: true },
      ],
    },
  ]

  const overallScore = Math.round(
    complianceStandards.reduce((acc, std) => acc + std.score, 0) / complianceStandards.length,
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-balance">Compliance & Standards</h2>
          <p className="text-muted-foreground mt-1">Regulatory compliance and debris mitigation standards</p>
        </div>
        <Badge variant="outline" className="text-lg px-4 py-2 bg-green-500/20 text-green-500 border-green-500/50">
          <Shield className="w-4 h-4 mr-2" />
          {overallScore}% Compliant
        </Badge>
      </div>

      {/* Overall Compliance Score */}
      <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-transparent">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold">Overall Compliance Score</h3>
              <p className="text-sm text-muted-foreground">Across all major international standards</p>
            </div>
            <div className="text-5xl font-bold text-primary">{overallScore}%</div>
          </div>
          <Progress value={overallScore} className="h-3" />
          <div className="mt-4 flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>{complianceStandards.filter((s) => s.status === "Compliant").length} Standards Met</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-primary" />
              <span>Industry Leading Compliance</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Individual Standards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {complianceStandards.map((standard) => (
          <Card key={standard.name}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    {standard.name}
                  </CardTitle>
                  <CardDescription className="mt-1">{standard.fullName}</CardDescription>
                </div>
                <Badge variant="outline" className="bg-green-500/20 text-green-500 border-green-500/50">
                  {standard.score}%
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Progress value={standard.score} className="h-2" />
              </div>
              <div className="space-y-2">
                {standard.requirements.map((req, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm">
                    {req.met ? (
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                    )}
                    <span className={req.met ? "text-foreground" : "text-muted-foreground"}>{req.item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Compliance Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Active Compliance Measures</CardTitle>
          <CardDescription>Real-time monitoring and automated compliance checks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-5 h-5 text-blue-500" />
                <h4 className="font-semibold">Automated Monitoring</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                24/7 tracking of orbital parameters and collision probabilities
              </p>
            </div>
            <div className="border border-border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-5 h-5 text-purple-500" />
                <h4 className="font-semibold">Documentation</h4>
              </div>
              <p className="text-sm text-muted-foreground">Automated ODAR generation and compliance reporting</p>
            </div>
            <div className="border border-border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-5 h-5 text-green-500" />
                <h4 className="font-semibold">Certification Ready</h4>
              </div>
              <p className="text-sm text-muted-foreground">Pre-validated against all major regulatory frameworks</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
