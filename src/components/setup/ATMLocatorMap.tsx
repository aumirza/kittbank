import MapBoxMap, { Marker } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapPin } from 'lucide-react';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN ?? '';

export function ATMLocatorMap({
  marker,
}: {
  marker: 'all' | 'atm' | 'branch';
}) {
  return (
    <MapBoxMap
      initialViewState={{
        latitude: 19.076,
        longitude: 72.8777,
        zoom: 14,
      }}
      mapboxAccessToken={MAPBOX_TOKEN}
      mapStyle="mapbox://styles/mapbox/streets-v11"
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
            <MapPin className="text-blue-500" size={32} />
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
            <MapPin className="text-green-500" size={32} />
            <title>Branch location</title>
          </Marker>
        ))}

      {/* TODO: Render car markers here */}
    </MapBoxMap>
  );
}
