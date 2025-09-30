"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"

interface Satellite {
  name: string
  latitude: number
  longitude: number
  altitude: number
}

interface Debris {
  id: string
  latitude: number
  longitude: number
  riskLevel: "low" | "medium" | "high" | "critical"
}

interface EarthGlobeProps {
  satellites?: Satellite[]
  debris?: Debris[]
  selectedCountry?: string | null
  onCountryClick?: (country: string) => void
}

export function EarthGlobe({ satellites = [], debris = [], selectedCountry, onCountryClick }: EarthGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [rotation, setRotation] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [lastX, setLastX] = useState(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height
    const centerX = width / 2
    const centerY = height / 2
    const radius = Math.min(width, height) / 2 - 20

    // Clear canvas
    ctx.fillStyle = "#000000"
    ctx.fillRect(0, 0, width, height)

    // Draw stars
    ctx.fillStyle = "#ffffff"
    for (let i = 0; i < 200; i++) {
      const x = Math.random() * width
      const y = Math.random() * height
      const size = Math.random() * 1.5
      ctx.beginPath()
      ctx.arc(x, y, size, 0, Math.PI * 2)
      ctx.fill()
    }

    // Draw Earth glow
    const gradient = ctx.createRadialGradient(centerX, centerY, radius * 0.8, centerX, centerY, radius * 1.2)
    gradient.addColorStop(0, "rgba(100, 150, 255, 0)")
    gradient.addColorStop(0.8, "rgba(100, 150, 255, 0.1)")
    gradient.addColorStop(1, "rgba(100, 150, 255, 0.3)")
    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius * 1.2, 0, Math.PI * 2)
    ctx.fill()

    // Draw Earth
    const earthGradient = ctx.createRadialGradient(
      centerX - radius * 0.3,
      centerY - radius * 0.3,
      0,
      centerX,
      centerY,
      radius,
    )
    earthGradient.addColorStop(0, "#4a90e2")
    earthGradient.addColorStop(0.5, "#2c5aa0")
    earthGradient.addColorStop(1, "#1a3a6e")
    ctx.fillStyle = earthGradient
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
    ctx.fill()

    // Draw continents (simplified)
    ctx.fillStyle = "#2d5016"
    ctx.strokeStyle = "#3d6026"
    ctx.lineWidth = 1

    // Simplified continent shapes
    const continents = [
      // North America
      { x: centerX - radius * 0.5, y: centerY - radius * 0.3, w: radius * 0.4, h: radius * 0.5 },
      // South America
      { x: centerX - radius * 0.3, y: centerY + radius * 0.1, w: radius * 0.25, h: radius * 0.4 },
      // Europe
      { x: centerX + radius * 0.1, y: centerY - radius * 0.4, w: radius * 0.2, h: radius * 0.25 },
      // Africa
      { x: centerX + radius * 0.1, y: centerY - radius * 0.1, w: radius * 0.3, h: radius * 0.5 },
      // Asia
      { x: centerX + radius * 0.3, y: centerY - radius * 0.5, w: radius * 0.4, h: radius * 0.6 },
    ]

    continents.forEach((continent) => {
      const adjustedX = continent.x + (rotation * radius) / 10
      if (adjustedX > centerX - radius && adjustedX < centerX + radius) {
        ctx.beginPath()
        ctx.ellipse(adjustedX, continent.y, continent.w, continent.h, 0, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()
      }
    })

    // Draw grid lines
    ctx.strokeStyle = "rgba(100, 150, 255, 0.2)"
    ctx.lineWidth = 0.5

    // Latitude lines
    for (let i = -2; i <= 2; i++) {
      ctx.beginPath()
      const y = centerY + (i * radius) / 3
      const width = Math.sqrt(radius * radius - ((i * radius) / 3) ** 2) * 2
      ctx.ellipse(centerX, y, width / 2, radius / 15, 0, 0, Math.PI * 2)
      ctx.stroke()
    }

    // Longitude lines
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI) / 4 + rotation / 2
      ctx.beginPath()
      ctx.ellipse(centerX, centerY, radius * Math.abs(Math.cos(angle)), radius, 0, 0, Math.PI * 2)
      ctx.stroke()
    }

    // Draw satellites
    satellites.forEach((sat) => {
      const angle = ((sat.longitude + rotation * 50) * Math.PI) / 180
      const latRad = (sat.latitude * Math.PI) / 180
      const distance = radius + (sat.altitude / 1000) * 2

      const x = centerX + distance * Math.cos(angle) * Math.cos(latRad)
      const y = centerY + distance * Math.sin(latRad)

      // Satellite dot
      ctx.fillStyle = "#00ff88"
      ctx.beginPath()
      ctx.arc(x, y, 3, 0, Math.PI * 2)
      ctx.fill()

      // Satellite orbit trail
      ctx.strokeStyle = "rgba(0, 255, 136, 0.3)"
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.arc(centerX, centerY, distance, 0, Math.PI * 2)
      ctx.stroke()
    })

    // Draw debris
    debris.forEach((deb) => {
      const angle = ((deb.longitude + rotation * 50) * Math.PI) / 180
      const latRad = (deb.latitude * Math.PI) / 180
      const distance = radius + 50

      const x = centerX + distance * Math.cos(angle) * Math.cos(latRad)
      const y = centerY + distance * Math.sin(latRad)

      // Debris color based on risk level
      const colors = {
        low: "#ffff00",
        medium: "#ff9900",
        high: "#ff4400",
        critical: "#ff0000",
      }

      ctx.fillStyle = colors[deb.riskLevel]
      ctx.beginPath()
      ctx.arc(x, y, 2, 0, Math.PI * 2)
      ctx.fill()
    })

    // Auto-rotate
    if (!isDragging) {
      const animationFrame = requestAnimationFrame(() => {
        setRotation((prev) => (prev + 0.002) % (Math.PI * 2))
      })
      return () => cancelAnimationFrame(animationFrame)
    }
  }, [rotation, satellites, debris, isDragging])

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true)
    setLastX(e.clientX)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDragging) {
      const deltaX = e.clientX - lastX
      setRotation((prev) => prev + deltaX * 0.01)
      setLastX(e.clientX)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  return (
    <Card className="relative overflow-hidden bg-black border-primary/20">
      <canvas
        ref={canvasRef}
        width={800}
        height={800}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
      <div className="absolute top-4 left-4 text-white/80 text-sm font-mono">
        <div>Satellites: {satellites.length}</div>
        <div>Debris Objects: {debris.length}</div>
        <div className="mt-2 text-xs text-white/60">Drag to rotate</div>
      </div>
    </Card>
  )
}
