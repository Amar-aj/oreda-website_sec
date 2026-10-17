import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  CloudSun,
  Moon,
  Sun,
  type LucideIcon,
} from 'lucide-vue-next'
import { computed, onMounted, onUnmounted, ref } from 'vue'

export type WeatherSnapshot = {
  tempC: number
  code: number
  isDay: boolean
  label: string
  icon: LucideIcon
  location: string
}

/** Fallback — OREDA HQ if browser location is unavailable */
const FALLBACK = {
  lat: 20.2961,
  lon: 85.8245,
  location: 'Bhubaneswar',
}

const CACHE_KEY = 'oreda-weather-local'
const CACHE_TTL_MS = 20 * 60 * 1000
const REFRESH_MS = 20 * 60 * 1000

type WeatherInfo = {
  label: string
  dayIcon: LucideIcon
  nightIcon: LucideIcon
}

function weatherFromCode(code: number): WeatherInfo {
  if (code === 0) {
    return { label: 'Clear', dayIcon: Sun, nightIcon: Moon }
  }
  if (code === 1 || code === 2) {
    return { label: 'Partly cloudy', dayIcon: CloudSun, nightIcon: Cloud }
  }
  if (code === 3) {
    return { label: 'Overcast', dayIcon: Cloud, nightIcon: Cloud }
  }
  if (code === 45 || code === 48) {
    return { label: 'Fog', dayIcon: CloudFog, nightIcon: CloudFog }
  }
  if (code >= 51 && code <= 57) {
    return { label: 'Drizzle', dayIcon: CloudDrizzle, nightIcon: CloudDrizzle }
  }
  if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) {
    return { label: 'Rain', dayIcon: CloudRain, nightIcon: CloudRain }
  }
  if (code >= 71 && code <= 77) {
    return { label: 'Snow', dayIcon: CloudSnow, nightIcon: CloudSnow }
  }
  if (code >= 95) {
    return { label: 'Thunderstorm', dayIcon: CloudLightning, nightIcon: CloudLightning }
  }
  return { label: 'Cloudy', dayIcon: Cloud, nightIcon: Cloud }
}

type ApiResponse = {
  current?: {
    temperature_2m?: number
    weather_code?: number
    is_day?: number
  }
}

type CachePayload = {
  at: number
  lat: number
  lon: number
  tempC: number
  code: number
  isDay: boolean
  location: string
}

type GeoPoint = {
  lat: number
  lon: number
}

function readCache(): CachePayload | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as CachePayload
    if (!parsed?.at || Date.now() - parsed.at > CACHE_TTL_MS) return null
    return parsed
  } catch {
    return null
  }
}

function writeCache(payload: CachePayload) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(payload))
  } catch {
    /* ignore */
  }
}

function toSnapshot(
  tempC: number,
  code: number,
  isDay: boolean,
  location: string,
): WeatherSnapshot {
  const info = weatherFromCode(code)
  return {
    tempC: Math.round(tempC),
    code,
    isDay,
    label: info.label,
    icon: isDay ? info.dayIcon : info.nightIcon,
    location,
  }
}

function getBrowserPosition(): Promise<GeoPoint> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation unsupported'))
      return
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        resolve({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        })
      },
      (err) => reject(err),
      {
        enableHighAccuracy: false,
        timeout: 8000,
        maximumAge: 10 * 60 * 1000,
      },
    )
  })
}

async function reverseGeocode(lat: number, lon: number): Promise<string> {
  try {
    const url =
      `https://api.bigdatacloud.net/data/reverse-geocode-client` +
      `?latitude=${lat}&longitude=${lon}&localityLanguage=en`
    const res = await fetch(url)
    if (!res.ok) throw new Error('Reverse geocode failed')
    const data = (await res.json()) as {
      city?: string
      locality?: string
      principalSubdivision?: string
      countryName?: string
    }
    const place =
      data.city ||
      data.locality ||
      data.principalSubdivision ||
      data.countryName
    return place?.trim() || 'Your location'
  } catch {
    return 'Your location'
  }
}

async function fetchWeatherAt(
  lat: number,
  lon: number,
  location: string,
): Promise<WeatherSnapshot> {
  const url =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${lat}&longitude=${lon}` +
    `&current=temperature_2m,weather_code,is_day` +
    `&timezone=auto`

  const res = await fetch(url)
  if (!res.ok) throw new Error(`Weather HTTP ${res.status}`)
  const data = (await res.json()) as ApiResponse
  const current = data.current
  if (
    typeof current?.temperature_2m !== 'number' ||
    typeof current?.weather_code !== 'number'
  ) {
    throw new Error('Invalid weather payload')
  }

  return toSnapshot(
    current.temperature_2m,
    current.weather_code,
    current.is_day === 1,
    location,
  )
}

export function useWeather() {
  const weather = ref<WeatherSnapshot | null>(null)
  const loading = ref(true)
  const error = ref(false)
  const usingFallback = ref(false)

  let coords: GeoPoint | null = null
  let locationName = FALLBACK.location
  let timer: ReturnType<typeof setInterval> | null = null

  async function resolveLocation() {
    try {
      coords = await getBrowserPosition()
      locationName = await reverseGeocode(coords.lat, coords.lon)
      usingFallback.value = false
    } catch {
      coords = { lat: FALLBACK.lat, lon: FALLBACK.lon }
      locationName = FALLBACK.location
      usingFallback.value = true
    }
  }

  async function fetchWeather() {
    if (!coords) await resolveLocation()
    if (!coords) return

    try {
      const snapshot = await fetchWeatherAt(coords.lat, coords.lon, locationName)
      weather.value = snapshot
      error.value = false
      writeCache({
        at: Date.now(),
        lat: coords.lat,
        lon: coords.lon,
        tempC: snapshot.tempC,
        code: snapshot.code,
        isDay: snapshot.isDay,
        location: snapshot.location,
      })
    } catch {
      error.value = true
      if (!weather.value) {
        const cached = readCache()
        if (cached) {
          weather.value = toSnapshot(
            cached.tempC,
            cached.code,
            cached.isDay,
            cached.location,
          )
          error.value = false
        }
      }
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    const cached = readCache()
    if (cached) {
      weather.value = toSnapshot(
        cached.tempC,
        cached.code,
        cached.isDay,
        cached.location,
      )
      coords = { lat: cached.lat, lon: cached.lon }
      locationName = cached.location
      loading.value = false
    }

    void (async () => {
      await resolveLocation()
      await fetchWeather()
      timer = setInterval(() => void fetchWeather(), REFRESH_MS)
    })()
  })

  onUnmounted(() => {
    if (timer) clearInterval(timer)
  })

  const displayTemp = computed(() =>
    weather.value ? `${weather.value.tempC}°C` : null,
  )

  return {
    weather,
    loading,
    error,
    displayTemp,
    usingFallback,
  }
}
