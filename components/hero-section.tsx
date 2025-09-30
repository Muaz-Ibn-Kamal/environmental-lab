"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Satellite, TrendingUp, BarChart3, Shield, Zap } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export function HeroSection() {
  const [stats, setStats] = useState({
    satellites: 0,
    debris: 0,
    compliance: 0,
    uptime: 0,
  })

  useEffect(() => {
    const targetStats = {
      satellites: 48,
      debris: 12500,
      compliance: 94,
      uptime: 99.9,
    }

    const duration = 2000
    const steps = 60
    const interval = duration / steps

    let step = 0
    const timer = setInterval(() => {
      step++
      const progress = step / steps

      setStats({
        satellites: Math.floor(targetStats.satellites * progress),
        debris: Math.floor(targetStats.debris * progress),
        compliance: Math.floor(targetStats.compliance * progress),
        uptime: Number.parseFloat((targetStats.uptime * progress).toFixed(1)),
      })

      if (step >= steps) {
        clearInterval(timer)
        setStats(targetStats)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [])
  // </CHANGE>

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-accent/10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-pulse">
          <Zap className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">Investor-Grade LEO Intelligence Platform</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-500 border border-green-500/30">
            Live
          </span>
        </div>
        {/* </CHANGE> */}

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-balance">
          <span className="bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
            LEO Environmental Lab
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-3xl mx-auto text-balance">
          See LEO. Know Risk. Ensure Sustainability.
        </p>

        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty leading-relaxed">
          Real-time orbital monitoring, climate analytics, and sustainability verification powered by NASA data and
          advanced AI
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-12 p-6 rounded-lg bg-card/50 backdrop-blur border border-primary/20">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary font-mono">{stats.satellites}</div>
            <div className="text-xs text-muted-foreground mt-1">Active Satellites</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary font-mono">{stats.debris.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground mt-1">Debris Tracked</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary font-mono">{stats.compliance}%</div>
            <div className="text-xs text-muted-foreground mt-1">Compliance Score</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary font-mono">{stats.uptime}%</div>
            <div className="text-xs text-muted-foreground mt-1">System Uptime</div>
          </div>
        </div>
        {/* </CHANGE> */}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Button size="lg" className="text-lg px-8 group" asChild>
            <Link href="#visualization">
              Explore 3D Visualization
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent" asChild>
            <Link href="#investor">View Investor Metrics</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="p-6 rounded-lg bg-card/50 backdrop-blur border border-border hover:border-primary/50 transition-all hover:scale-105">
            <Satellite className="h-10 w-10 text-primary mb-4 mx-auto" />
            <h3 className="text-lg font-semibold mb-2">3D Orbital Tracking</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Interactive 3D visualization with real-time satellite positions and mission details
            </p>
            <div className="flex items-center justify-center gap-2 text-xs text-primary">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span>Live Data Feed</span>
            </div>
          </div>

          <div className="p-6 rounded-lg bg-card/50 backdrop-blur border border-border hover:border-primary/50 transition-all hover:scale-105">
            <BarChart3 className="h-10 w-10 text-primary mb-4 mx-auto" />
            <h3 className="text-lg font-semibold mb-2">Business Intelligence</h3>
            <p className="text-sm text-muted-foreground mb-3">
              TAM/SAM/SOM analysis, unit economics, and 5-year revenue projections
            </p>
            <div className="flex items-center justify-center gap-2 text-xs text-primary">
              <TrendingUp className="w-3 h-3" />
              <span>8.3:1 LTV:CAC Ratio</span>
            </div>
          </div>

          <div className="p-6 rounded-lg bg-card/50 backdrop-blur border border-border hover:border-primary/50 transition-all hover:scale-105">
            <Shield className="h-10 w-10 text-primary mb-4 mx-auto" />
            <h3 className="text-lg font-semibold mb-2">Full Compliance</h3>
            <p className="text-sm text-muted-foreground mb-3">
              ISO 24113, NASA-STD 8719.14A, FCC, and UN Space Debris Guidelines
            </p>
            <div className="flex items-center justify-center gap-2 text-xs text-primary">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span>94% Compliance Score</span>
            </div>
          </div>
        </div>
        {/* </CHANGE> */}
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(50px);
            opacity: 0;
          }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </section>
  )
}
