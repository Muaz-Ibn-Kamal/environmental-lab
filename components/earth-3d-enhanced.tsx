"use client"

import { useRef, useState, useEffect, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Stars, Html } from "@react-three/drei"
import * as THREE from "three"
import { Card } from "@/components/ui/card"
import { Satellite, Wifi, Camera, Navigation } from "lucide-react"

interface SatelliteData {
  OBJECT_NAME: string
  NORAD_CAT_ID: number
  altitude: number
  latitude: number
  longitude: number
  velocity: number
  INCLINATION: number
  purpose?: string
  operator?: string
}

interface SatelliteMarkerProps {
  satellite: SatelliteData
  onClick: (sat: SatelliteData) => void
  isSelected: boolean
}

function SatelliteMarker({ satellite, onClick, isSelected }: SatelliteMarkerProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  const altitude = satellite.altitude ?? 400
  const latitude = satellite.latitude ?? 0
  const longitude = satellite.longitude ?? 0
  const velocity = satellite.velocity ?? 7.8
  const inclination = satellite.INCLINATION ?? 0
  // </CHANGE>

  // Convert lat/lon/alt to 3D position
  const radius = 2 + (altitude / 10000) * 0.5
  const phi = (90 - latitude) * (Math.PI / 180)
  const theta = (longitude + 180) * (Math.PI / 180)

  const x = -(radius * Math.sin(phi) * Math.cos(theta))
  const y = radius * Math.cos(phi)
  const z = radius * Math.sin(phi) * Math.sin(theta)

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle pulsing animation
      const scale = isSelected ? 1.5 : hovered ? 1.2 : 1
      meshRef.current.scale.setScalar(scale)
    }
  })

  const getSatelliteIcon = () => {
    const name = satellite.OBJECT_NAME?.toLowerCase() || ""
    if (name.includes("starlink") || name.includes("oneweb")) return <Wifi className="w-3 h-3" />
    if (name.includes("terra") || name.includes("aqua") || name.includes("landsat"))
      return <Camera className="w-3 h-3" />
    if (name.includes("gps") || name.includes("galileo")) return <Navigation className="w-3 h-3" />
    return <Satellite className="w-3 h-3" />
  }

  const getSatellitePurpose = () => {
    const name = satellite.OBJECT_NAME?.toLowerCase() || ""
    if (name.includes("starlink") || name.includes("oneweb")) return "Communications"
    if (name.includes("terra") || name.includes("aqua") || name.includes("landsat")) return "Earth Observation"
    if (name.includes("gps") || name.includes("galileo")) return "Navigation"
    if (name.includes("iss")) return "Space Station"
    return "Scientific Research"
  }

  return (
    <group position={[x, y, z]}>
      <mesh
        ref={meshRef}
        onClick={() => onClick(satellite)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial
          color={isSelected ? "#00ff88" : hovered ? "#00ddff" : "#00ff88"}
          emissive={isSelected ? "#00ff88" : hovered ? "#00ddff" : "#00ff88"}
          emissiveIntensity={isSelected ? 2 : hovered ? 1.5 : 1}
        />
      </mesh>

      {/* Orbit ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radius - 0.01, radius + 0.01, 64]} />
        <meshBasicMaterial color="#00ff88" transparent opacity={0.2} side={THREE.DoubleSide} />
      </mesh>

      {/* Info label on hover or selection */}
      {(hovered || isSelected) && (
        <Html distanceFactor={10} position={[0, 0.1, 0]}>
          <div className="bg-black/90 border border-primary/50 rounded-lg p-2 min-w-[200px] backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-1">
              {getSatelliteIcon()}
              <span className="text-white font-semibold text-xs">{satellite.OBJECT_NAME || "Unknown Satellite"}</span>
            </div>
            <div className="text-[10px] text-white/70 space-y-0.5">
              <div className="flex justify-between">
                <span>Purpose:</span>
                <span className="text-primary">{getSatellitePurpose()}</span>
              </div>
              <div className="flex justify-between">
                <span>Altitude:</span>
                <span className="font-mono">{Math.round(altitude)} km</span>
              </div>
              <div className="flex justify-between">
                <span>Velocity:</span>
                <span className="font-mono">{velocity.toFixed(2)} km/s</span>
              </div>
              <div className="flex justify-between">
                <span>Inclination:</span>
                <span className="font-mono">{inclination.toFixed(1)}°</span>
              </div>
            </div>
          </div>
        </Html>
      )}
    </group>
  )
}

