import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"

interface CoordinateData {
  id: string
  name: string
  latitude: number
  longitude: number
  vehiclePlate: string
  vehicleType: string
}

interface DataTableProps {
  data: CoordinateData[]
  onItemClick: (item: CoordinateData) => void
}

export function DataTable({ data, onItemClick }: DataTableProps) {
  return (
    <div className="overflow-x-auto rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead>Region</TableHead>
            <TableHead>Vehicle Plate</TableHead>
            <TableHead>Vehicle Type</TableHead>
            <TableHead>Coordinates</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id} className="hover:bg-muted/50">
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>{item.vehiclePlate}</TableCell>
              <TableCell>{item.vehicleType}</TableCell>
              <TableCell>{`${item.latitude.toFixed(4)}, ${item.longitude.toFixed(4)}`}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onItemClick(item)}
                  className="hover:bg-primary hover:text-primary-foreground"
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  View Location
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

