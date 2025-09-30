"use client"

import { useEffect, useState } from "react"

export function StatsSection() {
  const [counts, setCounts] = useState({
    satellites: 0,
    debris: 0,
    countries: 0,
    healthScore: 0,
  })

  useEffect(() => {
    const targets = {
      satellites: 50,
      debris: 100,
      countries: 10,
      healthScore: 78,
    }

    const duration = 2000
    const steps = 60
    const interval = duration / steps

    let step = 0
    const timer = setInterval(() => {
      step++
      const progress = step / steps

      setCounts({
        satellites: Math.floor(targets.satellites * progress),
        debris: Math.floor(targets.debris * progress),
        countries: Math.floor(targets.countries * progress),
        healthScore: Math.floor(targets.healthScore * progress),
      })

      if (step >= steps) {
        clearInterval(timer)
        setCounts(targets)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-primary/10 via-background to-accent/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-5xl md:text-6xl font-bold text-primary mb-2">{counts.satellites}+</div>
            <div className="text-sm md:text-base text-muted-foreground">Active Satellites Tracked</div>
          </div>

          <div className="text-center">
            <div className="text-5xl md:text-6xl font-bold text-primary mb-2">{counts.debris}+</div>
            <div className="text-sm md:text-base text-muted-foreground">Debris Objects Monitored</div>
          </div>

          <div className="text-center">
            <div className="text-5xl md:text-6xl font-bold text-primary mb-2">{counts.countries}</div>
            <div className="text-sm md:text-base text-muted-foreground">Countries Analyzed</div>
          </div>

          <div className="text-center">
            <div className="text-5xl md:text-6xl font-bold text-primary mb-2">{counts.healthScore}</div>
            <div className="text-sm md:text-base text-muted-foreground">Orbit Health Score</div>
          </div>
        </div>
      </div>
    </section>
  )
}
