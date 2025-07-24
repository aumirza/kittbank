import MapBoxMap, { type MapRef, Marker } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';

import { useEffect, useRef } from 'react';
import atmMarker from '@/assets/images/atm-marker.png';
import branchMarker from '@/assets/images/branch-marker.png';
import type { SearchBoxFeatureProperties } from '@/lib/mapbox';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN ?? '';

export default function ATMLocatorMap({
  marker,
  search,
}: {
  marker: 'all' | 'atm' | 'branch';
  search?: SearchBoxFeatureProperties | null;
}) {
  const mapRef = useRef<MapRef | null>(null);

  useEffect(() => {
    if (mapRef.current && search) {
      const map = mapRef.current.getMap();
      map.flyTo({
        center: [search.coordinates.longitude, search.coordinates.latitude],
        zoom: 14,
        essential: true, // This ensures the animation is not interrupted
      });
    }
  }, [search]);

  return (
    <MapBoxMap
      initialViewState={{
        // Default view state, can be adjusted based on your needs
        latitude: search?.coordinates?.latitude || 19.076,
        longitude: search?.coordinates?.longitude || 72.8777,
        zoom: 14,
      }}
      mapboxAccessToken={MAPBOX_TOKEN}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      ref={mapRef}
      style={{ width: '100%', height: '100%' }}
    >
      {/* Fake ATM markers */}
      {(marker === 'atm' || marker === 'all') &&
        [
          { lat: 19.076, lng: 72.8777, id: 'atm-1' },
          { lat: 19.078, lng: 72.879, id: 'atm-2' },
          { lat: 19.074, lng: 72.875, id: 'atm-3' },
        ].map((pos) => (
          <Marker
            anchor="bottom"
            key={pos.id}
            latitude={pos.lat}
            longitude={pos.lng}
          >
            <img alt="ATM Marker" className="size-12" src={atmMarker} />
            <title>ATM location</title>
          </Marker>
        ))}

      {/* Fake Branch markers */}
      {(marker === 'branch' || marker === 'all') &&
        [
          { lat: 19.077, lng: 72.878, id: 'branch-1' },
          { lat: 19.075, lng: 72.876, id: 'branch-2' },
        ].map((pos) => (
          <Marker
            anchor="bottom"
            key={pos.id}
            latitude={pos.lat}
            longitude={pos.lng}
          >
            <img alt="Branch Marker" className="size-12" src={branchMarker} />
            <title>Branch location</title>
          </Marker>
        ))}

      {/* TODO: Render car markers here */}
    </MapBoxMap>
  );
}