function Earth() {
  const earthRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.001
    }
  })

  return (
    <mesh ref={earthRef}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial
        color="#2c5aa0"
        roughness={0.7}
        metalness={0.2}
        emissive="#1a3a6e"
        emissiveIntensity={0.2}
      />
      {/* Atmosphere glow */}
      <mesh scale={1.05}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshBasicMaterial color="#4a90e2" transparent opacity={0.1} side={THREE.BackSide} />
      </mesh>
    </mesh>
  )
}

export function Earth3DEnhanced() {
  const [satellites, setSatellites] = useState<SatelliteData[]>([])
  const [selectedSatellite, setSelectedSatellite] = useState<SatelliteData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchSatellites() {
      try {
        const response = await fetch("/api/satellites?count=30")
        const data = await response.json()
        const validSatellites = data.filter(
          (sat: SatelliteData) =>
            sat.NORAD_CAT_ID &&
            typeof sat.altitude === "number" &&
            typeof sat.latitude === "number" &&
            typeof sat.longitude === "number",
        )
        setSatellites(validSatellites)
        // </CHANGE>
        setLoading(false)
      } catch (error) {
        console.error("Error fetching satellites:", error)
        setLoading(false)
      }
    }

    fetchSatellites()
    const interval = setInterval(fetchSatellites, 15000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="relative overflow-hidden bg-black border-primary/20 h-[600px]">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Stars radius={300} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

          <Earth />

          {satellites.map((sat) => (
            <SatelliteMarker
              key={sat.NORAD_CAT_ID}
              satellite={sat}
              onClick={setSelectedSatellite}
              isSelected={selectedSatellite?.NORAD_CAT_ID === sat.NORAD_CAT_ID}
            />
          ))}

          <OrbitControls
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            zoomSpeed={0.6}
            panSpeed={0.5}
            rotateSpeed={0.4}
            minDistance={4}
            maxDistance={15}
          />
        </Suspense>
      </Canvas>

      {/* Info overlay */}
      <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm border border-primary/30 rounded-lg p-3">
        <div className="text-white/90 text-sm space-y-1">
          <div className="flex items-center gap-2">
            <Satellite className="w-4 h-4 text-primary" />
            <span className="font-semibold">Live Satellite Tracking</span>
          </div>
          <div className="text-xs text-white/70">
            <div>
              Active Satellites: <span className="text-primary font-mono">{satellites.length}</span>
            </div>
            <div className="mt-1 text-[10px]">Click satellite for details • Drag to rotate • Scroll to zoom</div>
          </div>
        </div>
      </div>

      {/* Selected satellite details */}
      {selectedSatellite && (
        <div className="absolute bottom-4 right-4 bg-black/90 backdrop-blur-sm border border-primary/50 rounded-lg p-4 max-w-xs">
          <div className="flex items-start justify-between mb-2">
            <h4 className="text-white font-semibold text-sm">{selectedSatellite.OBJECT_NAME || "Unknown Satellite"}</h4>
            <button onClick={() => setSelectedSatellite(null)} className="text-white/50 hover:text-white text-xs">
              ✕
            </button>
          </div>
          <div className="space-y-2 text-xs text-white/80">
            <div className="flex justify-between">
              <span>NORAD ID:</span>
              <span className="font-mono text-primary">{selectedSatellite.NORAD_CAT_ID}</span>
            </div>
            <div className="flex justify-between">
              <span>Altitude:</span>
              <span className="font-mono">{Math.round(selectedSatellite.altitude ?? 0)} km</span>
            </div>
            <div className="flex justify-between">
              <span>Velocity:</span>
              <span className="font-mono">{(selectedSatellite.velocity ?? 0).toFixed(2)} km/s</span>
            </div>
            <div className="flex justify-between">
              <span>Inclination:</span>
              <span className="font-mono">{(selectedSatellite.INCLINATION ?? 0).toFixed(2)}°</span>
            </div>
            <div className="flex justify-between">
              <span>Position:</span>
              <span className="font-mono text-[10px]">
                {(selectedSatellite.latitude ?? 0).toFixed(2)}°, {(selectedSatellite.longitude ?? 0).toFixed(2)}°
              </span>
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="text-white text-sm">Loading satellite data...</div>
        </div>
      )}
    </Card>
  )
}
