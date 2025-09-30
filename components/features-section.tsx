"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Satellite, Shield, BarChart3, Globe, AlertTriangle, CheckCircle, TrendingUp, Database } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: Satellite,
      title: "Real-Time Satellite Tracking",
      description:
        "Monitor 50+ active satellites in Low Earth Orbit with live position updates and trajectory analysis",
      badge: "Live Data",
    },
    {
      icon: AlertTriangle,
      title: "Debris Risk Assessment",
      description: "Track 100+ debris objects with automated risk scoring and collision probability calculations",
      badge: "AI-Powered",
    },
    {
      icon: Shield,
      title: "Compliance Monitoring",
      description: "Automated checking against ISO 24113 and NASA-STD 8719.14A orbital debris mitigation standards",
      badge: "Certified",
    },
    {
      icon: BarChart3,
      title: "Climate Analytics",
      description: "AI-driven analysis of CO₂ emissions, deforestation, water stress, and carbon stock variations",
      badge: "NASA Data",
    },
    {
      icon: Globe,
      title: "3D Earth Visualization",
      description:
        "Interactive globe with satellite tracks, debris heatmaps, and country-specific environmental metrics",
      badge: "Interactive",
    },
    {
      icon: CheckCircle,
      title: "Orbit Health Index",
      description: "Comprehensive scoring system for LEO environmental health with short and long-term risk assessment",
      badge: "Real-Time",
    },
    {
      icon: TrendingUp,
      title: "ESG Reporting",
      description: "Independent verification of sustainability initiatives and carbon credit validation",
      badge: "Transparent",
    },
    {
      icon: Database,
      title: "Scenario Simulation",
      description: "Test different orbital configurations and predict collision risks with adjustable parameters",
      badge: "Predictive",
    },
  ]

  return (
    <section className="py-20 px-4 bg-accent/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Platform Features</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Comprehensive tools for orbital monitoring, climate analysis, and sustainability verification
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Card
                key={feature.title}
                className="hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
