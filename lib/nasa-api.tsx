// Server-side only NASA API utilities
// This file should only be imported in Server Components, Server Actions, or Route Handlers

const NASA_API_KEY = process.env.NASA_API_KEY || "o0rBi39vZITgEMYfcgA109bJAMcDdHh3a2InqfNf"
const NASA_BASE_URL = "https://api.nasa.gov"
const USE_MOCK_DATA = process.env.USE_REAL_NASA_API !== "true"

const MOCK_EONET_EVENTS = {
  events: [
    {
      id: "EONET_6789",
      title: "Wildfire - California, USA",
      description: "Active wildfire detected in Northern California",
      categories: [{ id: "wildfires", title: "Wildfires" }],
      geometry: [{ date: new Date().toISOString(), coordinates: [-122.4, 37.8] }],
    },
    {
      id: "EONET_6790",
      title: "Severe Storm - Atlantic Ocean",
      description: "Tropical storm system developing in the Atlantic",
      categories: [{ id: "severeStorms", title: "Severe Storms" }],
      geometry: [{ date: new Date().toISOString(), coordinates: [-45.2, 28.5] }],
    },
    {
      id: "EONET_6791",
      title: "Volcanic Activity - Indonesia",
      description: "Increased volcanic activity detected",
      categories: [{ id: "volcanoes", title: "Volcanoes" }],
      geometry: [{ date: new Date().toISOString(), coordinates: [110.4, -7.5] }],
    },
    {
      id: "EONET_6792",
      title: "Iceberg - Antarctica",
      description: "Large iceberg calving event detected",
      categories: [{ id: "seaLakeIce", title: "Sea and Lake Ice" }],
      geometry: [{ date: new Date().toISOString(), coordinates: [-45.0, -70.5] }],
    },
    {
      id: "EONET_6793",
      title: "Drought - East Africa",
      description: "Severe drought conditions persisting",
      categories: [{ id: "drought", title: "Drought" }],
      geometry: [{ date: new Date().toISOString(), coordinates: [40.5, 2.0] }],
    },
  ],
}

const MOCK_SATELLITE_DATA = [
  {
    OBJECT_NAME: "ISS (ZARYA)",
    OBJECT_ID: "1998-067A",
    EPOCH: new Date().toISOString(),
    MEAN_MOTION: 15.54,
    ECCENTRICITY: 0.0001,
    INCLINATION: 51.6,
    RA_OF_ASC_NODE: 45.2,
    ARG_OF_PERICENTER: 120.5,
    MEAN_ANOMALY: 240.8,
    EPHEMERIS_TYPE: 0,
    CLASSIFICATION_TYPE: "U",
    NORAD_CAT_ID: 25544,
    ELEMENT_SET_NO: 999,
    REV_AT_EPOCH: 35000,
    BSTAR: 0.00001,
    MEAN_MOTION_DOT: 0.00001,
    MEAN_MOTION_DDOT: 0,
  },
  {
    OBJECT_NAME: "STARLINK-1007",
    OBJECT_ID: "2019-074A",
    EPOCH: new Date().toISOString(),
    MEAN_MOTION: 15.19,
    ECCENTRICITY: 0.0002,
    INCLINATION: 53.0,
    RA_OF_ASC_NODE: 120.5,
    ARG_OF_PERICENTER: 90.2,
    MEAN_ANOMALY: 180.4,
    EPHEMERIS_TYPE: 0,
    CLASSIFICATION_TYPE: "U",
    NORAD_CAT_ID: 44713,
    ELEMENT_SET_NO: 999,
    REV_AT_EPOCH: 25000,
    BSTAR: 0.00002,
    MEAN_MOTION_DOT: 0.00002,
    MEAN_MOTION_DDOT: 0,
  },
  {
    OBJECT_NAME: "HUBBLE SPACE TELESCOPE",
    OBJECT_ID: "1990-037B",
    EPOCH: new Date().toISOString(),
    MEAN_MOTION: 15.09,
    ECCENTRICITY: 0.0003,
    INCLINATION: 28.5,
    RA_OF_ASC_NODE: 200.1,
    ARG_OF_PERICENTER: 45.8,
    MEAN_ANOMALY: 315.2,
    EPHEMERIS_TYPE: 0,
    CLASSIFICATION_TYPE: "U",
    NORAD_CAT_ID: 20580,
    ELEMENT_SET_NO: 999,
    REV_AT_EPOCH: 150000,
    BSTAR: 0.000005,
    MEAN_MOTION_DOT: 0.000005,
    MEAN_MOTION_DDOT: 0,
  },
]

async function fetchNASAData(endpoint: string, params: Record<string, string> = {}): Promise<any> {
  const url = new URL(`${NASA_BASE_URL}${endpoint}`)
  url.searchParams.append("api_key", NASA_API_KEY)

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value)
  })

  try {
    const response = await fetch(url.toString(), {
      next: { revalidate: 3600 }, // Cache for 1 hour to reduce API calls
      signal: AbortSignal.timeout(10000), // 10 second timeout
    })

    if (!response.ok) {
      const errorBody = await response.text()
      console.warn(`[v0] NASA API returned ${response.status}: ${errorBody}`)
      return null
    }

    return await response.json()
  } catch (error) {
    console.warn("[v0] NASA API request failed:", error instanceof Error ? error.message : error)
    return null
  }
}

export async function fetchEONETEvents() {
  if (USE_MOCK_DATA) {
    console.log("[v0] Using mock EONET data (set USE_REAL_NASA_API=true to use real API)")
    return MOCK_EONET_EVENTS
  }

  const data = await fetchNASAData("/EONET/api/v3/events", {
    limit: "20",
    status: "open",
  })

  if (!data) {
    console.log("[v0] NASA API unavailable, using mock EONET data")
    return MOCK_EONET_EVENTS
  }

  return data
}

export async function fetchAPOD() {
  if (USE_MOCK_DATA) {
    console.log("[v0] Using mock APOD data (set USE_REAL_NASA_API=true to use real API)")
    return null
  }

  const data = await fetchNASAData("/planetary/apod")

  if (!data) {
    console.log("[v0] NASA API unavailable, APOD not available")
    return null
  }

  return data
}

export async function fetchNEO(startDate?: string, endDate?: string) {
  if (USE_MOCK_DATA) {
    console.log("[v0] Using mock NEO data (set USE_REAL_NASA_API=true to use real API)")
    return { near_earth_objects: {} }
  }

  const today = new Date()
  const start = startDate || today.toISOString().split("T")[0]
  const end = endDate || new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]

  const data = await fetchNASAData("/neo/rest/v1/feed", {
    start_date: start,
    end_date: end,
  })

  if (!data) {
    console.log("[v0] NASA API unavailable, using empty NEO data")
    return { near_earth_objects: {} }
  }

  return data
}

export async function fetchSatelliteData() {
  // Note: NASA doesn't have a direct satellite tracking API in their public API
  // This would typically come from Space-Track.org or similar services
  console.log("[v0] Using mock satellite data (real-time satellite tracking requires Space-Track.org API)")
  return MOCK_SATELLITE_DATA
}
