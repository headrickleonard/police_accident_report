"use client"

import { useState } from "react"
import { useCoordinatesData } from "./hooks/useCoordinatesData"
import { Header } from "./components/Header"
import { DataTable } from "./components/DataTable"
// import { Map } from "./components/Map"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import dynamic from "next/dynamic";
const DynamicMap = dynamic(() => import("./components/Map"), { ssr: false });

export default function Dashboard() {
  const { data, isLoading, error } = useCoordinatesData()
  const [selectedLocation, setSelectedLocation] = useState<{
    position: [number, number]
    name: string
    vehiclePlate: string
  } | null>(null)

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error.message}</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-4 space-y-6">
        <Header />
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Accident Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable
                data={data}
                onItemClick={(item) =>
                  setSelectedLocation({
                    position: [item.latitude, item.longitude],
                    name: item.name,
                    vehiclePlate: item.vehiclePlate,
                  })
                }
              />
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Location Map</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[600px] rounded-md overflow-hidden">
                <DynamicMap
                  center={selectedLocation?.position || [-6.369, 34.8888]} // Tanzania center
                  zoom={selectedLocation ? 12 : 6}
                  markerPosition={selectedLocation?.position || null}
                  markerPopup={selectedLocation ? `${selectedLocation.name} - ${selectedLocation.vehiclePlate}` : null}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

