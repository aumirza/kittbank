import MapBoxMap, { type MapRef, Marker } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';

import { useEffect, useRef } from 'react';
import atmMarker from '@/assets/images/atm-marker.png';
import branchMarker from '@/assets/images/branch-marker.png';
import { useUserLocation } from '@/hooks/useUserLocation';
import type { SearchBoxFeatureProperties } from '@/lib/mapbox';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN ?? '';

export type LatLngMarker = { lat: number; lng: number };

export function computeCenterFromMarkers(markers: LatLngMarker[]): {
  latitude: number;
  longitude: number;
} {
  if (markers.length === 0) {
    // Fallback to center of India
    return {
      latitude: 22.5937,
      longitude: 78.9629,
    };
  }

  const total = markers.reduce(
    (acc, m) => {
      acc.lat += m.lat;
      acc.lng += m.lng;
      return acc;
    },
    { lat: 0, lng: 0 }
  );

  return {
    latitude: total.lat / markers.length,
    longitude: total.lng / markers.length,
  };
}

export default function ATMLocatorMap({
  marker,
  search,
  atmMarkers = [],
  branchMarkers = [],
}: {
  marker: 'all' | 'atm' | 'branch';
  search?: SearchBoxFeatureProperties | null;
  atmMarkers?: Array<{ lat: number; lng: number; id: string }>;
  branchMarkers?: Array<{ lat: number; lng: number; id: string }>;
}) {
  const { location: userLocation } = useUserLocation();
  const mapRef = useRef<MapRef>(null);

  const center = computeCenterFromMarkers([...atmMarkers, ...branchMarkers]);

  useEffect(() => {
    const map = mapRef.current?.getMap();
    if (!map) {
      return;
    }

    const coordinates = search
      ? [search.coordinates.longitude, search.coordinates.latitude]
      : userLocation
        ? [userLocation.longitude, userLocation.latitude]
        : null;

    if (coordinates) {
      map.flyTo({
        center: [coordinates[0], coordinates[1]],
        essential: true,
      });
    }
  }, [search, userLocation]);

  return (
    <MapBoxMap
      initialViewState={{
        // Default view state, can be adjusted based on your needs
        latitude:
          search?.coordinates?.latitude ??
          userLocation?.latitude ??
          center.latitude,
        longitude:
          search?.coordinates?.longitude ??
          userLocation?.longitude ??
          center.longitude,
        zoom: 14,
      }}
      mapboxAccessToken={MAPBOX_TOKEN}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      ref={mapRef}
      style={{ width: '100%', height: '100%' }}
    >
      {/* Dynamic ATM markers */}
      {(marker === 'atm' || marker === 'all') &&
        atmMarkers.map((pos) => (
          <Marker
            anchor="bottom"
            key={pos.id}
            latitude={pos.lat}
            longitude={pos.lng}
          >
            <img alt="ATM Marker" className="size-12" src={atmMarker} />
          </Marker>
        ))}

      {/* Dynamic Branch markers */}
      {(marker === 'branch' || marker === 'all') &&
        branchMarkers.map((pos) => (
          <Marker
            anchor="bottom"
            key={pos.id}
            latitude={pos.lat}
            longitude={pos.lng}
          >
            <img alt="Branch Marker" className="size-12" src={branchMarker} />
          </Marker>
        ))}

      {userLocation && (
        <Marker
          anchor="center"
          latitude={userLocation.latitude}
          longitude={userLocation.longitude}
        >
          <div className="h-3 w-3 rounded-full border-2 border-white bg-blue-500" />
        </Marker>
      )}
    </MapBoxMap>
  );
}
