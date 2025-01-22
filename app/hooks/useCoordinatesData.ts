'use client'

import { useState, useEffect } from "react"
import { dummyData } from "../lib/dummyData"

export interface CoordinateData {
  id: string
  name: string
  latitude: number
  longitude: number
  vehiclePlate: string
  vehicleType: string
}

export function useCoordinatesData() {
  const [data, setData] = useState<CoordinateData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      setData(dummyData)
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return { data, isLoading, error }
}

