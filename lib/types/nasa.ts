// NASA API Response Types

export interface NASAAPODResponse {
  date: string
  explanation: string
  hdurl?: string
  media_type: string
  service_version: string
  title: string
  url: string
}

export interface TLEData {
  OBJECT_NAME: string
  OBJECT_ID: string
  EPOCH: string
  MEAN_MOTION: number
  ECCENTRICITY: number
  INCLINATION: number
  RA_OF_ASC_NODE: number
  ARG_OF_PERICENTER: number
  MEAN_ANOMALY: number
  EPHEMERIS_TYPE: number
  CLASSIFICATION_TYPE: string
  NORAD_CAT_ID: number
  ELEMENT_SET_NO: number
  REV_AT_EPOCH: number
  BSTAR: number
  MEAN_MOTION_DOT: number
  MEAN_MOTION_DDOT: number
  TLE_LINE1: string
  TLE_LINE2: string
}

export interface SatellitePosition {
  name: string
  id: string
  latitude: number
  longitude: number
  altitude: number
  velocity: number
  timestamp: number
}

export interface DebrisData {
  id: string
  altitude: number
  density: number
  riskLevel: "low" | "medium" | "high" | "critical"
}

export interface ClimateMetrics {
  country: string
  countryCode: string
  co2Emissions: number
  deforestation: number
  carbonStock: number
  waterStress: number
  urbanEmissions: number
  lastUpdated: string
}

export interface OrbitHealthIndex {
  score: number
  shortTermRisk: "low" | "medium" | "high" | "critical"
  longTermRisk: "low" | "medium" | "high" | "critical"
  collisionProbability: number
  debrisProximity: number
  complianceGrade: string
  lastCalculated: string
}

export interface NEOData {
  id: string
  name: string
  estimatedDiameter: {
    kilometers: {
      min: number
      max: number
    }
  }
  closeApproachDate: string
  relativeVelocity: number
  missDistance: number
  isPotentiallyHazardous: boolean
}
