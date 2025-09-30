"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertCircle } from "lucide-react"

interface ComplianceItem {
  id: string
  standard: string
  requirement: string
  status: "compliant" | "non-compliant" | "warning"
  description: string
}

export function ComplianceChecker() {
  const complianceItems: ComplianceItem[] = [
    {
      id: "iso-1",
      standard: "ISO 24113",
      requirement: "Orbital Debris Mitigation",
      status: "compliant",
      description: "Satellite design includes end-of-life disposal plan",
    },
    {
      id: "iso-2",
      standard: "ISO 24113",
      requirement: "Collision Avoidance",
      status: "compliant",
      description: "Active collision avoidance system operational",
    },
    {
      id: "nasa-1",
      standard: "NASA-STD 8719.14A",
      requirement: "Post-Mission Disposal",
      status: "warning",
      description: "Disposal timeline within acceptable range but approaching limit",
    },
    {
      id: "nasa-2",
      standard: "NASA-STD 8719.14A",
      requirement: "Debris Release Prevention",
      status: "compliant",
      description: "No unintended debris release detected",
    },
    {
      id: "iso-3",
      standard: "ISO 24113",
      requirement: "Passivation",
      status: "compliant",
      description: "All energy sources can be safely depleted",
    },
    {
      id: "nasa-3",
      standard: "NASA-STD 8719.14A",
      requirement: "Trackability",
      status: "compliant",
      description: "Satellite meets minimum size requirements for tracking",
    },
    {
      id: "iso-4",
      standard: "ISO 24113",
      requirement: "Operational Procedures",
      status: "compliant",
      description: "Documented procedures for anomaly response",
    },
    {
      id: "nasa-4",
      standard: "NASA-STD 8719.14A",
      requirement: "Casualty Risk Assessment",
      status: "compliant",
      description: "Re-entry casualty risk below 1:10,000 threshold",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "compliant":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "non-compliant":
        return <XCircle className="h-5 w-5 text-red-500" />
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "compliant":
        return (
          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
            Compliant
          </Badge>
        )
      case "non-compliant":
        return (
          <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">
            Non-Compliant
          </Badge>
        )
      case "warning":
        return (
          <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
            Warning
          </Badge>
        )
      default:
        return null
    }
  }

  const compliantCount = complianceItems.filter((item) => item.status === "compliant").length
  const warningCount = complianceItems.filter((item) => item.status === "warning").length
  const nonCompliantCount = complianceItems.filter((item) => item.status === "non-compliant").length

  return (
    <Card>
      <CardHeader>
        <CardTitle>Compliance Status</CardTitle>
        <CardDescription>ISO 24113 & NASA-STD 8719.14A Requirements</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
            <div className="text-2xl font-bold text-green-500">{compliantCount}</div>
            <div className="text-xs text-muted-foreground">Compliant</div>
          </div>
          <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
            <div className="text-2xl font-bold text-yellow-500">{warningCount}</div>
            <div className="text-xs text-muted-foreground">Warnings</div>
          </div>
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
            <div className="text-2xl font-bold text-red-500">{nonCompliantCount}</div>
            <div className="text-xs text-muted-foreground">Non-Compliant</div>
          </div>
        </div>

        <div className="space-y-3">
          {complianceItems.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-lg border border-border hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getStatusIcon(item.status)}
                  <div>
                    <div className="font-semibold text-sm">{item.requirement}</div>
                    <div className="text-xs text-muted-foreground">{item.standard}</div>
                  </div>
                </div>
                {getStatusBadge(item.status)}
              </div>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
