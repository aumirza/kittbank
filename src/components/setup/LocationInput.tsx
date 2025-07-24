import { SearchIcon } from 'lucide-react';
import { lazy, Suspense } from 'react';

const MapBoxMap = lazy(() => import('react-map-gl/mapbox'));

import type { MapRef } from 'react-map-gl/mapbox';
import { MapSearchInput } from '../MapSearchInput';
import { Input } from '../ui/input';
import 'mapbox-gl/dist/mapbox-gl.css';

import { useEffect, useRef, useState } from 'react';
import atmMarker from '@/assets/images/atm-marker.png';
import branchMarker from '@/assets/images/branch-marker.png';
import { useReverseGeocode } from '@/hooks/useReverseGeocode';
import type { SearchBoxFeatureProperties } from '@/lib/mapbox';
import { Loader } from '../Loader';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN ?? '';

function LocationInputInner({
  markerType,
  onChange,
}: {
  markerType: 'atm' | 'branch';
  onChange: (search: SearchBoxFeatureProperties | null) => void;
}) {
  const [search, setSearch] = useState<SearchBoxFeatureProperties | null>(null);
  const mapRef = useRef<MapRef | null>(null);

  const { reverseGeocode } = useReverseGeocode();

  const initialViewState = {
    latitude: search?.coordinates?.latitude || 19.076,
    longitude: search?.coordinates?.longitude || 72.8777,
    zoom: 14,
  };

  const handleMapDragEnd = async () => {
    if (mapRef.current) {
      const map = mapRef.current.getMap();
      const center = map.getCenter();
      const coords = { latitude: center.lat, longitude: center.lng };
      const result = await reverseGeocode(coords);
      if (result) {
        setSearch(result);
        onChange(result);
      }
    }
  };

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
    <div className="relative h-full w-full">
      <MapSearchInput
        onChange={setSearch}
        placeholder="Search for location"
        render={(inputProps) => (
          <div className="-translate-x-1/2 absolute top-2 left-1/2 z-20 mx-auto sm:w-1/2">
            <SearchIcon className="-translate-y-1/2 absolute top-1/2 left-5 h-4 w-4 text-muted-foreground" />
            <Input
              className="max-full h-12 rounded-full bg-white pl-10"
              placeholder="Search"
              {...inputProps}
            />
          </div>
        )}
      />
      <MapBoxMap
        initialViewState={initialViewState}
        mapboxAccessToken={MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onDragEnd={handleMapDragEnd}
        ref={mapRef}
        style={{ width: '100%', height: '100%' }}
      />
      <div
        aria-hidden="true"
        className="-translate-x-1/2 -translate-y-1/2 pointer-events-none absolute top-1/2 left-1/2 z-20"
      >
        <img
          alt={markerType === 'atm' ? 'ATM Marker' : 'Branch Marker'}
          className="size-12"
          src={markerType === 'atm' ? atmMarker : branchMarker}
        />
      </div>
    </div>
  );
}

export function LocationInput(props: {
  markerType: 'atm' | 'branch';
  onChange: (search: SearchBoxFeatureProperties | null) => void;
}) {
  return (
    <Suspense
      fallback={
        <div className="flex h-full w-full items-center justify-center">
          <Loader size="lg" />
        </div>
      }
    >
      <LocationInputInner {...props} />
    </Suspense>
  );
}
