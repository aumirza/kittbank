import { useCallback, useState } from 'react';
import type { SearchBoxFeatureProperties } from '@/lib/mapbox';
import { getAddressFromCoordinates } from '@/lib/mapbox';

interface Coordinates {
  latitude: number;
  longitude: number;
}

export function useReverseGeocode() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reverseGeocode = useCallback(
    async (coords: Coordinates): Promise<SearchBoxFeatureProperties | null> => {
      setLoading(true);
      setError(null);
      try {
        const result = await getAddressFromCoordinates(
          coords.latitude,
          coords.longitude
        );
        return result;
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Unknown error');
        }
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { reverseGeocode, loading, error };
}
