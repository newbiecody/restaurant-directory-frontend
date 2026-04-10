"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin } from "@phosphor-icons/react/ssr";

interface LocationInputProps {
  location: string;
  onLocationChange: (v: string) => void;
  lat?: string;
  lon?: string;
  onLocationSelect?: (lat: number, lon: number) => void;
  loading?: boolean;
}

export default function LocationInput({
  location,
  onLocationChange,
  lat,
  lon,
  onLocationSelect,
  loading = false,
}: LocationInputProps) {
  const [geoLoading, setGeoLoading] = useState(false);

  const handleUseLocation = async () => {
    setGeoLoading(true);
    try {
      const position = await new Promise<GeolocationCoordinates>(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            (pos) => resolve(pos.coords),
            reject,
            { timeout: 5000 }
          );
        }
      );

      onLocationSelect?.(position.latitude, position.longitude);
      onLocationChange(`Lat: ${position.latitude.toFixed(2)}, Lon: ${position.longitude.toFixed(2)}`);
    } catch {
      alert("Unable to get your location. Please enable location access.");
    } finally {
      setGeoLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Location</label>
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Address or city"
          value={location}
          onChange={(e) => onLocationChange(e.target.value)}
          disabled={loading || geoLoading}
          className="flex-1"
        />
        <Button
          type="button"
          variant="outline"
          onClick={handleUseLocation}
          disabled={loading || geoLoading}
          className="px-3"
        >
          <MapPin size={18} />
        </Button>
      </div>
      {(lat || lon) && (
        <p className="text-xs text-muted-foreground">
          📍 Searching near {lat && lon ? `(${parseFloat(lat).toFixed(2)}°, ${parseFloat(lon).toFixed(2)}°)` : 'your location'}
        </p>
      )}
    </div>
  );
}
